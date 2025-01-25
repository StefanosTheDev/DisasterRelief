// config.ts

import sgMail from '@sendgrid/mail';
import AppError from '../error/appError';
import dotenv from 'dotenv';
// Load environment variables
dotenv.config();
if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET is not set in .env');
}

if (!process.env.JWT_EXPIRES_IN) {
  throw new Error('JWT_EXPIRES_IN is not set in .env');
}

export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
export function loadConfig() {
  const apiKey = process.env.SENDGRID_API_KEY;

  if (!apiKey) {
    throw new AppError(' SendGrid API key is not set. ', 404);
  }

  sgMail.setApiKey(apiKey);
  console.log('Sendgrid API key loaded successfully');
}
