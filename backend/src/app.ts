import express from 'express';
import userRoutes from './routes/UserRoutes';
import { globalErrorHandler } from './middleware/errorHandling';
import morgan from 'morgan';
import helmet from 'helmet';
import donationRoutes from './routes/donationRoute';
const app = express();
import { Request, Response, NextFunction } from 'express';

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(helmet());

app.use(express.json());
app.get('/', (req: Request, res: Response) => {
  res.send('Hello from your secure Express + Helmet server!');
});

// Routes Import:
app.use('/users', userRoutes);
app.use('/campaign', donationRoutes);
app.use(globalErrorHandler);
// Global Error Handler
export default app;
