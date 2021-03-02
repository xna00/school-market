import mongoose, { Document } from "mongoose";

export type Good = {
  description: string;
  images: string[];
  price: number;
  seller: object;
} & Document;
const schema = new mongoose.Schema<Good>(
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
