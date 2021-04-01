import { Good } from "./Good";
import mongoose, { Document } from "mongoose";
import bcrypt from "bcrypt";

export type User = {
  account: string;
  password: string;
  goods: Good[];
} & Document;

const schema = new mongoose.Schema<User>(
  {
    account: { type: String, unique: true },
    avatar: {
      type: String,
      default: "/assets/default-avatar.svg",
    },
    name: { type: String, default: "无名氏" },
    password: {
      type: String,
      select: false,
      set(val) {
        return bcrypt.hashSync(val, 10);
      },
    },
  },
  {
    toJSON: { virtuals: true },
  }
);
schema.virtual("goods", {
  ref: "Good",
  localField: "_id",
  foreignField: "seller",
  justOne: false,
});

export default mongoose.model("User", schema);
