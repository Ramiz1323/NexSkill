import mongoose from 'mongoose';
import env from './env.js';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}/${conn.connection.name}`);

    mongoose.connection.on('error', (err) => {
      console.error(`❌ MongoDB Runtime Error: ${err.message}`);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️ MongoDB connection lost. Attempting reconnection...');
    });

    mongoose.connection.on('reconnected', () => {
      console.log('🔄 MongoDB Reconnected successfully.');
    });

    // Graceful Shutdown
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('🛑 MongoDB connection closed due to app termination.');
      process.exit(0);
    });

    return conn;
  } catch (error) {
    console.error(`❌ MongoDB Initial Connection Error: ${error.message}`);
    // Don't kill process in development if Mongo isn't running locally yet
    if (env.NODE_ENV === 'production') {
      process.exit(1);
    }
  }
};

export default connectDB;
