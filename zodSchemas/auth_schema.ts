const { z } = require('zod');
import { Prisma, Role } from '@prisma/client';
const authSchema = z
  .object({
    username: z
      .string({ required_error: 'Username Is Required' })
      .min(6, { message: 'Username minimum must be 6' })
      .max(12, { message: 'Username maximum must be 12' }),

    password: z
      .string({ required_error: 'Password Required' })
      .min(6, { message: 'Username minimum must be 6' })
      .max(12, { message: 'Username maximum must be 12' }),

    role: z.enum(Role).optional(), // Specify allowed roles here
  })
  .strict({ message: 'There is an Invalid Field in The Request Body' });
