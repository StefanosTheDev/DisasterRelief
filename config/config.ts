// config.ts
if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET is not set in .env');
}

if (!process.env.JWT_EXPIRES_IN) {
  throw new Error('JWT_EXPIRES_IN is not set in .env');
}

export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
