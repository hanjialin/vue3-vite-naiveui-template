import { AxiosPromise } from 'axios'
import { PaginationInfo } from 'naive-ui'
import { VNodeChild } from 'vue'
/*
 * @desc 表格查询hooks方法的接口
 * @param
 * @author HanJiaLin
 * @time 2023/5/12 11:32
 * */
export interface fetchTableProps {
  apiFun: (params?: object) => AxiosPromise<any>
  params: any
  isMounted?: true | boolean
  limit?: number
  pageSize?: number
}
/*
 * @desc 表格查询API的分页对象接口
 * @param
 * @author HanJiaLin
 * @time 2023/5/12 11:33
 * */
export interface IPager {
  pageSize: number //页大小
  page: number //页码
}
/*
 * @desc 表格查询分页对象的配置参数接口
 * @param
 * @author HanJiaLin
 * @time 2023/5/12 11:33
 * */
export interface IPagerSetting {
  showSizePicker: boolean //是否显示分页列表选项
  pageSizes: any[] //分页大小列表
  itemCount: number //总条数
  prefix: (info: PaginationInfo) => VNodeChild //分页前缀插槽
}
/*
 * @desc 表格分页全部参数对象接口
 * @param
 * @author HanJiaLin
 * @time 2023/5/12 11:36
 * */
export interface IPagerAll extends IPagerSetting, IPager {}
