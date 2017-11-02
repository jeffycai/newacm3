/**
 * webapi.js 封装app所需的所有web请求
 * 供app测试使用，app加入网站后webpai应该由网站通过config,提供给每个app
 */


import { fetch } from 'mk-utils'

export default {
    deliveryList: {
        init: (option) => fetch.post('/v1/web/deliveryList/queryInit', option),
        query: (option) => fetch.post('/v1/web/deliveryList/query', option),
        del: (option) => fetch.post('/v1/delivery/delete', option),
        deleteBatch: (option) => fetch.post('v1/delivery/deleteBatch', option),
        auditBatch: (option) => fetch.post('v1/delivery/auditBatch', option),
        audit: (option) => fetch.post('/v1/delivery/audit', option),
        reject: (option) => fetch.post('/v1/delivery/unaudit', option),


        customerQuery:(option)=> fetch.post('v1/customerArchive/query',{
            isContentEmpty: false,
            status: true,
            notNeedPage: true,
            page: {currentPage: 1, pageSize: 50}
        }),
        commodityrQuery:()=> fetch.post('v1/inventory/queryBySale',{
            notNeedPage:true,
            status:true
        })
    }
}
