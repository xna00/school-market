import { io } from "socket.io-client";
import { ref } from "vue";
const sessions = ref<
  {
    id: string;
    unReadCount: number;
    msgs: Message[];
  }[]
>([]);
const extraHeaders: { [header: string]: string } = {};
if (localStorage.token) {
  extraHeaders.Authorization = "Bearer " + localStorage.token;
}
const socket = io(<string>import.meta.env.VITE_API_URL, {
  extraHeaders,
});
socket.on("connect", () => {
  console.log("connected");
  socket.emit("get messages");
});
type Message = {
  from: string;
  to: string;
  content: string;
  createAt: string;
  read?: boolean;
};
const me = localStorage.id;
// 后面的 timestamp 大
socket.on("message", (msgs: Message[]) => {
  msgs.forEach((msg) => {
    // id 是对方的 id
    const id = me === msg.from ? msg.to : msg.from;
    let ms = sessions.value.find((m) => m.id === id);
    if (!ms) {
      ms = { id, msgs: [], unReadCount: 0 };
      sessions.value.push(ms);
    }
    ms.msgs.push(msg);
    if (msg.from !== localStorage.id && !msg.read) {
      ms.unReadCount++;
    }
  });
  sessions.value.sort((ma, mb) => {
    const timeA = new Date(ma.msgs[ma.msgs.length - 1].createAt).getTime();
    const timeB = new Date(mb.msgs[mb.msgs.length - 1].createAt).getTime();
    return timeB - timeA;
  });
  console.log(sessions.value);
});
socket.on("disconnect", () => {
  console.log("disconnect");
  socket.connect();
});
export { socket, sessions };
