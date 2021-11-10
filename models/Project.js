import mongoose, { Schema, model } from "mongoose";

const projectSchema = new Schema({
  logo: { type: String },
  identifier: { type: String },
  description: { type: String },
  status: { type: Number },
  redmineProjectId: { type: Number },
  created_on: { type: String, default: new Date(Date.now()).toISOString() },
  updated_on: { type: String },
  deadline: { type: String },
  milestone: { type: String },
  members: [{ type: mongoose.Types.ObjectId, ref: "ProjectMember" }],
  owner: { type: mongoose.Types.ObjectId, ref: "User" },
  tasks: [{ type: mongoose.Types.ObjectId, ref: "Task" }],
  files: [{ type: String }],
  kanbanSchema: { type: Object },
  kanbanBoard: { type: Object },
});

export const Project = model("Project", projectSchema);

