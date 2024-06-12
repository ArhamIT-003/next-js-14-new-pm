import mongoose from "mongoose";

const backlogSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      min: 3,
      max: 30,
    },
    requirement: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

export const Backlogs =
  mongoose.models?.Backlogs || mongoose.model("Backlogs", backlogSchema);
