// ✅ New ES module import
import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcrypt';
import { CreateUserDTO } from '../interfaces/userInterface';
const prisma = new PrismaClient();

// why do we have it as static this the best way to write this?
export class UserService {
  public static async signUp(data: CreateUserDTO) {
    const { name, email, password, role = Role.USER } = data;

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

  public static async getUserById(id: string) {
    return prisma.user.findUnique({ where: { id } });
  }
}
