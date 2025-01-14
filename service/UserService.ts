// ✅ New ES module import
import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export class UserService {
  public static async createUser(
    name: string,
    email: string,
    password: string,
    // Now TS knows this is both a type and a runtime enum
    role: Role = Role.USER
  ) {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    return prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
    });
  }

  public static async getUserById(id: string) {
    return prisma.user.findUnique({ where: { id } });
  }
}
