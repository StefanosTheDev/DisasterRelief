import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMPT_PORT || '587', 10),
  secure: false, // Use TLS
  auth: {
    user: process.env.SMPT_USER,
    pass: process.env.SMPT_PASS,
  },
});

/**
 * Send And Email
 * @Param To Recipients Email Address
 * @Param Subject Email Subject
 * @param Text Email Body Text
 */

export async function sendEmail(to: string, subject: string, text: string) {
  await transporter.sendMail({
    from: `"Your App" <${process.env.SMTP_USER}>`,
    to,
    subject,
    text,
  });
}
