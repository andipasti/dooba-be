import mongoose, { Schema, model } from "mongoose";

const projectMemberSchema = new Schema({
  userId: { type: mongoose.Types.ObjectId, ref: "User" },
  projectId: { type: mongoose.Types.ObjectId, ref: "Project" },
  role: { type: String },
});

export const ProjectMember = model("ProjectMember", projectMemberSchema);

