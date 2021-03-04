import { createApp } from "vue";
import router from "./router";
import App from "./App.vue";

import "./assets/style.scss";

import Layout from "./components/Layout.vue";
import Icon from "./components/Icon";
const app = createApp(App).use(router);
app.component("Layout", Layout);
app.component('Icon', Icon)
app.mount("#app");
