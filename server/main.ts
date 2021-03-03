import express from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import cors from "cors";
import errorHandler from "./middleware/errorHandler";
import db from "./plugins/db";
import good from "./routes/good";
import auth from "./routes/auth";
import user from "./routes/user";

const app = express();
const server = createServer(app);
const io = new Server(server);
io.on("connection", (socket) => {
  console.log("a user connected");
});

app.set("secret", "jf389u3cosidufq0e3");

app.use(cors());
app.use(express.json());

db(app);

good(app);
auth(app);
user(app);

app.use(errorHandler());
server.listen(4000, () => {
  console.log("http://localhost:4000");
});
