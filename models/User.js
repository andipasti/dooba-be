import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema({
  email: { type: String, required: [true, "name is required"], unique: true },
  name: { type: String, default: "" },
  password: { type: String, required: [true, "password is required"]},
  team: { type: mongoose.Types.ObjectId, ref: "Team" },
  changePasswordToken: { type: String },
});

export const User = model("User", userSchema);
