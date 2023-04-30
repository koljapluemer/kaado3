import { createRouter, createWebHistory } from "vue-router";
import Queue from "../views/Queue.vue";

const routes = [
  {
    path: "/",
    name: "Queue",
    component: Queue,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
