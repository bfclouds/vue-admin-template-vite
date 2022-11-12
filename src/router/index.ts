import { App } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import baseRoutes from './routes'

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [...baseRoutes],
})

export function setupRouter(app: App<Element>) {
  app.use(router)
}
