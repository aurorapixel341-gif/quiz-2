import mongoose from "mongoose";
const url = "mongodb://localhost:27017/weatherAppDB";

const connectDB = async () => {
  try {
    await mongoose.connect(url);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error(error);
  }
};

export default connectDB;
