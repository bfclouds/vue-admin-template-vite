import { defineComponent } from 'vue'
import { RouteMeta, RouteRecordRaw } from 'vue-router'

export type Component<T = any> =
  | ReturnType<typeof defineComponent>
  | (() => Promise<typeof import('*.vue')>)
  | (() => Promise<T>)

export interface Menu {
  name: string
  path: string
  icon?: string
  children?: Menu[]
  meta?: Partial<RouteMeta>
  // redirect?: string
}

export interface AppRouteRecordRaw
  extends Omit<RouteRecordRaw, 'meta' | 'children'> {
  name: string
  meta: RouteMeta
  component?: Component | string
  fullPath?: string
  children?: AppRouteRecordRaw[]
  // redirect?: string
}

export type AppRouteModule = AppRouteRecordRaw
