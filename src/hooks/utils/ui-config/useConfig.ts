/**
 * @author HanJiaLin
 * @date 2022/12/28 13:30
 * @version 1.0
 * @description 全局配置NaiveUI，UI组件默认支持的是英文需要导入中文对其进行配置
 **/
import { zhCN, darkTheme, GlobalTheme, useOsTheme, dateZhCN } from 'naive-ui'
import { ref } from 'vue'

/**
 * @description 方便调用主题配置
 **/
const theme = ref<GlobalTheme | null>(null)
export default () => {
  //获取系统主题
  const useOsThemeRef = useOsTheme()
  const changeTheme = () => {
    if (theme.value === null) {
      theme.value = <GlobalTheme>darkTheme
    } else {
      theme.value = null
    }
  }
  const changeThemeOs = () => {
    if (useOsThemeRef.value === 'dark') {
      theme.value = darkTheme
    } else {
      theme.value = null
    }
  }
  return {
    zhCN,
    dateZhCN,
    theme,
    changeTheme,
    changeThemeOs,
    useOsThemeRef
  }
}
