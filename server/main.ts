import express from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import multer from "multer";
import cors from "cors";
import errorHandler from "./middleware/errorHandler";
import db from "./plugins/db";
import good from "./routes/good";
import auth from "./routes/auth";
import user from "./routes/user";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("hi", (socket) => {
    console.log("hi");
  });
});

app.use(cors());
const upload = multer({ dest: "uploads/" });
app.post("/api/upload", upload.single("image"), (req: any, res) => {
  const file = req.file;
  res.send({ fileUrl: file.path });
});
app.use("/uploads", express.static(__dirname + "/uploads"));
app.set("secret", "jf389u3cosidufq0e3");

app.use(express.json());

db(app);

good(app);
auth(app);
user(app);

app.use(errorHandler());
server.listen(4000, () => {
  console.log("http://localhost:4000");
});
