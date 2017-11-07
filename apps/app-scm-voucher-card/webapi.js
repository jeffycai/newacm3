/**
 * webapi.js 封装app所需的所有web请求
 * 供app测试使用，app加入网站后webpai应该由网站通过config,提供给每个app
 */


import { fetch } from 'mk-utils'

export default {
    delivery: {
        init: (option) => fetch.post('/v1/web/delivery/init', option),
        create: (option) => fetch.post('/v1/delivery/create', option),
        update: (option) => fetch.post('/v1/delivery/update', option),
        del: (option) => fetch.post('/v1/delivery/delete', option),
        audit: (option) => fetch.post('/v1/delivery/audit', option),
        unaudit: (option) => fetch.post('/v1/delivery/unaudit', option),
        previous: (code) => fetch.post('/v1/delivery/previous', code),
        next: (code) => fetch.post('/v1/delivery/next', code),
        queryByCustomer: (option) => fetch.post('/v1/web/delivery/queryByCustomer', option),
    },
    /*
    stock: {
        query: (option) => fetch.post('/v1/stock/query', option)
    },
    customer: {
        query: (option) => fetch.post('/v1/customerArchive/query', option)
    },
    department: {
        query: (option) => fetch.post('/v1/department/query', option)
    },
    person: {
        query: (option) => fetch.post('/v1/person/query', option)
    },
    project: {
        query: (option) => fetch.post('/v1/project/query', option)
    },
    ticketType: {
        query: (option) => fetch.post('/v1/ticketType/query', option)
    },
    warehouse: {
        query: (option) => fetch.post('/v1/warehouse/query', option)
    },
    taxRate: {
        query: (option) => fetch.post('/v1/taxRate/query', option)
    },
    settlementMode: {
        query: (option) => fetch.post('/v1/settlementMode/query', option)
    },
    assetAccount: {
        query: (option) => fetch.post('/v1/assetAccount/query', option)
    }*/
}