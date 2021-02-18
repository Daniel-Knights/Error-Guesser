import { RouteConfig } from 'vue-router'

const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('pages/index.vue')
  },
  {
    path: '/play',
    component: () => import('pages/play.vue')
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/404.vue')
  }
]

export default routes
