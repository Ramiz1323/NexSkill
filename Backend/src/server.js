import app from './app.js';
import connectDB from './config/database.js';
import env from './config/env.js';

export const startServer = async () => {
  try {
    // Initialize Database Connection
    await connectDB();

    const server = app.listen(env.PORT, () => {
      console.log(`🚀 NexSkill Backend running in [${env.NODE_ENV}] mode on port ${env.PORT}`);
      console.log(`🔗 Health Check: http://localhost:${env.PORT}/api/health`);
    });

    // Handle Unhandled Promise Rejections
    process.on('unhandledRejection', (err) => {
      console.error(`❌ Unhandled Rejection: ${err.message}`);
      // Close server & exit in production
      if (env.NODE_ENV === 'production') {
        server.close(() => process.exit(1));
      }
    });

    // Handle Uncaught Exceptions
    process.on('uncaughtException', (err) => {
      console.error(`❌ Uncaught Exception: ${err.message}`);
      if (env.NODE_ENV === 'production') {
        process.exit(1);
      }
    });

    return server;
  } catch (error) {
    console.error('❌ Server startup error:', error);
    process.exit(1);
  }
};

export default startServer;
