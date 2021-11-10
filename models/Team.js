import mongoose, { Schema, model } from "mongoose";

const teamSchema = new Schema({
  redmine_url: { type: String, required: true },
  redmine_api_key: { type: String, required: true },
  projects: [{ type: mongoose.Types.ObjectId, ref: "Project" }],
  users: [{ type: mongoose.Types.ObjectId, ref: "TeamMember" }],
});

export const Team = model("Team", teamSchema);
