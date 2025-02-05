// If you are using ES modules, use the following import style:
import { z } from 'zod';
import { validateEmail } from '../utils/util';

export const authSchema = z
  .object({
    name: z
      .string({ required_error: 'Username is required' })
      .min(6, { message: 'Username must be at least 6 characters' })
      .max(12, { message: 'Username must be at most 12 characters' }),

    password: z
      .string({ required_error: 'Password is required' })
      .min(6, { message: 'Password must be at least 6 characters' })
      .max(12, { message: 'Password must be at most 12 characters' }),

    email: z
      .string({ required_error: 'Email is required' })
      .email({ message: 'Invalid email format' }),
    // The asynchronous refine will only run if the email passes the built‑in .email() check.
    // .refine(
    //   async (email: string) => {
    //     console.log('Async refine function called with:', email);
    //     return await validateEmail(email);
    //   },
    //   { message: 'Email is not valid or does not exist' }
    // ),
  })
  .strict({ message: 'There is an invalid field in the request body' });

export const loginSchema = z
  .object({
    email: z
      .string({ required_error: 'Email is required' })
      .email({ message: 'Invalid email format' }), // Optionally add .email() check for login as well.
    password: z
      .string({ required_error: 'Password is required' })
      .min(6, { message: 'Password must be at least 6 characters' })
      .max(12, { message: 'Password must be at most 12 characters' }),
  })
  .strict({ message: 'There is an invalid field in the request body' });
