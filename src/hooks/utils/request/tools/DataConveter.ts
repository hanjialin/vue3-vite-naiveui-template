/*
 * @desc 对多个文件进行formdate封装
 * @param
 * @author HanJiaLin
 * @time 2024/2/8 10:35
 * */
const getFormData = (object: any) => {
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
export default getFormData
