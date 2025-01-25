import { z } from 'zod';
import { ZodSchema } from 'zod';
import AppError from '../error/appError';
import { Request, Response, NextFunction } from 'express';

export function validate<T>(schema: ZodSchema<T>) {
  return async (
    req: Request & { validatedData?: T },
    res: Response,
    next: NextFunction
  ) => {
    try {
      const dataToValidate = { ...req.params, ...req.body };

      // Validate the data using Zod
      req.validatedData = await schema.parseAsync(dataToValidate);

      next(); // Continue to the next middleware or route handler
    } catch (err) {
      if (err instanceof z.ZodError) {
        const errors = err.errors.map(
          (e) => `${e.path.join('.')}: ${e.message}`
        );

        return next(new AppError('Validation Failed', 400, errors)); // Pass an array of strings
      }

      next(err); // Pass any other error to the error handler
    }
  };
}
