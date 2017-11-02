
/**
 * 校验组织是否存在
 * @param  {[type]}  post [description]
 * @param  {[type]}  name [description]
 * @return {Boolean}      [description]
 */
export function isNotExist(post,name){
	return post("/v1/org/isNotExist",{'orgName':name})
}

/**
 * 创建组织
 * @param  {[type]} post [description]
 * @param  {[type]} name [description]
 * @return {[type]}      [description]
 */
export function create(post, obj){
	return post("/v1/org/create", obj)
}

/**
 * [queryOrgList 刷新左上角组织列表]
 * @param  {[type]} post [description]
 * @return {[type]}      [description]
 */
export function queryOrgList(post,obj){
	return post('/v1/org/queryOrgList',obj)
}

/**
 * [querySubscription 查询服务商权限]
 * @param  {[type]} post  [description]
 * @param  {[type]} orgId [description]
 * @return {[type]}       [description]
 */
export function querySubscription(post,orgId){
	return post('/v1/dzCustomer/querySubscription',{orgId:orgId})
}

/**
 * [queryServiceProvider 查询服务商列表]
 * @param  {[type]} post [description]
 * @return {[type]}      [description]
 */
export function queryServiceProvider(post,id){
	return post('/v1/org/queryServiceProvider',{id:id})
}

/**
 * 通过id获取组织信息
 * @param  {[type]} post [description]
 * @param  {[type]} id   [description]
 * @return {[type]}      [description]
 */
export function getById(post, id){
	return post("/v1/org/getById", {id})
}

/**
 * 获取所有组织列表
 * @param  {[type]} post [description]
 * @return {[type]}      [description]
 */
export function query(post,obj){
	return post("/v1/org/query",obj)
}

//删除组织
export function deleteOrg(post,id){
	return post('/v1/org/delete',{id})
}
// 获取用户组织档案信息
export function getOrg(post,obj){
	return post('/v1/SetOrg/getOrg',obj)
}
// 保存更新组织档案
export function update(post,obj){
	return post('/v1/SetOrg/update',obj)
}

//检测系统设置中组织档案下信用代码和计算机代码是否为空
export function isExist(post,str,code){
	//code : CreditCode 信用代码   ComputerCode 计算机码
	let identificationCode = str +'_'+ code
	return post('/v1/SetOrg/isExist',identificationCode)
}

//更新组织启用年月
export function updateEnabledYearAndMonth(post, enabledYear, enabledMonth){
	return post('/v1/SetOrg/updateEnabledYearAndMonth',{enabledYear: enabledYear, enabledMonth: enabledMonth})
}

//更新组织截至日期
export function updateExpireTime(post,obj){
	return post('/v1/org/updateExpireTime',obj)
}

//导出组织列表
export function exportExcel(formPost,obj){
	return formPost('/v1/org/export', obj)
}
//新增组织统计查询
export function analyze(post,obj){
	return post('/v1/org/analyze',obj)
}
//新增组织统计导出
export function analyzeExport(formPost,obj){
	return formPost('/v1/org/analyzeExport',obj)
}

export function getCityMap(post,obj){
	return post('/v1/SetOrg/getCityMap',obj)
}

export function tiaozhuan(post) {
	// body...
	return post('/v1/serviceProvider/tiaozhuan',{orgId:'100050'})
}

export function updateByOrgId(post,obj){
	return post('/v1/person/authorize/updateByOrgId',obj)
}