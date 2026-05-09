import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    }
  },
  {
    versionKey: false
  }
);

export default mongoose.model("Contact", contactSchema);
