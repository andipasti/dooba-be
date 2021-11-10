import mongoose, { Schema, model } from "mongoose";
import { CLIENT } from "../constants/roles";

const teamMemberSchema = new Schema({
  email: { type: String, required: true },
  user: { type: mongoose.Types.ObjectId, ref: "User" },
  team: { type: mongoose.Types.ObjectId, ref: "Team" },
  role: { type: String, default: CLIENT },
  projects: [{ type: mongoose.Types.ObjectId, ref: "Project" }],
});

export const TeamMember = model("TeamMember", teamMemberSchema);
