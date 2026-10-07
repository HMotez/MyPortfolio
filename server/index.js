import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import { config } from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: join(__dirname, "../.env") }); // local dev; Docker / Render pass real env vars

const app  = express();
/* Hosts such as Render pass the port to listen on in $PORT */
const PORT = process.env.PORT || process.env.SERVER_PORT || 5000;

/* Who receives the messages, and how they are sent:
   - RESEND_API_KEY set → Resend HTTP API (works on hosts that block SMTP, e.g. Render free)
   - otherwise          → Gmail SMTP with an app password (local / Docker) */
const CONTACT_TO = process.env.CONTACT_TO || process.env.GMAIL_USER;
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const RESEND_FROM = process.env.RESEND_FROM || "Portfolio <onboarding@resend.dev>";

/* ALLOWED_ORIGINS: JSON array or comma-separated list of site addresses allowed to call the API */
const parseOrigins = (raw) => {
  if (!raw) return [];
  try { return JSON.parse(raw); } catch { return raw.split(",").map((s) => s.trim()).filter(Boolean); }
};
const allowedOrigins = [
  "http://localhost:5173", "http://localhost:4173", "http://localhost:3000",
  ...parseOrigins(process.env.ALLOWED_ORIGINS),
];

app.set("trust proxy", 1); // real client IP behind Render / nginx (for the rate limit)
app.use(cors({ origin: allowedOrigins }));
app.use(express.json({ limit: "20kb" }));

/* ── Basic anti-spam: 5 messages per IP every 15 minutes ── */
const WINDOW_MS = 15 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map();
const rateLimited = (ip) => {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
};
setInterval(() => {
  const now = Date.now();
  for (const [ip, times] of hits) if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(ip);
}, WINDOW_MS).unref();

/* Visitor input goes into an HTML email: escape it */
const escapeHtml = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const renderEmail = ({ from_name, from_email, subject, message }) => `
  <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#0a0f1e;color:#e2e8f0;border-radius:12px;overflow:hidden">
    <div style="background:linear-gradient(135deg,#06b6d4,#a855f7);padding:24px 32px">
      <h2 style="margin:0;color:#fff;font-size:20px">New Portfolio Message</h2>
    </div>
    <div style="padding:32px">
      <table style="width:100%;border-collapse:collapse">
        <tr><td style="padding:8px 0;color:#94a3b8;width:100px">From</td><td style="padding:8px 0;font-weight:600">${escapeHtml(from_name)}</td></tr>
        <tr><td style="padding:8px 0;color:#94a3b8">Email</td><td style="padding:8px 0"><a href="mailto:${escapeHtml(from_email)}" style="color:#06b6d4">${escapeHtml(from_email)}</a></td></tr>
        ${subject ? `<tr><td style="padding:8px 0;color:#94a3b8">Subject</td><td style="padding:8px 0">${escapeHtml(subject)}</td></tr>` : ""}
      </table>
      <hr style="border:none;border-top:1px solid rgba(255,255,255,0.08);margin:24px 0"/>
      <p style="color:#94a3b8;margin:0 0 8px">Message</p>
      <p style="white-space:pre-wrap;line-height:1.7;margin:0">${escapeHtml(message)}</p>
    </div>
    <div style="padding:16px 32px;background:rgba(255,255,255,0.03);text-align:center;color:#475569;font-size:12px">
      Sent via Hamzaoui Moetez's Portfolio
    </div>
  </div>
`;

const gmail = nodemailer.createTransport({
  service: "gmail",
  auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD },
});

async function sendMail({ subject, html, replyTo }) {
  if (RESEND_API_KEY) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: RESEND_FROM, to: [CONTACT_TO], reply_to: replyTo, subject, html }),
    });
    if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
    return;
  }
  await gmail.sendMail({ from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`, to: CONTACT_TO, replyTo, subject, html });
}

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", mailer: RESEND_API_KEY ? "resend" : "gmail", configured: Boolean(CONTACT_TO) });
});

app.post("/api/contact", async (req, res) => {
  const { from_name = "", from_email = "", subject = "", message = "" } = req.body || {};

  if (!from_name.trim() || !from_email.trim() || !message.trim()) {
    return res.status(400).json({ success: false, error: "Missing required fields." });
  }
  if (!EMAIL_RE.test(from_email) || from_name.length > 100 || subject.length > 150 || message.length > 5000) {
    return res.status(400).json({ success: false, error: "Invalid input." });
  }
  if (rateLimited(req.ip)) {
    return res.status(429).json({ success: false, error: "Too many messages, please try again later." });
  }

  try {
    await sendMail({
      subject: subject ? `[Portfolio] ${subject}` : `[Portfolio] New message from ${from_name}`,
      html: renderEmail({ from_name, from_email, subject, message }),
      replyTo: from_email,
    });
    res.json({ success: true });
  } catch (err) {
    console.error("Email error:", err.message);
    res.status(500).json({ success: false, error: "Could not send the message." });
  }
});

app.listen(PORT, () => console.log(`✅ Contact API on port ${PORT} (mailer: ${RESEND_API_KEY ? "resend" : "gmail"})`));
