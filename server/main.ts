import express from "express";
import { createServer } from "http";
import socketIO from "./plugins/socketIO";
import multer from "multer";
import cors from "cors";
import errorHandler from "./middleware/errorHandler";
import db from "./plugins/db";
import good from "./routes/good";
import auth from "./routes/auth";
import user from "./routes/user";
import post from "./routes/post";

import path from "./path.json";

const app = express();
const server = createServer(app);
socketIO(server);

app.use(cors());
const upload = multer({ dest: path.multerDest });
app.post("/api/upload", upload.single("image"), (req: any, res) => {
  const file = req.file;
  res.send({ fileUrl: file.path });
});
app.use("/uploads", express.static(__dirname + path.uploads));
app.use("/assets", express.static(__dirname + path.assets));
app.use("/", express.static(__dirname + path.web));
app.set("secret", "jf389u3cosidufq0e3");

app.use(express.json());

db(app);

good(app);
auth(app);
user(app);
post(app);

app.use(errorHandler());
server.listen(4000, () => {
  console.log("http://localhost:4000");
});
