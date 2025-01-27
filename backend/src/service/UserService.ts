import AppError from '../error/appError';
import prisma from '../prisma/prismaClient';

export async function getUserRecords() {
  const users = await prisma.user.findMany();
  if (!users) {
    throw new AppError('No Users Found', 400);
  }
  return users;
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

export async function getUserRecordByID() {}

export async function deleteUserRecordByID({ id }) {
  const deleteUser = await prisma.user.delete({
    where: {
      id: id,
    },
  });
}
