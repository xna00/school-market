import mongoose, { Document } from "mongoose";

const schema = new mongoose.Schema<
  {
    description: string;
    images: string[];
    price: number;
    seller: object;
  } & Document
>(
  {
    description: { type: String },
    images: [{ type: String }],
    price: { type: Number },
    seller: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Good", schema);
