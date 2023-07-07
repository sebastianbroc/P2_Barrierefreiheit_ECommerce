import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import GuidelineOverview from "../views/GuidelineOverview.vue";
import GuidelineView from "../views/GuidelineView.vue";
import UserView from "../views/UserView.vue";
import MenuView from "../views/MenuView.vue";

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/guidelines',
    name: 'guidelines',
    component: GuidelineOverview
  },
  {
    path: '/guideline',
    name: 'guideline',
    component: GuidelineView
  },
  {
    path: '/user',
    name: 'user',
    component: UserView
  },
  {
    path: '/menu',
    name: 'menu',
    component: MenuView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
