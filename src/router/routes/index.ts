import { RouteRecordRaw } from 'vue-router'
import homeRoutes from './home'

const baseRoutes: Array<RouteRecordRaw> = [
  ...homeRoutes
]

export default baseRoutes