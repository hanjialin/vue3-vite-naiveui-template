<template>
  <n-layout>
    <header-navbar />
    <n-layout has-sider :style="{ height: 'calc(100vh - 100px)' }">
      <vertical-sidebar />
      <main-area />
    </n-layout>
  </n-layout>
</template>

<script setup lang="ts">
import HeaderNavbar from '@/layout/HeaderNavbar/HeaderNavbar.vue'
import VerticalSidebar from '@/layout/VerticalSidebar/VerticalSidebar.vue'
import MainArea from '@/layout/Main/MainArea.vue'
import { nextTick, onMounted, ref, computed, ComputedRef } from 'vue'
const headerNavbar = ref<Element | null>(null)
const windowHeight = ref(window.innerHeight)
const headerNavbarHeight = ref(0)
let height: ComputedRef<number>
onMounted(() => {
  if (headerNavbar.value) {
    headerNavbarHeight.value = headerNavbar.value.clientHeight
    console.log(headerNavbar.value.clientHeight)
    console.log(headerNavbar.value)
    /*console.log(headerNavbar.value.clientHeight)
    console.log('元素', headerNavbar.value)
    height = computed(() => windowHeight.value - headerNavbarHeight.value)
    console.log(headerNavbarHeight.value)
    console.log(height)*/
  }
})
</script>

<style scoped></style>
