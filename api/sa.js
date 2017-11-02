export function init(post,params){
	return post("/v1/web/delivery/init", params)
}

export function queryByCustomer(post,params){
	return post("/v1/web/delivery/queryByCustomer", params)
}

export function create(post, list) {
	return post("/v1/delivery/create", list)
}

export function update(post, list) {
	return post("/v1/delivery/update", list)
}

export function del(post, params){
	return post("/v1/delivery/delete",params)
}

export function deleteBatch(post,params){
	return post('/v1/delivery/deleteBatch',params)
}

export function audit(post, params){
	return post("/v1/delivery/audit",params)
}

export function auditBatch(post, list){
	return post('/v1/delivery/auditBatch',list)
}

export function unaudit(post,params){
	return post('/v1/delivery/unaudit',params)
}

export function prev(post,code){
	return post('/v1/delivery/previous',{code})
}

export function next(post,code){
	return post('/v1/delivery/next',{code})
}

export function queryById(post,id){
	return post("/v1/delivery/queryById", {id})
}

export function print(post,list){
    return post('/v1/web/delivery/print',list)
}

// 附件在销售订单保存但未审核的状态下的新增和删除接口
export function enclosurecreatebatch(post, idList) {
	return post('/v1/delivery/enclosureCreate', idList)
}
export function enclosuredeletebatch(post, idList) {
	return post('/v1/delivery/enclosureDelete', idList)
}
// 发票导入
export function importsToSave(post, params) {
	return post('/v1/invoiceImport/importsToSave',params)
}
