import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import UserSchema from "./Schema.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Default route
app.get("/", (req, res) => {
    res.send("API is running...");
});

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((error) => console.log("Error:", error));

const User = mongoose.model("User", UserSchema);

// Signup route
app.post("/api/signup", async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser)
    return res.status(400).json({ message: "User already exists" });

  const newUser = new User({ name, email, password });
  await newUser.save();
  res.status(201).json({ message: "Signup Successful" });
});

// Login route
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "User not found" });
  if (user.password !== password)
    return res.status(400).json({ message: "Invalid Credentials" });

  res.json({ message: "Login Successful", user });
});

// Export the app for Vercel
export default app;
