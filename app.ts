import express from 'express';
import userRoutes from './routes/UserRoutes';
import { globalErrorHandler } from './middleware/errorHandling';
const app = express();

// Middleware to parse JSON  (Double check this)
app.use(express.json());

// Routes Import:
app.use('/users', userRoutes);

app.use(globalErrorHandler);
// Global Error Handler
export default app;
