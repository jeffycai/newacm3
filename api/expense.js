export function init(post) {
    return post("/v1/web/expense/init")
}
export function create(post, params) {
    return post("/v1/expense/create", params)
}

export function update(post, params) {
    return post("/v1/expense/update", params)
}

export function del(post, params) {
    return post("/v1/expense/delete", params)
}

export function deleteBatch(post, params) {
    return post("/v1/expense/deleteBatch", params)
}

export function audit(post, params) {
    return post("/v1/expense/audit", params)
}
export function auditBatch(post, params) {
    return post("/v1/expense/auditBatch", params)
}

export function unAudit(post, params) {
    return post("/v1/expense/unaudit", params)
}




export function prev(post, params) {
    return post('/v1/expense/previous', params)
}

export function next(post, params) {
    return post('/v1/expense/next', params)
}

/**
 * 费用发票获取编辑设置信息，税率信息 
 * @param {*} post 
 * @param {*} params 
 */
export function getDataByBusinessTypeId(post, params) {
    return post('/v1/web/expense/getDataByBusinessTypeId', params)
}

export function queryById(post, params) {
    return post('/v1/expense/queryById', params)
}

export function queryList(post, params) {
    return post('/v1/web/expenseList/query', params)
}

export function exportList(post, params) {
    return post('/v1/web/expenseList/export', params)
}

export function printList(post, params) {
    return post('/v1/web/expenseList/print', params)
}

export function searchBusiness(post,params){
    return post('/v1/web/receipt/searchBusiness', params)
}

