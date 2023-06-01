import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Registration from '../components/registration.vue'
import FindeOne from '../components/FindOne.vue'
import Login from '../components/login.vue'
import AddIssue from '../components/issue/addIssue.vue'
import ListIssue from '../components/issue/listIssue.vue'
import IssueDetail from '../components/issue/comment/issueDetail.vue'
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
    },{
      path:'AddIssue',
      component:AddIssue
    },{
      path:'ListIssue',
      component:ListIssue
    },{
      name:'IssueDetail',
      path:'/IssueDetail/:IssueID',
      component:IssueDetail
    }]
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
