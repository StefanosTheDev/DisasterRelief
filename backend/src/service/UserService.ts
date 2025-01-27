import AppError from '../error/appError';
import prisma from '../prisma/prismaClient';

export async function getUserRecords() {
  const users = await prisma.user.findMany();
  if (!users) {
    throw new AppError('No Users Found', 400);
  }
  return users;
}

// Okay so what are the principles of a good update.
// First point of contact: Controller -> Zod Schema  (Validate Data) -> Service Level.
// Okay now
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
