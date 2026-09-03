import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import corsOptions from './config/cors.js';
import env from './config/env.js';
import apiRoutes from './routes/index.js';
import errorMiddleware from './middleware/error.middleware.js';
import ApiError from './utils/ApiError.js';

const app = express();

// Security & Cross-Origin
app.use(cors(corsOptions));
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

// Body & Cookie Parsers
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(cookieParser());

// Static Files (for resumes/uploads)
app.use('/uploads', express.static('uploads'));

// Development Request Logger
if (env.NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.originalUrl}`);
    next();
  });
}

// Root Route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to NexSkill SIH 2026 Backend API',
    status: 'Active',
    health: '/api/health',
    version: '1.0.0',
  });
});

// Mount Master API Router
app.use('/api', apiRoutes);

// Catch-all 404 handler for unhandled endpoints
app.use((req, res, next) => {
  next(new ApiError(404, `Route ${req.originalUrl} not found on this server`));
});

// Centralized Error Handling Middleware
app.use(errorMiddleware);
    docs: '/api/health',
  });
});

// API Routes
app.use('/api', masterRouter);

// Global Error Handler
app.use(errorHandler);

export default app;
