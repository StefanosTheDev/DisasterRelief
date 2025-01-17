import express from 'express';
import userRoutes from './routes/UserRoutes';
import { globalErrorHandler } from './middleware/errorHandling';
import morgan from 'morgan';
import { loadConfig } from './config/config';
const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
loadConfig();

// Middleware to parse JSON  (Double check this)
app.use(express.json());

// Routes Import:
app.use('/users', userRoutes);

app.use(globalErrorHandler);
// Global Error Handler
export default app;
