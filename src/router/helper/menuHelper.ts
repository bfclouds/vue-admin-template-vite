import { findPath, treeMap } from '/@/utils/helper/treeHelper'
import { isUrl } from '/@/utils/is'
import { AppRouteModule, Menu } from '../types'

export function transformRouteToMenu(routeList: Menu[], routerMapping = false) {
  const MenuList = treeMap(routeList, {
    conversion(route: AppRouteModule) {
      const { meta: { title, hideMenu = false } = {} } = route

      return {
        ...(route.meta || {}),
        meta: route.meta,
        name: title,
        hideMenu,
        path: route.path,
        ...(route.redirect ? { redirect: route.redirect } : {}),
      }
    },
  })
  joinParentPath(MenuList)
  return MenuList
}

function joinParentPath(routeList: Menu[], parentPath = ''): Menu[] {
  routeList.forEach((menu) => {
    // || isUrl(menu.path)
    if (parentPath.endsWith('/')) {
      parentPath = parentPath.slice(0, -1)
    }
    if (!menu.path.startsWith('/') && !isUrl(menu.path)) {
      menu.path = `${parentPath === '/' ? '' : parentPath}/${menu.path}`
    }

    if (menu?.children?.length) {
      joinParentPath(menu.children, menu.path)
    }
  })

  return routeList
}

export function getAllParentPath(menuList: Menu[], path: string): string[] {
  const mList = findPath(menuList, (n) => n.path === path)
  return (mList || []).map((item) => item.path)
}
