import { createApp } from "vue";
import router from "./router";
import App from "./App.vue";

import "./assets/style.scss";

import Layout from "./components/Layout.vue";
const app = createApp(App).use(router);
app.component("Layout", Layout);
app.mount("#app");
