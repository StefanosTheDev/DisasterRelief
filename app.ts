import express from 'express';
const userRoutes = require('./routes/UserRoutes');

const app = express();

// Middleware to parse JSON  (Double check this)
app.use(express.json());

// Routes Import:
app.use('/users', userRoutes);

// Global Error Handler
export default app;
