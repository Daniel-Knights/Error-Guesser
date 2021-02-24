import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    name: 'home',
    path: '/',
    component: (): Promise<typeof import('*.vue')> => import('pages/index.vue')
  },
  {
    name: 'play',
    path: '/play/:lang(javascript)/:difficulty(easy|medium|hard)',
    component: (): Promise<typeof import('*.vue')> => import('pages/play.vue')
  },
  {
    name: 'error',
    path: '/error',
    component: (): Promise<typeof import('*.vue')> => import('pages/error.vue')
  },
  {
    path: '/:catchAll(.*)*',
    component: (): Promise<typeof import('*.vue')> => import('pages/404.vue')
  }
]

export default routes
