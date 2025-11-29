import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  regName: {
    type: String,
    required: true,
  },
  regEmail: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);
export default User;
