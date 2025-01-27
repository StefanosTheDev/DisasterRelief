// config.ts
import sgMail from '@sendgrid/mail';
import AppError from '../error/appError';
import dotenv from 'dotenv';
// Load environment variables
dotenv.config();
if (!process.env.JWT_SECRET) {
  throw new AppError('JWT_SECRET is not set in .env', 404);
}

if (!process.env.JWT_EXPIRES_IN) {
  throw new AppError('JWT_EXPIRES_IN is not set in .env', 404);
}

export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN as `${number}`;
export function loadConfig() {
  const apiKey = process.env.SENDGRID_API_KEY;

  if (!apiKey) {
    throw new AppError(' SendGrid API key is not set. ', 404);
  }

  sgMail.setApiKey(apiKey);
  console.log('Sendgrid API key loaded successfully');
}
