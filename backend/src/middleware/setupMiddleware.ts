import express, { Request, Response } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import AppError from '../error/appError';

export function setupMiddleware(app: express.Application) {
  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  }
  app.use(helmet());

  app.use(
    express.json({
      verify: (
        req: Request,
        res: Response,
        buf: Buffer,
        encoding: BufferEncoding
      ) => {
        try {
          JSON.parse(buf.toString(encoding));
        } catch (err) {
          throw new AppError('Invalid JSON payload', 400);
        }
      },
    })
  );
}
