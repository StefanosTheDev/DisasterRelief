import AppError from '../error/appError';
import prisma from '../prisma/prismaClient';
import { parsePrismaError } from '../error/prismaError';
import bcrypt from 'bcrypt';

export async function getUserRecords() {
  try {
    const users = await prisma.user.findMany({
      where: {
        isDeleted: false,
      },
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
export async function getUserRecordByID({ userId }: { userId: string }) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
        isDeleted: false,
      },
    });
    if (!user) {
      throw new AppError('User with that ID does not exist', 404);
    }
    return user;
  } catch (error) {
    throw parsePrismaError({
      error,
      codes: {
        P2016: new AppError('Invalid query or database issue occurred', 500),
        default: new AppError('Database error occurred', 500),
      },
    });
  }
}

// NEED TO REVIEW THESE AND FINALIZE DELETION FLOW & Update User
export async function softDeleteUserRecord({ userId }: { userId: string }) {
  try {
    await prisma.campaign.updateMany({
      where: { userId, isDeleted: false },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
      },
    });

    // Step 2) Soft-delete the user
    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
      },
    });

    if (!user) {
      throw new AppError('User not found or already deleted', 400);
    }
    return user;
  } catch (error) {
    parsePrismaError({
      error,
      codes: {
        P2003: new AppError('Record being deleted has dependent records.', 400),
        default: new AppError(
          'An error occurred while deleting the user. ',
          500
        ),
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
  try {
    // Break down this line?
    const hashedPassword = password
      ? await bcrypt.hash(password, 12)
      : undefined;

    const user = prisma.user.update({
      where: { id, isDeleted: false },
      data: {
        name,
        email,
        ...(hashedPassword && { password: hashedPassword }),
      },
    });
    return user;
  } catch (error) {
    throw parsePrismaError({
      error,
      codes: {
        P2025: new AppError(
          'User not found. Cannot update non-existing user.',
          404
        ),
        P2002: new AppError('A user with this email already exists.', 400),
        default: new AppError(
          'Something went wrong while updating the user.',
          500
        ),
      },
    });
  }
}
