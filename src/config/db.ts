// src/config/db.ts
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
  console.log( 'process.env.NODE_ENV ',process.env);

    const conn = await mongoose.connect(process.env.MONGO_URI || '');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error: ${error.message}`);
    } else {
      console.error('Error:', error);
    }
    process.exit(1);
  }
};

export default connectDB;
