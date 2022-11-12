import { Router, RouteRecordRaw } from 'vue-router';
import { usePermissionStoreWithOut } from '/@/store/modules/permission';
import { PAGE_NOT_FOUND_ROUTE } from '../routes/basic'


export const createPermissionGuard = function (router: Router) {
  const permissionStore = usePermissionStoreWithOut()
  router.beforeEach(async (to, from, next) => {
    if (permissionStore.getIsDynamicAddedRoute) {
      next()
      return
    }
    // 获取&设置动态路由
    const routes = await permissionStore.buildRoutesAction()

    routes.forEach((route) => {
      router.addRoute(route as unknown as RouteRecordRaw)
    })

    permissionStore.setIsDynamicAddedRoute(true)
    router.addRoute(PAGE_NOT_FOUND_ROUTE as unknown as RouteRecordRaw)

    if (!to.name || to.name === PAGE_NOT_FOUND_ROUTE.name) {
      next({ path: to.fullPath, replace: true, query: to.query })
    } else {
      next()
    }
  })
}