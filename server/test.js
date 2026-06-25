import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: "hmmotez9@gmail.com", pass: "mnxeydylaxgeiktg" },
});

const info = await transporter.sendMail({
  from: "Portfolio <hmmotez9@gmail.com>",
  to:   "hmmotez9@gmail.com",
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
