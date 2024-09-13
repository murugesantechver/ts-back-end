// src/config/db.ts
import mongoose from 'mongoose';
import { logger } from '../utils/logger.utils';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || '');
    logger.info(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    if (error instanceof Error) {
      logger.error(`Error: ${error.message}`);
    } else {
      logger.error('Error:', error);
    }
    process.exit(1);
  }
};

export default connectDB;
