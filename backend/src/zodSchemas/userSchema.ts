const { z } = require('zod');

export const userSchema = z.object({
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
});
