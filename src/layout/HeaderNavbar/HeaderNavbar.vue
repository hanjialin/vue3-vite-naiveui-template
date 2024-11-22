<template>
  <n-layout-header bordered>
    <n-menu v-model:value="selectValue" mode="horizontal" :options="menuOptions"></n-menu>
  </n-layout-header>
</template>

<script setup lang="ts">
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { onMounted, ref, h, Component } from 'vue'
import { MenuOption, NIcon } from 'naive-ui'
import {
  BookOutline as BookIcon,
  Home as HomeIcon,
  PersonOutline as PersonIcon,
  WineOutline as WineIcon
} from '@vicons/ionicons5'
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
    icon: renderIcon(HomeIcon)
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
    icon: renderIcon(HomeIcon)
  }
])
</script>

<style lang="scss" scoped></style>
