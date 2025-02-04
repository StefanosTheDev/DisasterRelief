import AppError from '../error/appError';
import prisma from '../prisma/prismaClient';
import { parsePrismaError } from '../error/prismaError';

export async function getUserRecords() {
  try {
    const users = await prisma.user.findMany({
      include: {
        campaigns: true, // Includes the related campaigns in the user data.
      },
    });
    if (!users) {
      throw new AppError('No Users Found', 400);
    }
    return users;
  } catch (error) {
    throw parsePrismaError({
      error,
      codes: {
        P2016: new AppError('Invalid query or database issue occurred', 500),
        P2025: new AppError('Record not found during query execution', 404),

        default: new AppError('Database error occurred', 500),
      },
    });
  }
}

export async function updateUserRecordByID({
  id,
  name,
  email,
  password,
}: {
  id: string;
  name: string;
  email: string;
  password: string;
}) {
  // Now Update
  const updateUser = await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      name: name,
      email: email,
      password: password,
    },
  });
  return updateUser;
}

export async function getUserRecordByID({ id }: { id: string }) {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  console.log(user);
  return user;
}

export async function deleteUserRecordByID({ id }: { id: string }) {
  const deleteUser = await prisma.user.delete({
    where: {
      id,
    },
  });
  return deleteUser;
}
