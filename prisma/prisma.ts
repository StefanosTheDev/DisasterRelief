const { PrismaClient } = require('@prisma/client');

// Create and export a single Prisma Client instance for the whole app
export const prisma = new PrismaClient();
