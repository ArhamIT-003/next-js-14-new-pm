import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    state: {
      type: String,
      default: "todo",
      enum: ["todo", "in progress", "completed"],
    },
    team: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    createdBy: { type: String },
  },
  {
    timestamps: true,
  }
);

export const Project =
  mongoose.models.Project || mongoose.model("Project", projectSchema);
