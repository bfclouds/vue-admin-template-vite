import { Menu } from '/@/router/types'
import usePermissionStore from '/@/store/modules/permission'
import { useAppStore } from '/@/store/modules/app'
import { computed, onMounted, ref, unref, watch } from 'vue'
import { useRoute } from 'vue-router'
import {
  getCurrentAllParentPath,
  getMenus,
  getShallowMenus,
} from '/@/router/menus'
import {
  SIDE_BAR_MINI_WIDTH,
  SIDE_BAR_SHOW_TIT_MINI_WIDTH,
} from '/@/enums/appEnum'

const menuList = ref<Menu[]>([])
const activeRoute = ref<string[]>([])

export function useMenus() {
  const permissionStore = usePermissionStore()
  const appStore = useAppStore()
  const route = useRoute()
  // menu
  const isHideMenu = computed(() => appStore.getFullContent)
  const getMixSideWidth = computed(() => {
    return unref(isHideMenu)
      ? `${SIDE_BAR_MINI_WIDTH}px`
      : `${SIDE_BAR_SHOW_TIT_MINI_WIDTH}px`
  })
  const activeRouteName = computed(() => {
    return menuList.value.find((item) => item.path === activeRoute.value[0])
      ?.name
  })
  async function genMenus() {
    const menus = await getMenus()
    menuList.value = menus
  }

  // const aa = ref<Nullable<HTMLElement>>(null)

  // subMenu
  const subMenuList = computed(() => {
    for (let i = 0; i < menuList.value.length; i++) {
      const item = menuList.value[i]
      if (item.path === activeRoute.value[0]) {
        return item.children
      }
    }
    return []
  })
  const openedMenus = computed(() => {
    return subMenuList.value?.map((item) => item.path)
  })

  onMounted(async () => {
    menuList.value = getShallowMenus()
  })

  watch(
    [
      () => permissionStore.getLastBuildMenuTime,
      () => permissionStore.getBackMenuList,
    ],
    () => {
      genMenus()
    },
    {
      immediate: true,
    }
  )

  watch(
    () => route.path,
    async () => {
      activeRoute.value = await getCurrentAllParentPath(route.path)
    },
    {
      immediate: true,
    }
  )

  return {
    menuList,
    getMixSideWidth,
    activeRoute,
    subMenuList,
    activeRouteName,
    openedMenus,
  }
}
