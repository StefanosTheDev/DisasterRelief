const { z } = require('zod');
export const campaignSchema = z
  .object({
    name: z
      .string({ required_error: 'Username Is Required' })
      .min(6, { message: 'Username minimum must be 6' })
      .max(12, { message: 'Username maximum must be 12' }),

    description: z
      .string({ required_error: 'Username Is Required' })
      .min(6, { message: 'Username minimum must be 6' })
      .max(12, { message: 'Username maximum must be 12' }),

    mediaUrl: z
      .string({ required_error: 'Username Is Required' })
      .min(6, { message: 'Username minimum must be 6' })
      .max(12, { message: 'Username maximum must be 12' }),
  })
  .strict({ message: 'There is an Invalid Field in The Request Body' });
