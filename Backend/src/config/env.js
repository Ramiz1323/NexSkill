import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

export const env = {
  PORT: process.env.PORT || 5001,
  NODE_ENV: process.env.NODE_ENV || 'development',
  MONGO_URI: process.env.MONGO_URI || process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/nexskill',
  JWT_SECRET: process.env.JWT_SECRET || 'nexskill_super_secret_jwt_key_sih_2026',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || process.env.JWT_EXPIRE || '7d',
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:5173',
};

export default env;
