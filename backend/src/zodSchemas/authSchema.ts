const { z } = require('zod');
import { validateEmail } from '../utils/util';
export const authSchema = z
  .object({
    name: z
      .string({ required_error: 'Username Is Required' })
      .min(6, { message: 'Username minimum must be 6' })
      .max(12, { message: 'Username maximum must be 12' }),

    password: z
      .string({ required_error: 'Password Required' })
      .min(6, { message: 'Password minimum must be 6' })
      .max(12, { message: 'Password maximum must be 12' }),

    email: z.string({ required_error: 'Email Required' }),
    // .email({ message: 'Invalid email format' })
    // .refine(async (email: string) => {
    //   console.log('Refine function called', email);
    //   return await validateEmail(email);
    // }),
  })
  .strict({ message: 'There is an Invalid Field in The Request Body' });

export const loginSchema = z
  .object({
    email: z.string({ required_error: 'Password Required' }),
    password: z
      .string({ required_error: 'Password Required' })
      .min(6, { message: 'Password minimum must be 6' })
      .max(12, { message: 'Password maximum must be 12' }),
  })
  .strict({ message: 'There is an Invalid Field in The Request Body' });
