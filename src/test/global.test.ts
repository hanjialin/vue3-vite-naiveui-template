import { expect, test } from 'vitest'
import dataConveter from '@/hooks/utils/request/tools/DataConveter'

/**
 * @description 测试用例的demo目前仅仅用作测试单一的js方法
 */
test('null object', () => {
  expect(dataConveter<object>({ id: 1 }))
})
