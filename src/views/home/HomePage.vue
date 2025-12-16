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
      ref="testRef"
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
    <n-button @click="testWindow">测试弹窗Bro</n-button>
    <n-button
      text-color="#fff"
      color="rgba(57, 226, 255, 1)"
      round
      focusable
      strong
      style="background-image: linear-gradient(45deg, rgba(57, 226, 255, 1), rgba(38, 146, 255, 1))"
      >打开弹窗A</n-button
    >
    <n-tag>啦啦啦</n-tag>
    <n-button
      size="small"
      text-color="#fff"
      color="rgba(80, 253, 154, 1)"
      round
      focusable
      style="background-image: linear-gradient(45deg, rgba(80, 253, 154, 1), rgba(0, 194, 93, 1))"
    >
      打开弹窗B</n-button
    >
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
import { ref, shallowRef, useTemplateRef } from 'vue'
import BasicModal from '@/components/BasicModal/BasicModal.vue'

const isShow = ref(false)
const isShowBro = ref(false)
const testRef = useTemplateRef('testRef')
// const testRef = shallowRef('testRef')
const testWindow = () => {
  if (testRef.value) {
    testRef.value.showModal()
  }
}
</script>

<style scoped>
.logo {
  background-image: linear-gradient(to right, rgba(57, 226, 255, 1), rgba(38, 146, 255, 1));
}
</style>
