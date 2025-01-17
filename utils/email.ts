import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587', 10), // Gmail SMTP port
  secure: false, // Use TLS
  auth: {
    user: process.env.SMTP_USER, // Gmail address
    pass: process.env.SMTP_PASS, // App Password
  },
});

/**
 * Send an email.
 * @param to Recipient's email address.
 * @param subject Email subject.
 * @param text Email body text.
 */
export async function sendEmail(
  to: string,
  subject: string,
  text: string
): Promise<void> {
  try {
    const info = await transporter.sendMail({
      from: `"Your App Name" <${process.env.SMTP_USER}>`, // Sender address
      to, // Recipient
      subject, // Subject
      text, // Email body
    });

    console.log(`Email sent: ${info.messageId}`);
  } catch (error) {
    console.error('Failed to send email:', error);
    throw error;
  }
}
