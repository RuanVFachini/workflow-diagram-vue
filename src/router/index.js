import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/home/Home.vue";
import DiagramHome from "../views/diagram/DiagramHome";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/diagram",
    name: "DiagramHome",
    component: DiagramHome,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
