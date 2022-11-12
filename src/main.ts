import { createApp } from 'vue'
import App from './App.vue'
import '../mock/index'
import { setupRouter, router } from './router'
import ElementPlus from 'element-plus'
import { setupStore } from './store'
import './style/index.less'
import 'element-plus/dist/index.css'
import 'virtual:windi.css'
import { setupRouterGuard } from './router/guard'

async function bootstrap() {
  const app = createApp(App)
  setupStore(app) // 配置store
  setupRouter(app) // 配置路由
  setupRouterGuard(router) // 配置路由守卫
  app.use(ElementPlus)
  app.mount('#app')
}

bootstrap()
