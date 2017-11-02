//现金银行

//收支明细
//列表打印
export function printList(post,params){
	return post("/v1/bank/bankflow/print", params)
}
//列表导出
export function exportList(post,params){
	return post("/v1/bank/bankflow/export", params)
}
// 转帐单删除
// /v1/bank/banktransfer/delete
// {
//     "id": 1,
//     "ts": "2016-12-01 00:00:00"
// }
export function banktransferDelete(post,params) {
	return post("/v1/bank/banktransfer/delete",params)
}
