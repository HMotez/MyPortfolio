/* Sends a test email with the Gmail settings from .env:  node server/test.js */
import nodemailer from "nodemailer";
import { config } from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: join(__dirname, "../.env") });

const { GMAIL_USER, GMAIL_APP_PASSWORD } = process.env;
if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
  console.error("Set GMAIL_USER and GMAIL_APP_PASSWORD in .env first.");
  process.exit(1);
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: GMAIL_USER, pass: GMAIL_APP_PASSWORD },
});

const info = await transporter.sendMail({
  from: `Portfolio <${GMAIL_USER}>`,
  to:   process.env.CONTACT_TO || GMAIL_USER,
  subject: "[Portfolio] ✅ Contact form is working!",
  html: `
    <div style="font-family:sans-serif;max-width:500px;margin:0 auto;padding:32px;background:#0a0f1e;color:#e2e8f0;border-radius:12px">
      <h2 style="color:#06b6d4">Portfolio email system is live! 🚀</h2>
      <p>Your contact form is now fully connected and sending directly to your Gmail.</p>
      <p style="color:#94a3b8">— Hamzaoui Moetez Portfolio</p>
    </div>
  `,
});

console.log("✅ Email sent:", info.messageId);
