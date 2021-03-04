import mongoose, { Document } from "mongoose";
type Message = {
  from: string;
  to: string;
  content: string;
} & Document;
const schema = new mongoose.Schema<Message>(
  {
    from: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
    to: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
    content: { type: String },
    read: { type: Boolean },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Message", schema);
