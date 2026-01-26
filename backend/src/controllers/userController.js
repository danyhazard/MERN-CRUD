import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const getUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

export const createUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashed,
    role,
  });

  res.status(201).json(user);
};

export const deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "Usuario eliminado" });
};


export const updateUser = async (req, res) => {
  const { name, email, role } = req.body;

  const user = await User.findByIdAndUpdate(
    req.params.id,
    { name, email, role },
    { new: true }
  ).select("-password");

  res.json(user);
};