<template>
  <div>
    <p>图表</p>
    <n-space>
      <n-button @click="showRef = true">打开弹窗</n-button>
      <n-button>测试穿透</n-button></n-space
    >
    <n-modal v-model:show="showRef" preset="card" title="测试" draggable style="width: 600px"
      >测试</n-modal
    >
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const showRef = ref<boolean>(false)
</script>

<style lang="scss" scoped></style>
