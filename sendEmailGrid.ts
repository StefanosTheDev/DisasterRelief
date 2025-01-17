import sgMail from '@sendgrid/mail'; // Use ES6 import syntax
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env

// Set SendGrid API Key
sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

/**
 * Send an email using SendGrid.
 * @param to Recipient's email address.
 * @param from Sender's verified email address.
 * @param subject Subject of the email.
 * @param text Plain text content of the email.
 * @param html HTML content of the email.
 */
export async function sendEmail({
  to,
  from,
  subject,
  text,
  html,
}: {
  to: string;
  from: string;
  subject: string;
  text: string;
  html: string;
}): Promise<void> {
  const msg = {
    to,
    from,
    subject,
    text,
    html,
  };

  try {
    await sgMail.send(msg);
    console.log('Email sent');
  } catch (error) {
    console.log('Failed to send email:', error);
  }
}
