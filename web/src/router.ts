import { createWebHashHistory, createRouter } from "vue-router";

import Market from "./views/Market.vue";
import Trend from "./views/Trend.vue";
import Message from "./views/Message.vue";
import Me from "./views/Me.vue";
import Search from "./views/Search.vue";
import Good from "./views/Good.vue";
import User from "./views/User.vue";
import Upload from "./views/Upload.vue";
import Chat from "./views/Chat.vue";
import CreatePost from "./views/CreatePost.vue";
import Post from "./views/Post.vue";
import EditProfile from "./views/EditProfile.vue";
import MyGoods from "./views/MyGoods.vue";
const history = createWebHashHistory();
const router = createRouter({
  history,
  routes: [
    { path: "/market", component: Market },
    { path: "/trend", component: Trend },
    { path: "/message", component: Message },
    { path: "/me", component: Me },
    { path: "/edit-profile", component: EditProfile },
    { path: "/search", component: Search },
    { path: "/goods/:id", component: Good, props: true },
    { path: "/users/:id", component: User, props: true },
    { path: "/upload/:id?", component: Upload, props: true },
    { path: "/chat/:id", component: Chat, props: true },
    { path: "/create-post", component: CreatePost },
    { path: "/posts/:id", component: Post, props: true },
    { path: "/my-goods", component: MyGoods },
    { path: "/:pathMatch(.*)*", redirect: "/market" },
  ],
});
export default router;
