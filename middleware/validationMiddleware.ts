const { z } = require('zod');
import { ZodSchema } from 'zod';
import AppError from '../error/AppError';
import { Request, Response, NextFunction } from 'express';
export function validate<T>(schema: ZodSchema<T>) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Merge `req.params` and `req.body` into a single object for validation
      const dataToValidate = { ...req.params, ...req.body };

      // Validate the data asynchronously with the schema
      const validatedData = await schema.parseAsync(dataToValidate);

      // Attach validated data to req for use in the controllers
      req.validatedData = validatedData;

      next(); // Proceed to the next middleware or route handler
    } catch (err) {
      if (err instanceof z.ZodError) {
        // Map Zod errors to a suitable format for AppError
        const errors = err.errors.map((e) => ({
          field: e.path.join('.'),
          message: e.message,
        }));

        // Pass the validation error to the global error handler
        return next(new AppError('Validation Failed', 400, errors));
      }

      // Pass other unexpected errors to the global error handler
      next(err);
    }
  };
}
