import mongoose, { Document } from "mongoose";
import bcrypt from "bcrypt";

const schema = new mongoose.Schema<
  { account: string; password: string } & Document
>({
  account: { type: String, unique: true },
  password: {
    type: String,
    select: false,
    set(val) {
      return bcrypt.hashSync(val, 10);
    },
  },
});

export default mongoose.model("User", schema);
