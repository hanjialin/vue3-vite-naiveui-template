<template>
  <div id="ScreenAdapter" class="screen-adapter" :style="style">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, getCurrentInstance } from 'vue'
/*
 * 更新了会商模式的配置,以及暴露了会商模式的屏幕宽度和阈值
 * */
interface IScreen {
  width?: string
  height: string
  consultationMode?: boolean
  consultationThreshold?: string
  consultationScale?: string
}
interface IStyle extends IScreen {
  transform: string
}
const props = withDefaults(defineProps<IScreen>(), {
  width: '',
  height: '1080',
  consultationMode: false,
  consultationThreshold: '3840',
  consultationScale: '2.6'
})
const style = ref<IStyle>({
  width:
    props.width === ''
      ? (window.innerWidth / window.innerHeight) * Number(props.height) + 'px'
      : props.width + 'px',
  height: props.height + 'px',
  transform: 'scale(1) translate(-50%, -50%)'
})
onMounted(() => {
  setScale()
  window.onresize = Debounce(setScale, 1000)
})
const Debounce = (fn: any, t: any) => {
  const delay = t || 500
  let timer: any
  return function () {
    // eslint-disable-next-line prefer-rest-params
    const args: any = arguments
    if (timer) {
      clearTimeout(timer)
    }
    const context = getCurrentInstance()
    timer = setTimeout(() => {
      timer = null
      fn.apply(context, args)
    }, delay)
  }
}
/*
 * @desc 获取放大缩小比例
 * @author HanJiaLin
 * @time 2023/4/13 11:44
 * */
const getScale = () => {
  const w =
    window.innerWidth /
    Number(
      props.width === ''
        ? (window.innerWidth / window.innerHeight) * Number(props.height)
        : props.width
    )
  const h = window.innerHeight / Number(props.height)
  return w < h ? w : h
}
/*
 * @desc 设置比例
 * @author HanJiaLin
 * @time 2023/4/13 12:24
 * */
const setScale = () => {
  if (props.consultationMode && window.innerWidth > Number(props.consultationThreshold)) {
    style.value.width = window.innerWidth * (1 / Number(props.consultationScale)) + 'px'
    style.value.height = window.innerHeight * (1 / Number(props.consultationScale)) + 'px'
    style.value.transform = 'scale(' + props.consultationScale + ') translate(-50%, -50%)'
  } else {
    style.value.width =
      props.width === ''
        ? (window.innerWidth / window.innerHeight) * Number(props.height) + 'px'
        : props.width + 'px'
    style.value.height = '1080px'
    style.value.transform = 'scale(' + getScale() + ') translate(-50%, -50%)'
  }
}
</script>

<style lang="scss" scoped>
.screen-adapter {
  transform-origin: 0 0;
  position: absolute;
  left: 50%;
  top: 50%;
  transition: 0.3s;
}
</style>
