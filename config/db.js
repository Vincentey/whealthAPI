import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_CONNECT, {
    });
    console.log(`Connected to MongoDB:${conn.connection.host}`);
    return conn;
  } catch (e) {
    console.log(`Failed to load: ${e.message}`);
    process.exit(1);
  }
};

export default connectDb;
