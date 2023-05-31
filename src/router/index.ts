import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Registration from '../components/registration.vue'
import FindeOne from '../components/FindOne.vue'
import Login from '../components/login.vue'
<<<<<<< HEAD
import AddIssue from '../components/issue/addIssue.vue'
import ListIssue from '../components/issue/listIssue.vue'
=======
>>>>>>> e7649e8d968df6fc3b738911b6ef33d0d39541de
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
<<<<<<< HEAD
    },{
      path:'AddIssue',
      component:AddIssue
    },{
      path:'ListIssue',
      component:ListIssue
=======
>>>>>>> e7649e8d968df6fc3b738911b6ef33d0d39541de
    }]
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
