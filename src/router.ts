import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    name: "随机点名",
    path: "/",
    component: () => import("./views/Random.vue"),
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;
