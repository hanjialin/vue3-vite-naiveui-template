<template>
  <n-modal
    ref="basicModel"
    :style="styleParams"
    preset="card"
    size="small"
    :title="props.title"
    header-class="basic-model-header"
    content-class="basic-model-content"
    :close-on-esc="props.closeOnEsc"
    :auto-focus="false"
    v-bind="$attrs"
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
      <n-scrollbar
        :style="{ maxHeight: contentHeight }"
        :content-style="isScroll ? {} : { height: '100%' }"
      >
        <div
          :style="{ padding: props.defaultPadding }"
          style="height: inherit; box-sizing: border-box"
        >
          <slot name="default"></slot>
        </div>
      </n-scrollbar>
    </template>
    <template v-if="$slots.action" #action>
      <slot name="action"></slot>
    </template>
  </n-modal>
</template>

<script setup lang="ts">
//todo: 1.外部给一个高度,高度-header-action,默认的;2.full-screen,height=100vh
import { ResizeOutline } from '@vicons/ionicons5'
import { ref, reactive, computed, type CSSProperties, useSlots } from 'vue'
import { ModalProps } from 'naive-ui'
interface BasicModalProps extends /* @vue-ignore */ ModalProps {
  title: string
  closeOnEsc?: boolean
  isFullScreen?: boolean
  isScroll?: boolean
  defaultPadding?: string
  styleParams?: CSSProperties
}
const emit = defineEmits(['fullScreenFn', 'closeModal'])
const props = withDefaults(defineProps<BasicModalProps>(), {
  title: '',
  closeOnEsc: false,
  isFullScreen: false,
  isScroll: true,
  defaultPadding: '10px',
  styleParams: () => {
    return { width: '600px', height: 'auto' }
  }
})
const basicModel = ref()
const styleParams = reactive<CSSProperties>(props.styleParams)
const styleParamsCache = reactive({})
const fullScreenMode = ref(false)
const fullScreen = () => {
  if (basicModel.value) {
    emit('fullScreenFn')
    if (fullScreenMode.value) {
      Object.assign(styleParams, styleParamsCache)
      fullScreenMode.value = false
    } else {
      Object.assign(styleParamsCache, basicModel.value.$attrs.style) //缓存原有样式
      Object.assign(styleParams, { width: '100vw', height: '100vh' }) //设置全屏
      fullScreenMode.value = true
    }
  }
}
const contentHeight = computed(() => {
  if (styleParams.height !== 'auto') {
    return `calc(${styleParams.height} - ${headerPlusAction.value}px)`
  }
  return 'auto'
})
const afterLeave = () => {
  Object.assign(styleParams, styleParamsCache)
}
const basicModelContent = ref()
const headerPlusAction = ref(0)
const afterEnter = () => {
  const headerElement = document.querySelector('.n-card-header') as HTMLElement
  const ActionElement = document.querySelector('.n-card__action') as HTMLElement
  const headerHeight = headerElement?.offsetHeight || 0
  const actionHeight = ActionElement?.offsetHeight || 0
  headerPlusAction.value = headerHeight + actionHeight
  emit('closeModal')
}
</script>

<style lang="scss">
.basic-model-header {
  border-top-left-radius: 3px !important;
  border-top-right-radius: 3px !important;
  background: #3053b1 !important;
  letter-spacing: 0.05em;
  div,
  i {
    color: #fff !important;
  }
}
/*.basic-model-content {
  width: 100%;
  height: 100%;
  padding-top: 12px;
  box-sizing: border-box;
}*/
.basic-model-content {
  width: 100%;
  padding: 0 !important;
  overflow: hidden;
}
</style>
