/**
 * mock.js 提供应用截获ajax请求，为脱离后台测试使用
 * 模拟查询更改内存中mockData,并返回数据
 */

import { fetch } from 'mk-utils'

const mockData = fetch.mockData

fetch.mock('/v1/set/query', (option) => {
    const id = mockData.customers.length + ''
    const v = { ...option, id }
    mockData.customers.push(v)

    return { result: true, value: v }
})