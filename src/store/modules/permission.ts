import { defineStore } from 'pinia'
import { AppRouteRecordRaw, Menu } from '/@/router/types'
import { transformObjToRoute } from '/@/router/helper/routeHelper'
import { transformRouteToMenu } from '/@/router/helper/menuHelper'
import { store } from '../index'
import menuApi from '/@/api/sys/menu'
import { cloneDeep } from 'lodash-es'

interface PermissionState {
  backMenuList: Menu[]
  frontMenuList: Menu[]
  lastBuildMenuTime: number
  isDynamicAddedRoute: boolean
}

const usePermissionStore = defineStore({
  id: 'permission',
  state: (): PermissionState => ({
    backMenuList: [],
    frontMenuList: [], // 后台ui上显示的菜单
    lastBuildMenuTime: 0, // 上次build路由的时间
    isDynamicAddedRoute: false, // 路由是否已经动态加载
  }),
  getters: {
    getBackMenuList(): Menu[] {
      return this.backMenuList
    },
    getFrontMenuList(): Menu[] {
      return this.frontMenuList || []
    },
    getLastBuildMenuTime(): number {
      return this.lastBuildMenuTime
    },
    getIsDynamicAddedRoute(): boolean {
      return this.isDynamicAddedRoute
    },
  },
  actions: {
    setFrontMenuList(menuList: Menu[]) {
      this.frontMenuList = menuList
    },
    setLastBuildMenuTime() {
      this.lastBuildMenuTime = new Date().getTime()
    },
    setIsDynamicAddedRoute(added: boolean) {
      this.isDynamicAddedRoute = added
    },
    async buildRoutesAction(): Promise<AppRouteRecordRaw[]> {
      let routes: AppRouteRecordRaw[] = []

      // 获取
      let routeList = (await menuApi.getMenuList()) as AppRouteRecordRaw[]
      // 转换成route路由
      routeList = transformObjToRoute(routeList)
      // 路由转成menu
      const menuList = transformRouteToMenu(cloneDeep(routeList))
      this.setFrontMenuList(menuList)

      routes = routeList
      return routes
    },
  },
})

export default usePermissionStore

export function usePermissionStoreWithOut() {
  return usePermissionStore(store)
}
