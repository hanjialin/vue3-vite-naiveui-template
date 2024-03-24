<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="../../assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
    <a href="https://vitest.dev/" target="_blank">
      <img src="../../assets/vitest.svg" class="logo vitest" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue + Vitest" />
</template>

<script lang="ts" setup>
import HelloWorld from '@/components/HelloWorld.vue'
setTimeout(() => {
  window.$message.success('挂载成功!')
}, 3000)
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
.logo.vitest:hover {
  filter: drop-shadow(0 0 2em #fcc72baa);
}
</style>
