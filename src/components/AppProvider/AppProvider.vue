<template>
  <n-config-provider
    :locale="locale"
    :date-locale="dateLocale"
    :theme="getDarkTheme"
    :theme-overrides="themeOverrides"
  >
    <!--    <ScreenAdaptation height="1080">-->
    <v-screen-adaptation mode="auto" height="1080" :scale="scale">
      <n-loading-bar-provider>
        <n-dialog-provider>
          <n-notification-provider>
            <n-message-provider>
              <App />
            </n-message-provider>
          </n-notification-provider>
        </n-dialog-provider>
      </n-loading-bar-provider>
    </v-screen-adaptation>
    <!--    </ScreenAdaptation>-->
  </n-config-provider>
</template>

<script setup lang="ts">
import App from '@/App.vue'
import useConfig from '@/config/theme/useConfig'
import { useDesignSettingStore } from '@/store/modules/designSetting'
import designSetting from '@/config/theme/designSetting'
import { lighten } from '@/config/theme/transLighten'
import { darkTheme } from 'naive-ui'
import { computed } from 'vue'
import 'v-screen-adaptation/dist/v-screen-adaptation.css'
import VScreenAdaptation from 'v-screen-adaptation'
// import ScreenAdaptation from '@/components/ScreenAdaptation/ScreenAdaptation.vue'
const { zhCN, dateZhCN, theme, changeThemeOs } = useConfig() //theme 使用默认主题配置
const designStore = useDesignSettingStore()
const getDarkTheme = computed(() => (designStore.darkTheme === 'dark' ? darkTheme : null))
// changeThemeOs() //获取系统主题,并改变theme的值
const locale = zhCN
const dateLocale = dateZhCN
const scale = ref(1)
setTimeout(() => {
  scale.value = 2.6
}, 1000)
// const osTheme = theme
const themeOverrides = computed(() => {
  const appTheme = designSetting.appTheme
  const lightenStr = lighten(designStore.appTheme, 6)
  return {
    common: {
      fontFamily: 'RobotoCondensed, SourceHanSansCN, sans-serif',
      primaryColor: appTheme,
      primaryColorHover: lightenStr,
      primaryColorPressed: lightenStr,
      primaryColorSuppl: appTheme
    }
  }
})
</script>

<style lang="scss" scoped></style>
