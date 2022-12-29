import Cookies from 'js-cookie'
/**
 * @author HanJiaLin
 * @date 2022/12/25 19:46
 * @version 1.0
 * @description
 **/
export default () => {
  const tokenKey = 'template'
  /**
   * @description 取token
   * @author HanJiaLin
   * @date 2022/12/25 19:46
   * @version 1.0
   **/
  const getToken = () => {
    return Cookies.get(tokenKey)
  }
  /**
   * @description 设置token
   * @author HanJiaLin
   * @date 2022/12/25 19:47
   * @version 1.0
   * @params token
   **/
  const setToken = (token: String) => {
    return !!Cookies.set(tokenKey, token)
  }
  /**
   * @description 删除token
   * @author HanJiaLin
   * @date 2022/12/25 19:49
   * @version 1.0
   * @params
   **/
  const removeToken = () => {
    return Cookies.remove(tokenKey)
  }

  return { getToken, setToken, removeToken }
}
