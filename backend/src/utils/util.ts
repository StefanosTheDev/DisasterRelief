import dotenv from 'dotenv';
import fetch from 'node-fetch';
import AppError from '../error/appError';

dotenv.config({ path: './config.env' }); // Load environment variables

/**
 * Validate email using Hunter.io API.
 * @param email - Email address to validate.
 * @returns A promise that resolves to true if the email is valid, otherwise throws an error.
 */

export const validateEmail = async (email: string) => {
  const apiKey = process.env.HUNTER_KEY;
  if (!apiKey) {
    throw new AppError('Cannot Read Hunter API Key', 400);
  }

  const url = `https://api.hunter.io/v2/email-verifier?email=${email}&api_key=${apiKey}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new AppError(`HTTP error! Status: ${response.status}`, 400);
    }

    // Directly type the API response inline
    const data = (await response.json()) as {
      data: {
        status: string;
      };
    };

    if (data.data.status !== 'valid') {
      throw new AppError('Email is Invalid From API', 400);
    }

    return true;
  } catch (error: any) {
    throw new AppError(`Error validating email: ${error.message}`, 500);
  }
};
