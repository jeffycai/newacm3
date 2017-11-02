/**
 * 流水账系统预置配置方案
 * @param  {[type]} post [description]
 * @return {[type]}      [description]
 */
export function getByDtoId(post) {
	return post("/v1/setCardControl/getByDtoId", { "dtoId": 1 })
}
/**
 * 更新实体类编辑配置方案
 * @param  {[type]} post [description]
 * @return {[type]}      [description]
 */
export function updateCardControl(post, data) {
	return post("/v1/setCardControl/updateCardControl", data)
}
// 导入模板出错下载文件接口
export function excelDownload(post, filename, newfilename) {
	return post('/v1/wage/excel/download', { filename, newfilename })
}
// 新流水账获取设置字段
export function getSettingByDtoId(post, params) {
	return post('/v1/setCardControl/getByDtoId', params)
}

// 新流水账更新设置字段
export function updateSettingCardControl(post, params) {
	return post('/v1/setCardControl/updateCardControl', params)
}