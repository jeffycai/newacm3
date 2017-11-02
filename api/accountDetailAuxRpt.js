/**
 *     辅助明细账接口
 *     点击明细账查询调用：account/queryForDetailAuxRpt，返回两个对象，分别是科目下拉、辅助明细账具体集合
 */
export function accountQueryForDetailAuxRpt(post,list){
	return post("v1/fiDetailAccountAuxRpt/queryForAccount", list)
}

/**
 *     辅助明细账接口
 *     点击明细账科目下拉调用：fiDetailAccountAuxRpt/query，返回一个个对象，辅助明细账具体集合
 */
export function fiDetailAccountAuxRptQuery(post,list){
	return post("v1/fiDetailAccountAuxRpt/query", list)
}

/**
 * 辅助明细账
 * 根据查询条件打印
 * @param  {[type]} post   [description]
 * @param  {[type]} list   [description]
 */
export function print(post, list){
	return post('/v1/fiDetailAccountAuxRpt/print', list)
}

/**
 * 辅助明细账
 * 根据查询条件导出
 * @param  {[type]} post   [description]
 * @param  {[type]} list   [description]
 */
export function exportExcel(post, list){
	return post('/v1/fiDetailAccountAuxRpt/export', list)
}















