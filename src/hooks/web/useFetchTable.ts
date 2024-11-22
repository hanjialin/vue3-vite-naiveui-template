/*
 * @desc vxe-table封装 包含data,page,pageChange等
 * @author HanJiaLin
 * @version 1.0
 * @time 2023/4/7
 * */
import { AxiosPromise } from 'axios'
import { onMounted, reactive, Ref, ref, toRef } from 'vue'
import VXETable, {
  VxeGridInstance,
  VxePagerDefines,
  VxePagerProps,
  VxeTableInstance
} from 'vxe-table'
import { lastObjectEach } from 'xe-utils'
import { pageSize } from '@/hooks/web/config/pagination'

interface fetchTableProps {
  apiFun: (params?: object) => AxiosPromise<any>
  params: any
  tableRef: Ref<VxeGridInstance | VxeTableInstance | undefined>
  limit?: number
}
interface IPager {
  limit: number //页大小
  page: number //页码
  total: number //总条数
}
export default (props: fetchTableProps) => {
  const { apiFun, params, tableRef, limit } = props
  const loading = ref<boolean>(true)
  const data = ref<any[]>([])
  if (limit && typeof limit !== 'undefined' && limit !== 0) {
    pageSize.value = Number(limit)
  }
  const pager = ref<IPager>({
    limit: pageSize.value,
    page: 1,
    total: 0
  })
  const loadData = () => {
    loading.value = true //此时更改不会影响外部
    apiFun(Object.assign(params, pager.value)).then((res) => {
      data.value = res.data.data.list
      pager.value.total = res.data.data.totalCount
      tableRef.value?.refreshColumn()
      tableRef.value?.refreshScroll()
      tableRef.value?.loadData(data.value)
      loading.value = false
    })
  }
  /*  onMounted(() => {*/
  loadData()
  // })
  const pageChange = (type: VxePagerProps) => {
    pager.value.page = type.currentPage as number
    pager.value.limit = type.pageSize as number
    loading.value = true
    loadData()
  }

  return reactive({
    data,
    pageChange,
    pager,
    loading,
    loadData
  })
}
