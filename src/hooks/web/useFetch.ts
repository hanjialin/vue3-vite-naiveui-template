import { ref, onMounted, reactive, Ref } from 'vue'
import { AxiosPromise } from 'axios'
interface IFetchProps {
  apiFun: AxiosPromise<any>
  isMounted?: true | boolean
  callback?: Function
}
/*
 * @desc 简化请求的hooks
 * @param props FetchProps
 * @param props.apiFun AxiosPromise<any>
 * @param props.isMounted boolean default=true
 * @request {option,loading}
 * @author HanJiaLin
 * @time 2023/4/11 16:04
 * */
export default <T>(props: IFetchProps) => {
  const { apiFun, isMounted, callback } = props
  const data = ref<any | T>()
  const loading = ref<boolean>(false)
  const msg = ref<string>('')
  const loadData = () => {
    loading.value = true
    data.value = []
    apiFun
      .then((res) => {
        loading.value = false
        data.value = res.data.data
        msg.value = res.data.msg
        if (callback && typeof callback !== 'undefined') {
          callback(data.value, loading.value, msg.value)
        }
        return res
      })
      .catch((error) => {
        loading.value = false
        data.value = []
        return Promise.reject(error)
      })
  }
  if (isMounted && typeof isMounted === 'undefined') {
    onMounted(() => {
      loadData()
    })
  } else {
    loadData()
  }

  return reactive<{ data: Ref<T>; loading: Ref<boolean> }>({
    data,
    loading
  })
}
