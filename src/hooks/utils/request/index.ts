import axios, { AxiosRequestConfig } from 'axios'
import qs from 'qs'
export type Method = 'GET' | 'POST' | 'PUT' | 'DELETE'
//定义重复请求接口
interface PendingType {
  url?: string
  method?: Method
  params: any
  data: any
  cancel: Function
}
const pending: Array<PendingType> = []
const CancelToken = axios.CancelToken
const url: any = import.meta.env.VITE_BASE_URL
const instance = axios.create({
  baseURL: url,
  timeout: 50000,
  data: null
})
// 移除重复请求
const removePending = (config: AxiosRequestConfig) => {
  for (const key in pending) {
    const item: number = +key
    const list: PendingType = pending[key]
    // 当前请求在数组中存在时执行函数体
    if (
      list.url === config.url &&
      list.method === config.method &&
      JSON.stringify(list.params) === JSON.stringify(config.params) &&
      JSON.stringify(list.data) === JSON.stringify(config.data)
    ) {
      // 执行取消操作
      list.cancel('操作太频繁，请稍后再试')
      // 从数组中移除记录
      pending.splice(item, 1)
    }
  }
}
//请求拦截器
instance.interceptors.request.use(
  (config) => {
    // NProgress.start()
    removePending(config)
    config.cancelToken = new CancelToken((c) => {
      pending.push({
        url: config.url,
        method: config.method as Method,
        params: config.params,
        data: config.data,
        cancel: c
      })
    })
    const method = (config.method as Method).toLocaleLowerCase()
    //检验token
    //console.log(getToken())
    //config.headers.token = getToken()
    if (method === 'get' && config.data !== null) {
      //get请求就序列化参数
      config.url += '?' + qs.stringify(config.data)
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
//响应拦截器
instance.interceptors.response.use(
  (response) => {
    // NProgress.done()
    removePending(response.config)
    // console.log('打印一下返回结果', response)
    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)
export default instance
