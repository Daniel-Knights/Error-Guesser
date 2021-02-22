import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    name: 'home',
    path: '/',
    component: (): Promise<typeof import('*.vue')> => import('pages/index.vue')
  },
  {
    name: 'play',
    path: '/play',
    component: (): Promise<typeof import('*.vue')> => import('pages/play.vue')
  },
  {
    name: 'tutorial',
    path: '/tutorial',
    component: (): Promise<typeof import('*.vue')> => import('pages/tutorial.vue')
  },
  {
    path: '/:catchAll(.*)*',
    component: (): Promise<typeof import('*.vue')> => import('pages/404.vue')
  }
]

export default routes
