/**
 * webapi.js 封装app所需的所有web请求
 * 供app测试使用，app加入网站后webpai应该由网站通过config,提供给每个app
 */


import { fetch } from 'mk-utils'

export default {
    department: {
        query: () => fetch.post('/v1/department/query', {}),
        findById: (id) => fetch.post('/v1/department/findById', { id }),
        create: (option) => fetch.post('/v1/department/create', option),
        update: (option) => fetch.post('/v1/department/update', option),
        prev: (id) => fetch.post('/v1/department/prev', { id }),
        next: (id) => fetch.post('/v1/department/next', { id })
    }
}