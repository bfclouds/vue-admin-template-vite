import { cloneDeep } from 'lodash-es'
import { LayoutComp } from '../constant'
import { AppRouteModule, AppRouteRecordRaw } from '../types'


const layoutMap = new Map<string, () => Promise<typeof import('*.vue')>>();
layoutMap.set('LAYOUT', LayoutComp)

let dynamicViewsModules: Record<string, () => Promise<Recordable>>;

function asyncImportRoute(routes: AppRouteRecordRaw[] | undefined) {
  dynamicViewsModules = dynamicViewsModules || import.meta.glob('../../views/**/**/*.{vue,tsx}');
  if (!routes) return;
  routes.forEach((route) => {
    const { component, name } = route;

    if (typeof component === 'string') {
      const layoutFound = layoutMap.get(component.toUpperCase())

      if (layoutFound) {
        route.component = layoutFound
      } else {
        route.component = dynamicImport(dynamicViewsModules, component as string);
      }

      route.children && asyncImportRoute(route.children)
    } else {
      new Error('页面组件不存在')
    }
  })
}

// 将路由数据转换成路由对象
export function transformObjToRoute(routeList: AppRouteModule[]):AppRouteModule[] {
  routeList.forEach((route) => {
    const { component } = route
    if (component) {
      if (component.toUpperCase() === 'LAYOUT') {
        route.component = layoutMap.get('LAYOUT')
      } else {
        route.children = [cloneDeep(route)]
        route.component = LayoutComp
        route.name = `${route.name}Parent`
        route.path = ''
        const meta = route.meta || {}
        meta.single = true
        meta.affix = false
        route.meta = meta
      }
    } else {
      console.warn(`请正确配置路由${route?.name}的component属性`)
    }
    route.children && asyncImportRoute(route.children)
  })
  
  return routeList
}

function dynamicImport(
  dynamicViewsModules: Record<string, () => Promise<Recordable>>,
  component: string,
) {
  const keys = Object.keys(dynamicViewsModules);
  
  const matchKeys = keys.filter((key) => {
    const k = key.replace('../../views', '');
    const startFlag = component.startsWith('/');
    const endFlag = component.endsWith('.vue') || component.endsWith('.tsx');
    const startIndex = startFlag ? 0 : 1;
    const lastIndex = endFlag ? k.length : k.lastIndexOf('.');
    return k.substring(startIndex, lastIndex) === component;
  });
  // console.log(matchKeys);
  
  if (matchKeys?.length === 1) {
    const matchKey = matchKeys[0];
    return dynamicViewsModules[matchKey];
  } else if (matchKeys?.length > 1) {
    return;
  } else {
    // return 错误的页面
    return;
  }
}