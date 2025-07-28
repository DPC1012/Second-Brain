import mongoose, { model, Schema } from "mongoose";

const LinkSchema = new Schema(
  {
    hash: { type: String, required: true },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

export const Link = model("Link", LinkSchema);
