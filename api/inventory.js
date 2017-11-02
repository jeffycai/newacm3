//存货台账列表查询接口
export function summaryQuery(post, filter) {
	return post('/v1/web/inventorySummaryRpt/query', filter)
}

//存货台账列表导出接口
export function summaryExports(post, filter) {
	return post('/v1/web/inventorySummaryRpt/export', filter)
}

//存货台账列表打印接口
export function summaryPrint(post, filter) {
	return post('/v1/web/inventorySummaryRpt/print', filter)
}


//出入库明细表查询接口
export function detailQuery(post, filter) {
	return post('/v1/web/inventoryDetailRpt/query', filter)
}

//出入库明细表导出接口
export function detailExports(post, filter) {
	return post('/v1/web/inventoryDetailRpt/export', filter)
}

//出入库明细表打印接口
export function detailPrint(post, filter) {
	return post('/v1/web/inventoryDetailRpt/print', filter)
}
