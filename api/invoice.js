//列表查询接口
export function list(post,params){
	return post("/v1/certification/queryList", params)
}

//发票认证确认接口
export function confirm(post,params){
	return post("/v1/certification/batchCertificationInvoice", params)
}





















