import { Schema, model } from "mongoose";

const fileSchema = new Schema({
  original_filename: { type: String },
  url: { type: String },
  bytes: { type: Number },
});

export const File = model("File", fileSchema);

