import type { EChartsOption } from 'echarts'
import type { Ref } from 'vue'

import { useTimeoutFn } from '@/hooks/core/useTimeout'
import { Fn, tryOnUnmounted } from '@vueuse/core'
import { unref, nextTick, watch, computed, ref } from 'vue'
import { useDebounceFn } from '@vueuse/core'
import { useEventListener } from '@/hooks/event/useEventListener'
import { useBreakpoint } from '@/hooks/event/useBreakpoint'

import echarts from '@/plugins/echarts'

import { useDesignSetting } from '@/hooks/setting/useDesignSetting'
// @ts-ignore
import elementResize from 'element-resize-detector'

export function useECharts(
  elRef: Ref<HTMLDivElement>,
  theme: 'light' | 'dark' | 'default' = 'default'
) {
  const { getDarkTheme: getSysDarkTheme } = useDesignSetting()

  const getDarkTheme = computed(() => {
    const sysTheme: string = getSysDarkTheme.value ? 'dark' : 'light'
    return theme === 'default' ? sysTheme : theme
  })
  const chartResizeListen = elementResize({
    strategy: 'scroll', // <- 推荐监听滚动，提升性能
    callOnAdd: true // 添加侦听器时是否应调用,默认true
  })
  let chartInstance: echarts.ECharts | null = null
  let resizeFn: Fn = resize
  const cacheOptions = ref({})
  const removeResizeFn: Fn = () => {}
  resizeFn = useDebounceFn(resize, 200)

  const getOptions = computed((): EChartsOption => {
    if (getDarkTheme.value !== 'dark') {
      return {
        textStyle: {
          fontFamily: 'HarmonyOsHans'
        },
        ...cacheOptions.value
      }
    }
    return {
      backgroundColor: 'transparent',
      textStyle: {
        fontFamily: 'HarmonyOsHans'
      },
      ...cacheOptions.value
    }
  })

  function initCharts(t = theme) {
    const el = unref(elRef)
    if (!el || !unref(el)) {
      return
    }

    chartInstance = echarts.init(el, t)
    /*    const { removeEvent } = useEventListener({
      el: window,
      name: 'resize',
      listener: resizeFn
    })
    removeResizeFn = removeEvent*/
    const { widthRef, screenEnum } = useBreakpoint()
    if (unref(widthRef) <= screenEnum.MD || el.offsetHeight === 0) {
      useTimeoutFn(() => {
        resizeFn()
      }, 30)
    }
  }

  function setOptions(options: EChartsOption, clear = true) {
    cacheOptions.value = options
    if (unref(elRef)?.offsetHeight === 0) {
      useTimeoutFn(() => {
        setOptions(unref(getOptions))
      }, 30)
      return
    }
    nextTick(() => {
      useTimeoutFn(() => {
        if (!chartInstance) {
          initCharts(getDarkTheme.value as 'default')
          if (!chartInstance) {
            return
          }
        }
        clear && chartInstance?.clear()
        chartInstance?.setOption(unref(getOptions))
      }, 30)
      chartResizeListen.listenTo(elRef.value, function () {
        resize() // 当元素尺寸发生改变是会触发此事件，刷新图表
      })
    })
  }

  function resize() {
    chartInstance?.resize()
  }

  watch(
    () => getDarkTheme.value,
    (theme) => {
      if (chartInstance) {
        chartInstance.dispose()
        initCharts(theme as 'default')
        setOptions(cacheOptions.value)
      }
    }
  )

  tryOnUnmounted(disposeInstance)

  function getInstance(): echarts.ECharts | null {
    if (!chartInstance) {
      initCharts(getDarkTheme.value as 'default')
    }
    return chartInstance
  }

  function disposeInstance() {
    if (!chartInstance) {
      return
    }
    removeResizeFn()
    chartInstance.dispose()
    chartInstance = null
  }

  return {
    setOptions,
    resize,
    echarts,
    getInstance,
    disposeInstance
  }
}
