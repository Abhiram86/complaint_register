import mongoose from "mongoose";

interface User {
  username: string;
  email: string;
  password: string;
  role: "admin" | "user";
}

const userSchema = new mongoose.Schema<User>({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true, default: "user" },
});

export const User =
  mongoose.models.User || mongoose.model("User", userSchema, "users");
