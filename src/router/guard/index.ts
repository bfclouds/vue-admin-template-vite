import { Router } from 'vue-router';
import { createPermissionGuard } from './permissionGuard';
import { setRouteChange } from '/@/logics/mitt/routeChange';

export function setupRouterGuard(router: Router) {
  createPageGuard(router) // 添加路由到header menu
  createPermissionGuard(router) // 创建动态路由

}

function createPageGuard(router: Router) {
  const loadedPageMap = new Map<string, boolean>()
  router.beforeEach((to) => {
    to.meta.loaded = !!loadedPageMap.get(to.path)
    setRouteChange(to)
    return true
  })

  router.afterEach((to) => {
    loadedPageMap.set(to.path, true)
  })
}