/*
 * @desc 动态可以修改的列表页数
 * @param
 * @author HanJiaLin
 * @time 2023/7/11 14:22
 * */
import { ref } from 'vue'
export const pageSize = ref<number>(Number(import.meta.env.VITE_VXE_TABLE_PAGESIZE))
