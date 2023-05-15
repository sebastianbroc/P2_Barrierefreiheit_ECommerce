import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import GuidelineOverview from "../views/GuidelineOverview.vue";

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
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
