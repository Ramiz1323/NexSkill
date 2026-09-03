export const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      console.log('No MONGODB_URI specified. Skipping database connection.');
      return;
    }
    console.log('Database configuration module ready.');
  } catch (error) {
    console.error('Database connection error:', error.message);
  }
};
