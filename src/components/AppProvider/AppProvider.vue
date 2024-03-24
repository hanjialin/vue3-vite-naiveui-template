<template>
  <n-config-provider
    :locale="locale"
    :date-locale="dateLocale"
    :theme="getDarkTheme"
    :theme-overrides="themeOverrides"
  >
    <!--    <ScreenAdaptation height="1080">-->
    <n-loading-bar-provider>
      <n-dialog-provider>
        <n-notification-provider>
          <n-message-provider>
            <App />
          </n-message-provider>
        </n-notification-provider>
      </n-dialog-provider>
    </n-loading-bar-provider>
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
import ScreenAdaptation from '@/components/ScreenAdaptation/ScreenAdaptation.vue' //配置默认暗黑主题
const { zhCN, dateZhCN, theme, changeThemeOs } = useConfig() //theme 使用默认主题配置
const getDarkTheme = computed(() => (designStore.darkTheme === 'dark' ? darkTheme : null))
// changeThemeOs() //获取系统主题,并改变theme的值
const locale = zhCN
const dateLocale = dateZhCN
const designStore = useDesignSettingStore()
// const osTheme = theme
const themeOverrides = computed(() => {
  const appTheme = designSetting.appTheme
  const lightenStr = lighten(designStore.appTheme, 6)
  const popoverColor = lighten('#021736', 6)
  console.log(popoverColor)
  return {
    common: {
      fontFamily: 'RobotoCondensed,SourceHanSansCN, sans-serif',
      primaryColor: appTheme,
      primaryColorHover: lightenStr,
      primaryColorPressed: lightenStr,
      primaryColorSuppl: appTheme
    }
  }
})
</script>

<style lang="scss" scoped></style>
