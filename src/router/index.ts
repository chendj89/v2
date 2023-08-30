import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../md/vue.md'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../md/vue2.md'),
    }
  ]
})

export default router
