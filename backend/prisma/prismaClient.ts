import { PrismaClient, Role } from '@prisma/client';

const prisma = new PrismaClient();

export default prisma; // Export the Prisma client as the default export
export { Role }; // Export Role as a named export
