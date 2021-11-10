import mongoose, { Schema, model } from "mongoose";

const taskSchema = new Schema({
  tag: { type: String },
  projectId: { type: mongoose.Types.ObjectId, ref: "Project" },
  comments: [{ type: mongoose.Types.ObjectId, ref: "Comment" }],
  assigned_to: [{ type: String }],
  subject: { type: String },
  description: { type: String },
  redmineProjectId: { type: String },
  redmineTaskId: { type: String },
  tracker: { type: String },
  status: { type: String },
  priority: { type: String },
  created_on: { type: String },
  updated_on: { type: String },
  closed_on: { type: String },
  done_ratio: { type: Number },
});

export const Task = model("Task", taskSchema);

