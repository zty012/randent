import { RouteRecordRaw, createRouter, createWebHashHistory } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/camera",
  },
  {
    path: "/camera",
    component: () => import("./views/Camera.vue"),
  },
  {
    path: "/gacha/:gacha",
    component: () => import("./views/Gacha.vue"),
  },
];

const router = createRouter({
  routes,
  history: createWebHashHistory(),
});

export default router;
