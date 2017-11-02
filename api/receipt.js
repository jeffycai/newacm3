import { fetch } from 'mk-utils'

export default {
	getInventorys: {
		query: (params) => fetch.post('v1/inventory/queryBySale', params)
	}
}


// /**
//  * 创建理票单
//  * @param  {[type]} post [description]
//  * @param  {[type]} data [description]
//  * @return {[type]}      [description]
//  */
// export function create(post, data){
// 	return post("/v1/receipt/create", data)
// }


// /**
//  * 理票单保存
//  * @param  {[type]} post [description]
//  * @param  {[type]} data [description]
//  * @return {[type]}      [description]
//  */
// export function save(post, data){
// 	return post("/v1/web/receipt/save", data)
// }
// /**
//  * 暂存理票单
//  * @param  {[type]} post [description]
//  * @param  {[type]} data [description]
//  * @return {[type]}      [description]
//  */
// export function interim(post, data){
// 	return post("/v1/web/receipt/interim", data)
// }

// /**
//  * 删除理票单
//  * @param  {[type]} post [description]
//  * @param  {[type]} id   [description]
//  * @param  {[type]} ts   [description]
//  * @return {[type]}      [description]
//  */
// export function del(post, id, ts){
// 	return post("/v1/receipt/batchDelete", {id,ts})
// }

// /**
//  * 修改理票单
//  * @param  {[type]} post [description]
//  * @param  {[type]} data [description]
//  * @return {[type]}      [description]
//  */
// export function update(post, data){
// 	return post("/v1/receipt/save", data)
// }

// /**
//  * 通过id获取理票单
//  * @param  {[type]} post [description]
//  * @param  {[type]} id   [description]
//  * @return {[type]}      [description]
//  */
// export function getById(post, id){
// 	return post("/v1/receipt/getById", {id})
// }

// /**
//  * 获取某个理票单图片
//  * @param  {[type]} post [description]
//  * @param  {[type]} id   [description]
//  * @return {[type]}      [description]
//  */
// export function getImages(post, id, customerId){
// 	let data = {id}
// 	if(customerId)
// 		data.customerId = customerId
// 	return post("/v1/web/receipt/images/list", data)
// }


// /**
//  * 审核理票单For代帐公司
//  * @param  {[type]} post [description]
//  * @param  {[type]} ids  [description]
//  * @return {[type]}      [description]
//  */
// export function audit(post, ids, tss, customerIds, codes){
// 	let data = {ids:ids, tss:tss, codes}
// 	if(customerIds)
// 		data.customerIds = customerIds
// 	return post("/v1/web/audit/approve", data)
// }

// /**
//  * 反审核
//  * @param  {[type]} post  [description]
//  * @param  {[type]} ids   [description]
//  * @param  {[type]} tss   [description]
//  * @param  {[type]} codes [description]
//  * @return {[type]}       [description]
//  */
// export function reject(post, ids, tss,  codes){
// 	let data = {ids:ids, tss:tss, codes}
// 	return post("/v1/web/audit/reverseAudit", data)
// }

// /**
//  * 驳回理票单For代帐公司
//  * @param  {[type]} post [description]
//  * @param  {[type]} ids  [description]
//  * @return {[type]}      [description]
//  */
// export function rejectOld (post, ids, description, tss, customerIds){
// 	let data = {rid:ids, tss:tss, context: description}
// 	if(customerIds)
// 		data.customerIds = customerIds
// 	return post("/v1/web/audit/reject", data)
// }



// /**
//  * 根据名称模糊查询往来单位
//  * @param  {[type]} post     [description]
//  * @param  {[type]} incomeId [description]
//  * @param  {[type]} name     [description]
//  * @return {[type]}          [description]
//  */
// export function getConsumerOrVendors(post, incomeId, name, direction){
// 	if( direction == 2)
// 		return post("v1/vendor/query",{
// 			"status":true,
// 			"page": {
//         		"currentPage": 1,
//         		"pageSize": 9999999
//     		}
// 		})
// 	else
// 		return post("v1/customerArchive/query",{
// 			"status":true,
// 			"page": {
//         		"currentPage": 1,
//         		"pageSize": 9999999
//     		}
// 		})

// 	//return post("v1/web/receipt/opt/consumerOrVendor", {id:incomeId, name, direction})
// }


// /**
//  * 根据名称模糊查询存货
//  * @param  {[type]} post [description]
//  * @param  {[type]} 	  {
//         "status": true,  -- 状态：1启用/0停用
// 		"notNeedPage": true,  -- 不需要分页，如需分页则可以不传或给false
//         "page":{--分页信息
//             "currentPage":1,  -- 当前要查询的页码
//             "pageSize":50  -- 每页显示记录数量
//         }
// 	  } [description]
//  * @return {[type]}      [description]
//  */
// export function getInventorys(post, list){
// 	return post("v1/inventory/queryBySale", list)
// 	//return post("/v1/web/receipt/opt/inventory", { name})

// }

// export function getAssets(post, bizTypeCode){
// 	return post("v1/web/receipt/queryAsset", {businessCode:bizTypeCode})
// }

// export function getAssType(post, bizTypeCode){
// 	return post("v1/web/receipt/queryAssetType", {businessCode:bizTypeCode})
// }



// /**
//  * 完成提交
//  * @param  {[type]} post [description]
//  * @param  {[type]} id   [description]
//  * @param  {[type]} ts   [description]
//  * @return {[type]}      [description]
//  */
// export function finishCommit(post, id, ts){
// 	return post('v1/web/receipt/commit',{id, ts:ts, status:3})
// }

// /**
//  * 批量提交理票单
//  * @param  {[type]} post [description]
//  * @param  {[type]} ids  [description]
//  * @return {[type]}      [description]
//  */
// export function submit(post, ids, tss){
// 	return post('v1/web/receipt/submit',{rid:ids, tss:tss})
// }

// /**
//  * 批量删除理票单
//  * @param  {[type]} post [description]
//  * @param  {[type]} ids  [description]
//  * @return {[type]}      [description]
//  */
// export function batchDel(post, ids, tss){
// 	return post('v1/web/receipt/batchDelete',{ids:ids, tss:tss})
// }

// /**
//  * 获取银行帐号
//  * @param  {[type]} post [description]
//  * @param  {[type]} name [description]
//  * @return {[type]}      [description]
//  */
// export function getBankaccounts(post, name, bankAccountTypeId){
// 	let param = {
// 		"status":true,
// 		"page": {
//     		"currentPage": 1,
//     		"pageSize": 9999999
// 		}
// 	}
// 	if(bankAccountTypeId != -1){
// 		param.bankAccountTypeId = bankAccountTypeId
// 	}
// 	return post('v1/bankAccount/query',param)

// 	/*
// 	if(!name)
// 		return post('v1/web/receipt/opt/bankaccount',{})

// 	else
// 		return post('v1/web/receipt/opt/bankaccount',{name})
// 	*/
// }

// ///web/receipt/opt/inventory

// /**
//  * 上一页
//  * @param  {[type]}
//  * @param  {[type]}
//  * @param  {[type]}
//  * @return {[type]}
//  */
// export function prevpage(post, taskId, id, code, inAccountDateS){
// 	return post('v1/web/receipt/opt/previous',{id,code, taskId, inAccountDateS})
// }

// /**
//  * 下一页
//  * @param  {[type]}
//  * @param  {[type]}
//  * @param  {[type]}
//  * @return {Function}
//  */
// export function nextpage(post, taskId, id, code, inAccountDateS){
// 	return post('v1/web/receipt/opt/next',{id,code, taskId, inAccountDateS})
// }


// export function buildRichardTicketVoucher(post, data){
// 	return post('v1/web/receipt/importsSave', data)
// }

// /**
//  * 根据业务类型查询新增理票明细界面元数据
//  * @param  {[type]} post      [description]
//  * @param  {[type]} bizTypeId [description]
//  * @return {[type]}           [description]
//  */
// export function queryTacticsByBusiness(post, bizTypeId){
// 	return post('/v1/web/receipt/queryTacticsByBusiness', {businessId:bizTypeId})
// }


// /**
//  * 导出
//  * @param  {[type]} post   [description]
//  * @param  {[type]} year   [description]
//  * @param  {[type]} month  [description]
//  * @param  {[type]} filter [description]
//  * @return {[type]}        [description]
//  */
// export function exportExcel(post, year, month,sts,order){

//     let data = {}

//     if (year != -1 && month != -1) {
//         data.sortMonth = parseInt(month)
//         data.sortYear = year
//     }
// 		data.sts = sts
// 		data.order = order
//     return post('/v1/web/receipt/export',data)
// }
// export function exportTemplate(post){


//     return post('/v1/web/receipt/excel/exportTemplate')
// }

// /**
//  * 根据查询条件打印
//  * @param  {[type]} post   [description]
//  * @param  {[type]} year   [description]
//  * @param  {[type]} month  [description]
//  * @param  {[type]} filter [description]
//  */
// export function print(post, sortYear,sortMonth,sts,order){
// 	return post('/v1/web/receipt/print', { sortYear, sortMonth, sts,order})
// }

// /**
//  * 根据属性列表,批量查询账户
//  * @param  {[type]} post               [description]
//  * @param  {[type]} bankAccountTypeIds [description]
//  * @return {[type]}                    [description]
//  */
// export function queryBankAccountByType(post, bankAccountTypeIds){
// 	let parm = {
// 		bankAccountTypeIds: bankAccountTypeIds,
// 		status:true
// 	}

// 	return post('/v1/bankAccount/queryBankAccountByType', parm)
// }

// /**
// 流水账  附件的  增删 接口
// */
// export function asyncUpdateImg(post, fileList) {
// 	return post('/v1/web/receipt/asyncUpdateImg', fileList)
// }


// /**
// 查询业务类型
// */
// export function searchBusiness(post, key){
// 	return post('/v1/web/receipt/searchBusiness', {key})
// }

// /**
//  导出流水账到其他组织
//  */
// export function copyReceiptbyOrg(post, data){
// 	return post('/v1/web/receipt/copyReceiptbyOrg', data)
// }

// /**
//  查询组织 获取当前最大结转期间
//  */
// export function copyQueryPeriod(post, data){
// 	return post('/v1/web/receipt/copyQueryPeriod', data)
// }


// export function queryBankReconciliatioByIds(post,ids){
// 	return post('/v1/acmBankReconciliatio/queryBankReconciliatioByIds',{ids})
// }

// export function generateReceipt(post,data){
// 	return post('/v1/acmBankReconciliatio/generateReceipt',data)
// }