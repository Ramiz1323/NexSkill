import express from 'express';
import cors from 'cors';
import masterRouter from './routes/index.js';
import errorHandler from './middleware/errorMiddleware.js';

const app = express();

// Middlewares
app.use(
  cors({
    origin: process.env.CLIENT_URL || '*',
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
    next();
  });
}

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to NexSkill Backend API',
    status: 'Active',
    docs: '/api/health',
  });
});

// API Routes
app.use('/api', masterRouter);

// Global Error Handler
app.use(errorHandler);

export default app;
