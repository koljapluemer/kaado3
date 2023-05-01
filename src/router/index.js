import { createRouter, createWebHistory } from "vue-router";
import Queue from "../views/Queue.vue";
import CardList from "../views/CardList.vue";

const routes = [
  {
    path: "/",
    name: "Queue",
    component: Queue,
  },
  {
    path: "/cardlist",
    name: "CardList",
    component: CardList,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
