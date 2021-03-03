import axios from "axios";

const http = axios.create({
  baseURL: <string>import.meta.env.VITE_API_URL || "/api",
});
export default http;
