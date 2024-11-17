import { isObject } from '@/hooks/utils/tools/is'

type CustomObject = {
  [key: string]: any
}
/*
 * @desc 对多个文件进行FormDate封装,某些情况下使用post需要form表单传递数据,数据在传递之前使用该方法封装一封
 * @param
 * @author HanJiaLin
 * @time 2024/2/8 10:35
 * */
const getFormData = <T extends CustomObject>(object: T) => {
  if (isObject(object)) {
    const formData = new FormData()
    Object.keys(object).forEach((key) => {
      const value = object[key]
      if (Array.isArray(value)) {
        value.forEach((subValue, i) => formData.append(key, subValue))
      } else {
        formData.append(key, object[key])
      }
    })
    return formData
  }
  throw new Error('只接受有值对象进行FormData转换')
}
export default getFormData
