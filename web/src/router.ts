import { createWebHashHistory, createRouter } from "vue-router";

import Market from "./views/Market.vue";
import Trend from "./views/Trend.vue";
import Message from "./views/Message.vue";
import Me from "./views/Me.vue";
import Search from "./views/Search.vue";
const history = createWebHashHistory();
const router = createRouter({
  history,
  routes: [
    { path: "/market", component: Market },
    { path: "/trend", component: Trend },
    { path: "/message", component: Message },
    { path: "/me", component: Me },
    { path: "/search", component: Search },
    { path: "/:pathMatch(.*)*", redirect: "/market" },
  ],
});
export default router;
