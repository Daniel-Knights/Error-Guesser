import { RouteConfig } from 'vue-router'

const routes: RouteConfig[] = [
  {
    path: '/',
    component: (): Promise<typeof import('*.vue')> => import('pages/index.vue')
  },
  {
    path: '/play',
    component: (): Promise<typeof import('*.vue')> => import('pages/play.vue')
  },
  {
    path: '*',
    component: (): Promise<typeof import('*.vue')> => import('pages/404.vue')
  }
]

export default routes
