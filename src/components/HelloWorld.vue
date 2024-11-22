<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()

const count = ref(0)
</script>
<template>
  <div>
    <h1>{{ msg }}</h1>
    <!--    <n-flex justify="center">
      <n-card style="width: 800px" hoverable>
        <n-button type="primary" @click="count++">count is {{ count }}</n-button>
        <p>
          Edit
          <n-tag type="info" :bordered="false">components/HelloWorld.vue</n-tag>
          to test
          <n-tag type="error" :bordered="false">HMR</n-tag>
        </p>
        <n-date-picker />
      </n-card>
    </n-flex>-->
    <p>
      Check out
      <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank">create-vue</a>, the
      official Vue + Vite starter
    </p>
    <p>
      Install
      <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
      in your IDE for a better DX
    </p>
    <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
  </div>
</template>

<style lang="scss" scoped>
.read-the-docs {
  color: #888;
}
</style>
