import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

const user = await User.create({
  name: "Admin",
  email: "admin@empresa.com",
  password: await bcrypt.hash("123456", 10),
  role: "admin",
});

console.log("Admin creado");
process.exit();
