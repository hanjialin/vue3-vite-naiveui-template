/*
 * @desc 监测本地是否保存主题
 * @param
 * @author HanJiaLin
 * @time 2023/5/4 17:09
 * */
/*
 * 思路逻辑:
 * 1.进入系统先检验本地cookie是否存在主题
 * 2.
 * */
import { storage } from '@/hooks/utils/tools/storage'
import { useDesignSettingStore } from '@/store/modules/designSetting'
export function checkTheme() {
  const check = storage.get('darkTheme')
  if (check !== null) {
    useDesignSettingStore().init(check)
  }
}
