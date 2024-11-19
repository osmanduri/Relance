import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://Osman:R1skm2016od@cluster0.mxlwc.mongodb.net/Paiements' as string);
    console.log(`MongoDB Connected`);
  } catch (error) {
    console.error(`Error: ${(error as Error).message}`);
    process.exit(1);
  }
};

export default connectDB;
