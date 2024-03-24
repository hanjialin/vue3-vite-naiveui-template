import { defineStore } from 'pinia'
import { store } from '@/store'
import designSetting from '@/config/theme/designSetting'
import { storage } from '@/hooks/utils/tools/storage'
const { darkTheme, appTheme, appThemeList } = designSetting
interface DesignSettingState {
  //深色主题
  darkTheme: string
  //默认风格
  appTheme: string
  //系统内置风格
  appThemeList: string[]
}
export const useDesignSettingStore = defineStore('app-design-setting', {
  state: (): DesignSettingState => ({
    darkTheme: darkTheme,
    appTheme,
    appThemeList
  }),
  getters: {
    getDarkTheme(): string {
      return this.darkTheme
    },
    getAppTheme(): string {
      return this.appTheme
    },
    getAppThemeList(): string[] {
      return this.appThemeList
    }
  },
  actions: {
    //反复修改
    change() {
      this.darkTheme = this.darkTheme === 'dark' ? 'light' : 'dark'
      storage.set('darkTheme', this.darkTheme, 60 * 60 * 24 * 90)
    },
    init(value: string) {
      this.darkTheme = value
    }
  },
  persist: {
    enabled: true
  }
})

// Need to be used outside the setup
export function useDesignSetting() {
  return useDesignSettingStore(store)
}
