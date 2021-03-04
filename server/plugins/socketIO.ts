import { Server, Socket } from "socket.io";
import { Server as HttpServer } from "http";

export default (server: HttpServer) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  const userMap = new Map();

  io.on("connection", (socket: Socket) => {
    const { id } = socket.handshake.auth;
    console.log("a user connected", id);
    if (id) {
      userMap.set(id, socket);
    }
    socket.on("message", (msg) => {
      console.log(msg);
      socket.send(msg)
      socket.send({
        from: msg.to,
        to: msg.from,
        content: msg.content,
      });
    });
    socket.on("disconnect", () => {
      userMap.delete(id);
    });
  });
};
