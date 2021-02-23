import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    name: 'home',
    path: '/',
    component: (): Promise<typeof import('*.vue')> => import('pages/index.vue')
  },
  {
    name: 'play',
    path: '/play/:difficulty(easy|medium|hard)',
    component: (): Promise<typeof import('*.vue')> => import('pages/play.vue')
  },
  {
    path: '/:catchAll(.*)*',
    component: (): Promise<typeof import('*.vue')> => import('pages/404.vue')
  }
]

export default routes
