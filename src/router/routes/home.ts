import { RouteRecordRaw } from 'vue-router'
// import { LayoutComp } from '../constant'

const homeRoutes: Array<RouteRecordRaw> = [{
  path: '/low-code-render',
  name: 'lowCodeRender',
  component: () => import('/@/views/sys/lowCode/render.vue'),
},
{
  path: '/low-code-comps',
  name: 'lowCodeComps',
  component: () => import('/@/views/sys/lowCode/comp.vue'),
},
{
  path: '/low-code-editer',
  name: 'lowCodeEditer',
  component: () => import('/@/views/sys/lowCode/editer.vue'),
}]

export default homeRoutes