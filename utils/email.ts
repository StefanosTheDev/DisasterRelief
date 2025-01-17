import sgMail from '@sendgrid/mail';
import AppError from '../error/AppError';
import dotenv from 'dotenv';

dotenv.config();

export async function sendEmail(to: string, subject: string, message: string) {
  const apiKey = process.env.SENDGRID_API_KEY as string;
  if (!apiKey) {
    throw new AppError(
      'SendGrid API key is not set. Check your environment variables',
      404
    );
  }
  sgMail.setApiKey(apiKey);

  // Define the email message
  const msg: sgMail.MailDataRequired = {
    to: to, // Replace with recipient's email
    from: 'no-reply@em9716.clearstack.ai', // Replace with your verified SendGrid sender email
    subject: subject,
    text: message, // Plain text message
    html: `<strong>${message}</strong>`, // HTML message including the variable
  };

  try {
    await sgMail.send(msg);
    console.log('Email sent successfully!');
  } catch (error) {
    console.log(error);
    throw new AppError('Sendgrid Response: ', 400);
  }
}
