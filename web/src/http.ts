import axios from "axios";

const http = axios.create({
  baseURL: (<string>import.meta.env.VITE_API_URL || "") + "/api",
});
http.interceptors.request.use((config) => {
  if (localStorage.token) {
    config.headers.Authorization = "Bearer " + localStorage.token;
  }
  return config;
});
export default http;
