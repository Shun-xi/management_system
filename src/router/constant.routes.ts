import { RouteRecordRaw } from "vue-router";
import LoginView from "@/views/LoginView/LoginView.vue";
import result404 from "@/views/result404.vue";
import result401or403 from "@/views/result401or403.vue";

const constantRoutes: Array<RouteRecordRaw> = [
  // 登录、注册
  {
    path: "/LoginView",
    name: "LoginView",
    component: LoginView,
  },
  // 404
  {
    path: "/401_3",
    name: "401_3",
    component: result401or403,
  },
  // 404
  {
    path: "/:catchAll(.*)",
    name: "404",
    component: result404,
  },
];

export default constantRoutes;
