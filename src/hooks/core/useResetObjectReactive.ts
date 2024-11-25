import { reactive } from 'vue'

function defaultClone(value: any) {
  if (value === null || typeof value !== 'object') {
    return value
  }
  return JSON.parse(JSON.stringify(value))
}
/**
 * @desc 使用reactive重置对象,请使用数组接收该函数的返回值.作用:随意重命名数组当中的对象值达到多次调用的作用.
 * @author HanJiaLin
 * @time 2024/11/14 14:59
 * @param value 传入需要重置的对象
 * @param clone 可以使用默认的JSON深拷贝或者自定义深拷贝
 **/
export function useResetObjectReactive<T extends object>(value: T, clone = defaultClone) {
  const state = reactive(clone(value)) as T

  const reset = () => {
    Object.keys(state).forEach((key) => {
      delete (state as { [key: string]: any })[key]
    })
    Object.assign(state, clone(value))
  }
  return [state, reset] as const
}
