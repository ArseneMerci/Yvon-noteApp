import mongoose from "mongoose";

const NotesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

export default mongoose.models.Notes || mongoose.model("Notes", NotesSchema);
