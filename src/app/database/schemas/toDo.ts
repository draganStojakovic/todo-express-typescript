import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    done: { type: Boolean, default: 0 },
    archived: { type: Boolean, default: 0 },
    title: { type: String, required: true },
    desc: { type: String, default: null },
  },
  { timestamps: true }
);

export const ToDo = mongoose.model("ToDo", todoSchema);
