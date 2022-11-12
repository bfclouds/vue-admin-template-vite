import { defineStore } from 'pinia'
import { Menu } from '/@/router/types'
import { store } from '/@/store'
import { ProjectConfig } from '/@/types/config'

interface AppState {
  projectConfig: ProjectConfig | null
}

export const useAppStore = defineStore({
  id: 'app',
  state: () => ({
    projectConfig: {
      permissionMode: '', //
      fullContent: false,
    },
  }),
  getters: {
    getProjectConfig(): ProjectConfig {
      return this.projectConfig || ({} as ProjectConfig)
    },
    getFullContent(): boolean {
      return this.projectConfig.fullContent
    },
  },
  actions: {
    setFullContent(isFull: boolean) {
      this.projectConfig.fullContent = isFull
    },
  },
})

export function useAppStoreWithOut() {
  return useAppStore(store)
}
