import mongoose from "mongoose";

const usersDetails = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },

  email: { type: String, required: true, unique: true },

  firstName: { type: String, required: true },

  lastName: { type: String, required: true },

  category: { type: String, required: true, enum: ["doctor", "patient", "admin"] },

  password: { type: String, required: true },
});

const User = new mongoose.model("User", usersDetails);

export default User;
