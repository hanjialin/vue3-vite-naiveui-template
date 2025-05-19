import { isObject } from '@/hooks/utils/tools/is'

type CustomObject = {
  [key: string]: any
}
//函数重载签名
/**
 * @desc FormData重载类型定义
 * @author HanJiaLin
 * @time 2025/5/15 10:10
 * @param object T 任意对象,必须是对象
 * @param files File[] 文件数组可传可不传
 * @param key string 接收文件的key,默认为files
 **/
type ConvertedOptions<T extends CustomObject> =
  | { object: T; files?: File[]; key?: string }
  | { object?: undefined; files: File[]; key?: string }

/**
 * @desc 对多个文件进行FormData封装,某些情况下使用post需要form表单传递数据,数据在传递之前使用该方法封装一封
 * @author HanJiaLin
 * @time 2025/5/15 09:42
 * @param options ConvertedOptions
 **/

export function convertedToFormData<T extends CustomObject>(options: ConvertedOptions<T>) {
  const fromData = new FormData()
  const { object, files, key = 'files' } = options
  if (object && isObject(object)) {
    Object.keys(object).forEach((objKey) => {
      const value = object[objKey]
      if (Array.isArray(value)) {
        value.forEach((subValue, i) => fromData.append(objKey, subValue))
      } else {
        fromData.append(objKey, object[objKey])
      }
    })
  }
  if (files && files.length > 0) {
    files.forEach((file) => fromData.append(key, file))
  }
  return fromData
}
export default convertedToFormData
