import { Server, Socket } from "socket.io";
import { Server as HttpServer } from "http";
import auth from "../middleware/auth";
import Message from "../models/Message";

export default (server: HttpServer) => {
  // true
  // console.log('??',server.listeners("request")[0] === app);
  const app = server.listeners("request")[0];
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });
  // false
  // console.log('??',server.listeners("request")[0] === app);
  const wrap = (middleware) => (socket, next) => {
    // false 为什么？
    // console.log(server.listeners("request")[0] === app);

    socket.request.app = app;
    middleware(socket.request, {}, next);
  };
  io.use(wrap(auth("socketio")));

  const userMap = new Map();

  io.on("connection", (socket: Socket) => {
    const { id } = (socket.request as any).user;
    if (!id) {
      return;
    }
    userMap.set(id, socket);

    socket.on("message", async (msg) => {
      const res = await Message.create({ ...msg, read: false, from: id });
      socket.send([res]);
      userMap.get(res.to.toString())?.send([res]);
    });
    socket.on("get messages", async (query = {}) => {
      const res = await Message.find({
        $or: [{ to: id }, { from: id }],
      });
      socket.send(res);
    });
    socket.on("read", async (from) => {
      // 读了之后可以删了？
      (
        await Message.find({
          from,
          to: id,
        })
      ).forEach((m) => {
        m.read = true;
        m.save();
      });
    });
    socket.on("disconnect", () => {
      userMap.delete(id);
    });
  });
};
