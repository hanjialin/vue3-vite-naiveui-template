<template>
  <n-config-provider :locale="locale" :date-locale="dateLocale" :theme="osTheme">
    <n-loading-bar-provider>
      <n-dialog-provider>
        <n-notification-provider>
          <n-message-provider>
            <App />
          </n-message-provider>
        </n-notification-provider>
      </n-dialog-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
import App from '@/App.vue'
import useConfig from '@/hooks/utils/ui-config/useConfig'
const { zhCN, dateZhCN, theme, changeThemeOs } = useConfig() //theme 使用默认主题配置
changeThemeOs() //获取系统主题,并改变theme的值
const locale = zhCN
const dateLocale = dateZhCN
const osTheme = theme
</script>

<style scoped></style>
