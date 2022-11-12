import Mock from 'mockjs'
import { resultSuccess } from '../_util'

const homeRoute = {
  path: '/',
  component: 'LAYOUT',
  redirect: '/home',
  meta: {
    title: 'chat',
    hideChildrenInMenu: false,
    icon: 'icon-home',
  },
  children: [
    {
      path: '/home',
      name: 'Home',
      component: '/home/index/index',
      meta: {
        title: 'home',
        icon: 'icon-home',
      },
    },
  ],
}

Mock.setup({
  timeout: '200',
})

Mock.mock('/api/getMenuList', 'get', (params: any) => {
  const menu: Object[] = [homeRoute]
  return resultSuccess(menu)
})
