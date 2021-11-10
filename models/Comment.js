import mongoose, { Schema, model } from "mongoose";

const commentSchema = new Schema({
  taskId: { type: mongoose.Types.ObjectId, ref: "Task" },
  author: { type: mongoose.Types.ObjectId, ref: "User" },
  text: { type: String },
  files: [{ type: String }],
});

export const Comment = model("Comment", commentSchema);

