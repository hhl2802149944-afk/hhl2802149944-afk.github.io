import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MantaRoboticView from '../views/MantaRoboticView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/manta-robotic',
      name: 'manta-robotic',
      component: MantaRoboticView
    }
  ]
})

export default router
