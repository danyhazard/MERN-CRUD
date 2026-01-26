import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  permissions: {
    type: [String],
    default: []
  }
}, { timestamps: true });

export default mongoose.model("Role", roleSchema);
