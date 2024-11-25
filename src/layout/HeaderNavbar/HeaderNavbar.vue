<template>
  <n-layout-header bordered>
    <n-space justify="space-between" align="center" style="padding: 0 15px; box-sizing: border-box">
      <n-menu v-model:value="selectValue" mode="horizontal" :options="menuOptions"></n-menu>
      <n-button text @click="designStore.change()">{{
        designStore.getDarkTheme === 'dark' ? '暗色' : '亮色'
      }}</n-button>
    </n-space>
  </n-layout-header>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ref, h, Component } from 'vue'
import { MenuOption, NIcon } from 'naive-ui'
import {
  StatsChart as ChartIcon,
  Home as HomeIcon,
  ReorderFour as ReorderFourIcon
} from '@vicons/ionicons5'
import { useDesignSettingStore } from '@/store/modules/designSetting'
const designStore = useDesignSettingStore()
function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}
const selectValue = ref('welcome')
const menuOptions = ref<MenuOption[]>([
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: '/welcome'
          }
        },
        { default: () => '首页' }
      ),
    key: 'welcome',
    icon: renderIcon(HomeIcon)
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: '/chart'
          }
        },
        { default: () => '图表' }
      ),
    key: 'chart',
    icon: renderIcon(ChartIcon)
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: '/table'
          }
        },
        { default: () => '表格' }
      ),
    key: 'table',
    icon: renderIcon(ReorderFourIcon)
  }
])
</script>

<style lang="scss" scoped></style>
