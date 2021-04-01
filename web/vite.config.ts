import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx({
      // options are passed on to @vue/babel-plugin-jsx
    }),
  ],
  server: {
    proxy: {
      "/api": "http://localhost:4000/",
      "/upload": "http://localhost:4000/",
      "/uploads": "http://localhost:4000/",
      "/assets": "http://localhost:4000/",
    },
  },
  resolve: {
    alias: {
      "socket.io-client": "socket.io-client/dist/socket.io.js",
    },
  },
});
