/**
 * 存货帐单据接口
 * @param {*} post
 * @param {*} params
 */

export function create(post,params){    //库存单据新增 @author gaoxue
	return post("/v1/rdrecord/create", params)
}

export function previous(post,params){    //查询上一张库存单据 @author gaoxue
	return post("/v1/rdrecord/previous", params)
}

export function next(post, params) {  //查询下一张库存单据 @author gaoxue
	return post("/v1/rdrecord/next", params)
}

export function del(post, params) { //库存单据删除 @author gaoxue
	return post("/v1/rdrecord/delete", params)
}

export function update(post, params) { //库存单据修改 @author gaoxue
	return post("/v1/rdrecord/update", params)
}

export function queryById(post, params) {  //库存单据查询 @author gaoxue
	return post("/v1/rdrecord/queryById", params)
}
export function exportTemplate(post){
	return post('/v1/periodBegin/downloadTemplate')
}

// 存货初始化保存
export function savePeriodBegin(post,params) {
	return post('/v1/periodBegin/save',params)
}

// 存货初始化导入
export function importPeriodBegin(post,params) {
	return post('/v1/periodBegin/import',params)
}
// 错误文件夹下载

export function download(post,params){
	return post('/v1/periodBegin/download',params)
}
