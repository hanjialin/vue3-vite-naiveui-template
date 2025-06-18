<template>
  <n-modal
    ref="basicModal"
    :style="styleParams"
    preset="card"
    size="small"
    :title="props.title"
    header-class="basic-model-header"
    :close-on-esc="props.closeOnEsc"
    :auto-focus="false"
    v-bind="$attrs"
    :draggable="props.isDraggable"
    @after-leave="afterLeave"
    @after-enter="afterEnter"
  >
    <template #header-extra>
      <slot v-if="$slots['header-extra-container']" name="header-extra-container"></slot>
      <n-button v-if="props.isFullScreen" size="small" quaternary @click="fullScreen">
        <template #icon>
          <n-icon :component="ResizeOutline"></n-icon>
        </template>
      </n-button>
    </template>
    <template #default>
      <div ref="basicModelContent" class="basic-model-content">
        <slot name="default"></slot>
      </div>
    </template>
    <template v-if="$slots.action" #action>
      <slot name="action"></slot>
    </template>
  </n-modal>
</template>

<script setup lang="ts">
import { ResizeOutline } from '@vicons/ionicons5'
import { ref, reactive, type CSSProperties, nextTick, onMounted, watch } from 'vue'
import { ModalProps } from 'naive-ui'
interface BasicModalProps extends /* @vue-ignore */ ModalProps {
  title: string
  closeOnEsc?: boolean
  isFullScreen?: boolean
  styleParams?: CSSProperties
  isDraggable: boolean
}
const emit = defineEmits(['fullScreenFn', 'closeModal'])
const props = withDefaults(defineProps<BasicModalProps>(), {
  title: '',
  closeOnEsc: false,
  isFullScreen: false,
  styleParams: () => {
    return { width: '600px', height: 'auto' }
  },
  isDraggable: false
})
console.log('新设备')
const basicModal = ref()
const styleParams = reactive<CSSProperties>(props.styleParams)
const styleParamsCache = reactive({})
const contentHeightCache = ref<number>(0)
const fullScreenMode = ref(false)
const fullScreen = () => {
  if (basicModal.value) {
    emit('fullScreenFn')
    if (fullScreenMode.value) {
      Object.assign(styleParams, styleParamsCache)
      nextTick(() => {
        basicModelContent.value.style.height = contentHeightCache.value + 'px'
      })

      fullScreenMode.value = false
    } else {
      Object.assign(styleParamsCache, basicModal.value.$attrs.style) //缓存原有样式
      Object.assign(styleParams, { width: '100vw', height: '100vh', top: '0', left: '0' }) //设置全屏
      fullScreenMode.value = true
      nextTick(() => {
        basicModelContent.value.style.height = getContentHeight() + 'px'
      })
    }
  }
}
const afterLeave = () => {
  Object.assign(styleParams, styleParamsCache)
}
const basicModelContent = ref()
const getContentHeight = () => {
  const computedStyle = window.getComputedStyle(basicModelContent.value.parentElement)
  const paddingTop = parseFloat(computedStyle.paddingTop)
  const paddingBottom = parseFloat(computedStyle.paddingBottom)
  const clientHeight = basicModelContent.value.parentElement.clientHeight
  return clientHeight - paddingTop - paddingBottom
}
const afterEnter = () => {
  if (basicModelContent.value) {
    basicModelContent.value.style.height = getContentHeight() + 'px'
    contentHeightCache.value = getContentHeight()
    emit('closeModal')
  }
  if (props.isDraggable) {
    const father = document.getElementsByClassName('n-modal-container')
    const shadow = document.getElementsByClassName('n-modal-mask')
    for (let i = 0; i < father.length; i++) {
      ;(father[i] as HTMLElement).style.pointerEvents = 'none'
    }
    for (let i = 0; i < shadow.length; i++) {
      ;(shadow[i] as HTMLElement).style.background = 'rgba(0,0,0,0)'
    }
    if (basicModal.value) {
      styleParams.pointerEvents = 'all'
    }
  }
}
</script>

<style lang="scss">
.basic-model-header {
  border-top-left-radius: 3px !important;
  border-top-right-radius: 3px !important;
  //background: #3053b1 !important;
  letter-spacing: 0.05em;
  div,
  i {
    //color: #fff !important;
  }
}
.basic-model-content {
  width: 100%;
  height: 100%;
  padding-top: 12px;
  box-sizing: border-box;
}
</style>
