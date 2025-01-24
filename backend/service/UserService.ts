import AppError from '../error/AppError';
import prisma, { Role } from '../prisma/prismaClient';
import bcrypt from 'bcrypt';
import { signToken } from '../jwt/jwtSecurity';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/config';
import { addToBlacklist, isBlacklisted } from '../jwt/tokenBlacklist';
import { sendEmail } from '../utils/email';
import { parse } from 'path';
export async function registerUser({
  name,
  email,
  password,
  role,
}: {
  name: string;
  email: string;
  password: string;
  role: Role; // from your Zod schema or enum
}) {
  // 1. Hash the password before storing
  //    The second argument "saltRounds" is how many rounds of salt to apply. 10-12 is common.
  const hashedPassword = await bcrypt.hash(password, 12);

  // 2. Create the user in the database with the hashed password
  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role,
    },
  });

  return newUser;
}

export async function loginUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  // 1. Find the user by email
  const user = await prisma.user.findUnique({
    where: { email },
  });

  // 2. If no user found, return early (or throw an error)
  if (!user) {
    throw new AppError('User does not exist', 400);
  }

  // 3. Compare the provided plaintext password to the stored hashed password
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new AppError('Password is incorrect', 400);
  }

  const token = await signToken(user.id);
  console.log(token);
  // 4. If valid, return the user (or proceed with generating a JWT, session, etc.)
  return { user, token };
}
/**
 * Log out a user by blacklisting their token.
 * @param authHeader The Authorization header from the request.
 */
export async function logoutUser(authHeader?: string): Promise<void> {
  // Ensure the Authorization header exists and is valid
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new AppError('Authorization header is missing or invalid.', 400);
  }

  // Extract the token
  const token = authHeader.split(' ')[1];
  if (!token) {
    throw new AppError('Token is missing from Authorization header.', 400);
  }

  try {
    // Decode the token to get expiration time
    const decoded = jwt.decode(token) as jwt.JwtPayload | null;

    if (!decoded || !decoded.exp) {
      throw new AppError('Invalid token.', 400);
    }

    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    const expiresIn = decoded.exp - currentTime;

    if (expiresIn <= 0) {
      throw new AppError('Token has already expired.', 400);
    }
  } catch (error) {
    throw new AppError('Unable to logout. Please try again.', 500);
  }
}

/**
 * Handle forgot username request
 * @param email users registred email.
 */
export async function forgotUsername(email: string): Promise<void> {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    throw new AppError('No Account found with that email', 404);
  }

  // Send email with the username
  const message = `Hello,\n\nYour username associated with this email is: ${user.name}.\n\nThank you.`;
  await sendEmail(email, 'Your Username', message);
}

export async function getUsers() {
  // Hit the Database To Retrieve Users
  // If No Users Found Throw AppError
  const users = await prisma.user.findMany();
  if (!users) {
    throw new AppError('No Users In The Database', 400);
  }
  return users;
}

// export async function searchUserByID({ id }: { id: string }) {
//   const numericId = parseInt(id, 10);
//   const result = await prisma.user.findUnique({
//     where: { id: numericId },
//   });
//   return result;
// }
