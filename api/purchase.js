
export function init(post,params){
	return post("/v1/arrival/init", params)
}

/**
 * 查询供应商预付款、上次结算方式
 * @param {*} post
 * @param {*} params
 */
export function queryVendorPrePayAmount(post,params){
	return post("/v1/arrival/queryVendorPrePayAmount", params)
}

export function create(post, list) {
	return post("/v1/arrival/create", list)
}

export function update(post, list) {
	return post("/v1/arrival/update", list)
}

export function del(post, params){
	return post("/v1/arrival/delete",params)
}

export function deleteBatch(post,params){
	return post('/v1/arrival/deleteBatch',params)
}

export function audit(post, params){
	return post("/v1/arrival/audit",params)
}

export function auditBatch(post, list){
	return post('/v1/arrival/auditBatch',list)
}

export function unAudit(post,params){
	return post('/v1/arrival/unAudit',params)
}

export function prev(post,code){
	return post('/v1/arrival/previous',{code})
}

export function next(post,code){
	return post('/v1/arrival/next',{code})
}

export function queryById(post,id){
	return post("/v1/arrival/queryById", {id})
}

// 附件在销售订单保存但未审核的状态下的新增和删除接口
export function enclosurecreatebatch(post, idList) {
	return post('/v1/arrival/enclosureCreate', idList)
}
export function enclosuredeletebatch(post, idList) {
	return post('/v1/arrival/enclosureDelete', idList)
}




//列表打印
export function printList(post,params){
	return post("/v1/arrival/printList", params)
}
//列表导出
export function exportList(post,params){
	return post("/v1/arrival/exportList", params)
}

export function queryList(post,params){
	return post("/v1/arrival/queryList", params)
}
