/*
 * @desc 改变传入颜色的亮度,使其变的更浅
 * @param
 * @author HanJiaLin
 * @time 2023/4/28 10:20
 * */

/**
 * 将传递的百分比求和为十六进制颜色的 R、G 或者 B
 * @param {string} color 要更改的颜色
 * @param {number} amount 更改颜色的量
 * @returns {string} 返回加工后的颜色
 */
const addLight = (color: string, amount: number): string => {
  const cc = parseInt(color, 16) + amount
  const c = cc > 255 ? 255 : cc
  return c.toString(16).length > 1 ? c.toString(16) : `0${c.toString(16)}`
}
/**
 * 通过百分比淡化十六进制颜色
 * @param {string} color 要更改的颜色
 * @param {number} amount 更改颜色的量
 * @returns {string} 返回处理后的十六进制颜色
 */
export function lighten(color: string, amount: number): string {
  color = color.indexOf('#') >= 0 ? color.substring(1, color.length) : color
  amount = Math.trunc((255 * amount) / 100)
  return `#${addLight(color.substring(0, 2), amount)}${addLight(
    color.substring(2, 4),
    amount
  )}${addLight(color.substring(4, 6), amount)}`
}
