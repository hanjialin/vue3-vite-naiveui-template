<template>
  <div>
    <hello-world msg="欢迎!" />
    <basic-modal
      v-model:show="isShow"
      title="测试封装弹窗组件"
      :is-full-screen="true"
      :is-draggable="true"
    >
      <div>这是主内容区域</div>
      <template #action>
        <n-space>
          <n-button type="default">测试一</n-button>
          <n-button type="primary">测试二</n-button>
        </n-space>
      </template>
    </basic-modal>
    <basic-modal
      v-model:show="isShowBro"
      title="测试封装弹窗组件1"
      :is-full-screen="true"
      :is-draggable="true"
    >
      <div>这是主内容区域1</div>
      <template #action>
        <n-space>
          <n-button type="default">测试3</n-button>
          <n-button type="primary">测试4</n-button>
        </n-space>
      </template>
    </basic-modal>
    <n-button @click="isShow = !isShow">测试弹窗</n-button>
    <n-button @click="isShowBro = !isShowBro">测试弹窗Bro</n-button>
    <div
      style="
        background: #1a1a1a;
        width: 600px;
        height: 400px;
        transform-origin: -306px -121px;
        position: absolute;
      "
    ></div>
  </div>
</template>

<script setup lang="ts">
import HelloWorld from '@/components/HelloWorld.vue'
import { ref } from 'vue'
import BasicModal from '@/components/BasicModal/BasicModal.vue'

const isShow = ref(false)
const isShowBro = ref(false)
</script>

<style scoped></style>
