import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import { config } from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: join(__dirname, "../.env") });

const app  = express();
const PORT = process.env.SERVER_PORT || 5000;

app.use(cors({ origin: ["http://localhost:5173", "http://localhost:4173"] }));
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

app.post("/api/contact", async (req, res) => {
  const { from_name, from_email, subject, message } = req.body;

  if (!from_name || !from_email || !message) {
    return res.status(400).json({ success: false, error: "Missing required fields." });
  }

  const mailOptions = {
    from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
    to:   process.env.GMAIL_USER,
    replyTo: from_email,
    subject: subject ? `[Portfolio] ${subject}` : `[Portfolio] New message from ${from_name}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#0a0f1e;color:#e2e8f0;border-radius:12px;overflow:hidden">
        <div style="background:linear-gradient(135deg,#06b6d4,#a855f7);padding:24px 32px">
          <h2 style="margin:0;color:#fff;font-size:20px">New Portfolio Message</h2>
        </div>
        <div style="padding:32px">
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:8px 0;color:#94a3b8;width:100px">From</td><td style="padding:8px 0;font-weight:600">${from_name}</td></tr>
            <tr><td style="padding:8px 0;color:#94a3b8">Email</td><td style="padding:8px 0"><a href="mailto:${from_email}" style="color:#06b6d4">${from_email}</a></td></tr>
            ${subject ? `<tr><td style="padding:8px 0;color:#94a3b8">Subject</td><td style="padding:8px 0">${subject}</td></tr>` : ""}
          </table>
          <hr style="border:none;border-top:1px solid rgba(255,255,255,0.08);margin:24px 0"/>
          <p style="color:#94a3b8;margin:0 0 8px">Message</p>
          <p style="white-space:pre-wrap;line-height:1.7;margin:0">${message}</p>
        </div>
        <div style="padding:16px 32px;background:rgba(255,255,255,0.03);text-align:center;color:#475569;font-size:12px">
          Sent via Hamzaoui Moetez's Portfolio
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true });
  } catch (err) {
    console.error("Email error:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(PORT, () => console.log(`✅ Email server running on http://localhost:${PORT}`));
