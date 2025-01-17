import prisma, { Role } from '../prisma/prismaClient';
// why do we have it as static this the best way to write this?
export async function registerUser({
  name,
  email,
  password,
  role,
}: {
  name: string;
  email: string;
  password: string;
  role: Role; // in the ZOD schema yah validate the USER | ADMIN
}) {
  // 1. Create the user in the database
  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password,
      role,
    },
  });
  return newUser;
}
