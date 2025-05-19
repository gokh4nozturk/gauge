import { createRouter, createWebHistory } from 'vue-router'
import Demo from '@/views/GaugeDemo.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Demo,
    },
    {
      path: '/#playground',
      name: 'playground',
      component: () => import('@/components/Playground.vue'),
    },
    {
      path: '/docs',
      name: 'docs',
      component: () => import('@/views/Docs.vue'),
    },
  ],
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
        top: 80, // Adding a top offset when scrolling to hash links
      }
    }
  },
})

export default router
