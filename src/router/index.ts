import { createRouter, createWebHistory } from 'vue-router'
import AboutView from '@/views/AboutView.vue'
import FrontPageView from '@/views/FrontPageView.vue'
import AppView from '@/views/AppView.vue'
import SignUpView from '@/views/SignUpView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'frontpage',
      component: FrontPageView
    },
    {
      path: '/app',
      name: 'app',
      component: AppView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUpView
    }
  ]
})

export default router
