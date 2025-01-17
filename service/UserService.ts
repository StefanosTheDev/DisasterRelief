import AppError from '../error/AppError';
import prisma, { Role } from '../prisma/prismaClient';
import bcrypt from 'bcrypt';
import { signToken } from '../jwt/jwtSecurity';

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
