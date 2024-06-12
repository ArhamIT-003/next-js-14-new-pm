import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      min: 3,
      max: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
    },
    password: {
      type: String,
      required: true,
    },
    projects: [{ type: mongoose.Types.ObjectId, ref: "Project" }],
  },
  { timestamps: true }
);

export const User = mongoose.models.User || mongoose.model("User", userSchema);

