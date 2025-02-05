import express from 'express';
import authRoutes from './routes/authRoute';
import { globalErrorHandler } from './middleware/errorHandling';
import campaignRoutes from './routes/campaignRoute';
import userRoutes from './routes/userRoute';
import { setupMiddleware } from './middleware/setupMiddleware';

const app = express();

// Intial Setup Middleware
setupMiddleware(app);

// Routes
app.use('/auth', authRoutes);
app.use('/campaign', campaignRoutes);
app.use('/users', userRoutes);

// Global Error Handling Middleware
app.use(globalErrorHandler);

export default app;
