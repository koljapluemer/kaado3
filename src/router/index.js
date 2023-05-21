import { createRouter, createWebHistory } from "vue-router";
import Queue from "../views/Queue.vue";
import CardList from "../views/CardList.vue";
import CardAdd from "../views/CardAdd.vue";
import CardImport from "../views/CardImport.vue";
import CardEdit from "../views/CardEdit.vue";
import CardExport from "../views/CardExport.vue";

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
  {
    path: "/cardadd",
    name: "CardAdd",
    component: CardAdd,
  },
  {
    path: "/cardimport",
    name: "CardImport",
    component: CardImport,
  },
  {
    path: "/cardedit/:id",
    name: "CardEdit",
    component: CardEdit,
  },
  {
    path: "/cardexport",
    name: "CardExport",
    component: () => import("../views/CardExport.vue"),
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
