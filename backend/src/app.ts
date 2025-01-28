import express from 'express';
import authRoutes from './routes/authRoute';
import { globalErrorHandler } from './middleware/errorHandling';
import morgan from 'morgan';
import helmet from 'helmet';
import campaignRoutes from './routes/campaignRoute';
import userRoutes from './routes/userRoute';
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
app.use('/auth', authRoutes);
app.use('/campaign', campaignRoutes);
app.use('/users', userRoutes);

app.use(globalErrorHandler);
// Global Error Handler
export default app;
