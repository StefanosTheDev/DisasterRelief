import AppError from '../error/appError';
import prisma from '../prisma/prismaClient';
import bcrypt from 'bcrypt';
import { signToken } from '../jwt/jwtSecurity';
import { parsePrismaError } from '../error/prismaError';

export async function createUserRecord({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) {
  // 1. Hash the password before storing
  // Note: The second argument "saltRounds" is how many rounds of salt to apply. 10-12 is common.
  const hashedPassword = await bcrypt.hash(password, 12);

  try {
    // 2. Create the user in the database with the hashed password

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    return newUser;
  } catch (error) {
    throw parsePrismaError({
      error,
      codes: {
        // unique constraint failed
        P2002: new AppError('A user with that email address exists', 400),
        default: new AppError(
          'Something went wrong. Please try again later.',
          500
        ),
      },
    });
  }
}

export async function validateUserRecord({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    // 1. Find the user by email . Make sure your working through active.
    const user = await prisma.user.findUnique({
      where: { email, isDeleted: false },
    });

    // Check if User OBJ was found & Make sure its not deleted.
    if (!user) {
      throw new AppError('Invalid credentials', 403);
    }

    // 3. Compare the provided plaintext password to the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new AppError('Password is incorrect', 400);
    }

    const token = await signToken(user.id);
    return { user, token };
  } catch (error) {
    throw parsePrismaError({
      error,
      codes: {
        P2016: new AppError('Invalid query or database configuration', 500),
        // Catch any unexpected database errors and throw a generic error
        default: new AppError(
          'Something went wrong. Please try again later.',
          500
        ),
      },
    });
  }
}
