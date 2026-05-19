import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomeView },
    {
      path: '/kapitel/:slug',
      component: () => import('../views/KapitelView.vue'),
    },
    {
      path: '/quiz',
      component: () => import('../views/QuizView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('../views/NichtGefundenView.vue'),
    },
  ],
})

export default router
