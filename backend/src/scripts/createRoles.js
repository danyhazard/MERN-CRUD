import mongoose from "mongoose";
import Role from "../models/Role.js";
import dotenv from "dotenv";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

await Role.deleteMany();

await Role.insertMany([
  {
    key: "admin",
    name: "Administrador",
    permissions: [
      "users:view",
      "users:create",
      "users:edit",
      "users:delete",
      "roles:view",
      "roles:edit"
    ]
  },
  {
    key: "user",
    name: "Usuario",
    permissions: ["users:view"]
  }
]);

console.log("Roles creados");
process.exit();
