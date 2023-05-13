import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Registration from '../views/registration.vue'
import FindeOne from '../views/FindOne.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    children:[
      {
        path:'registration',
        component:Registration
      },{
      path:'FindOne',
      component:FindeOne
    }]
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
