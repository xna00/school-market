import { User } from "./User";
import mongoose, { Document } from "mongoose";
export type Post = {
  author: string | User;
  replyTo: string | User;
  content: string;
  parent?: string | Post | null;
  replies?: Post[];
} & Document;
const schema = new mongoose.Schema<Post>(
  {
    author: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
    replyTo: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
    content: { type: String },
    parent: { type: mongoose.SchemaTypes.ObjectId, ref: "Post" },
  },
  // 注意
  { toJSON: { virtuals: true }, timestamps: true }
);
schema.virtual("replies", {
  ref: "Post",
  localField: "_id",
  foreignField: "parent",
  justOne: false,
});
export default mongoose.model("Post", schema);
