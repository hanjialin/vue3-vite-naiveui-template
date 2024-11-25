<template>
  <n-layout>
    <header-navbar />
    <n-layout has-sider :style="{ height: 'calc(100vh - 43px)' }">
      <vertical-sidebar />
      <main-area />
    </n-layout>
  </n-layout>
</template>

<script setup lang="ts">
import HeaderNavbar from '@/layout/HeaderNavbar/HeaderNavbar.vue'
import VerticalSidebar from '@/layout/VerticalSidebar/VerticalSidebar.vue'
import MainArea from '@/layout/Main/MainArea.vue'
</script>

<style scoped></style>
