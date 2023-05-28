import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Registration from '../components/registration.vue'
import FindeOne from '../components/FindOne.vue'
import Login from '../components/login.vue'
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
    },{
      path:'Login',
      component:Login
    }]
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
