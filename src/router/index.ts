import { createRouter, createWebHistory } from 'vue-router'
import SetupView from '@/views/SetupView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'setup',
      component: SetupView,
    },
    {
      path: '/main',
      name: 'main',
      component: () => import('@/views/MainView.vue'),
    },
  ],
})

export default router
