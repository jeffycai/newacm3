import { fetch } from 'mk-utils'


export default {
	consumerQuery: {
		query: (option) => fetch.post('/v1/customerArchive/query', option)
	},
	projectQuery: {
		query: (option) => fetch.post('v1/project/query', option)
	},
	queryBankAccountByType:{
		query:(option)=>fetch.post('/v1/bankAccount/queryBankAccountByType',option)
	}
}
// /**
//  *     currency币种接口
//  *
//  * 币种的新增
//  * @param  {[type]} post       [description]
//  * @param  {[type]} list:{'orgId','code','name','exchangeRate','status'} [description]
//  * @return {[type]}            [description]
//  */
// export function currencyCreate(post,list){
// 	return post("v1/currency/create", list)
// }

// export function checkDate(post,list){
// 	return post("v1/bankAccount/checkDate", list)
// }
// /**
//  * 币种的删除
//  * @param  {[type]} post       [description]
//  * @param  {[type]} list:{'orgId','id'} [description]
//  * @return {[type]}            [description]
//  */
// export function currencyDelete(post,list){
// 	return post("v1/currency/delete", list)
// }
// /**
//  * 轮询接口
//  * @param  {[type]} post       [description]
//  * @param  {[type]} list:{'orgId','id'} [description]
//  * @return {[type]}            [description]
//  */
// export function queryPayStatus(post,list){
// 	return post("v1/order/queryPayStatus", list)
// }

// /**
//  * 取得支付二维码接口
//  * @param  {[type]} post       [description]
//  * @param  {[type]} list:{'orgId','id','name'} [description]
//  * @return {[type]}            [description]
//  */
// export function getPayCode(post,list){
// 	return post("v1/order/getPayCode", list)
// }
// /**
//  * 币种的修改
//  * @param  {[type]} post       [description]
//  * @param  {[type]} list:{'orgId','id','code','name','exchangeRate','status'} [description]
//  * @return {[type]}            [description]
//  */
// export function currencyUpdate(post,list){
// 	return post("v1/currency/update", list)
// }

// /**
//  * 币种的列表查询
//  * @param  {[type]} post       [description]
//  * @param  {[type]} list [description]
//  * @return {[type]}            [description]
//  */
// export function currencyQuery(post,list){
// 	return post("v1/currency/query", list)
// }

// /**
//  * 币种的单条记录查询
//  * @param  {[type]} post       [description]
//  * @param  {[type]} list [description]
//  * @return {[type]}            [description]
//  */
// export function currencyGetById(post,list){
// 	return post("v1/currency/getById",list)
// }

// /**
//  *     summary  摘要接口
//  *
//  * 摘要的新增
//  * @param  {[type]} post       [description]
//  * @param  {[type]} list:{'orgId','code','name'} [description]
//  * @return {[type]}            [description]
//  */
// export function summaryCreate(post,list){
// 	return post("v1/summary/create", list)
// }

// /**
//  * 摘要的删除
//  * @param  {[type]} post       [description]
//  * @param  {[type]} list:{'orgId','id'} [description]
//  * @return {[type]}            [description]
//  */
// export function summaryDelete(post,list){
// 	return post("v1/summary/delete", list)
// }

// /**
//  * 摘要的修改
//  * @param  {[type]} post       [description]
//  * @param  {[type]} list:{'orgId','id','name'} [description]
//  * @return {[type]}            [description]
//  */
// export function summaryUpdate(post,list){
// 	return post("v1/summary/update", list)
// }

// /**
//  * 摘要的列表查询
//  * @param  {[type]} post       [description]
//  * @param  {[type]} list [description]
//  * @return {[type]}            [description]
//  */
// export function summaryQuery(post,list){
// 	return post("v1/summary/query", list)
// }

// /**
//  * 摘要的单条记录查询
//  * @param  {[type]} post       [description]
//  * @param  {[type]} list [description]
//  * @return {[type]}            [description]
//  */
// export function summaryGetById(post,list){
// 	return post("v1/summary/getById",list)
// }

// /**
//  *     unit  计量单位接口
//  *
//  * 计量单位的新增
//  * @param  {[type]} post       [description]
//  * @param  {[type]} list:{'orgId','code','name'} [description]
//  * @return {[type]}            [description]
//  */
// export function unitCreate(post,list){
// 	return post("v1/unit/create", list)
// }

// /**
//  * 计量单位的删除
//  * @param  {[type]} post       [description]
//  * @param  {[type]} list:{'orgId','id'} [description]
//  * @return {[type]}            [description]
//  */
// export function unitDelete(post,list){
// 	return post("v1/unit/delete", list)
// }

// /**
//  * 计量单位的修改
//  * @param  {[type]} post       [description]
//  * @param  {[type]} list:{'orgId','id','code','name'} [description]
//  * @return {[type]}            [description]
//  */
// export function unitUpdate(post,list){
// 	return post("v1/unit/update", list)
// }

// /**
//  * 计量单位的列表查询
//  * @param  {[type]} post       [description]
//  * @param  {[type]} list:{'orgId'} [description]
//  * @return {[type]}            [description]
//  */
// export function unitQuery(post,list){
// 	return post("v1/unit/query", list)
// }

// /**
//  * 计量单位的单条记录查询
//  * @param  {[type]} post       [description]
//  * @param  {[type]} list [description]
//  * @return {[type]}            [description]
//  */
// export function unitGetById(post,list){
// 	return post("v1/unit/getById",list)
// }

// /**
//  *     customerArchive  客户接口
//  *
//  * 客户的新增
//  * @param  {[type]} post       [description]
//  * @param  {[type]} list:{'code','name','status'} [description]
//  * @return {[type]}            [description]
//  */
// export function consumerCreate(post,list){
// 	return post("v1/customerArchive/create", list)
// }

// /**
//  * 客户的删除
//  * @param  {[type]} post       [description]
//  * @param  {[type]} list:{'id'} [description]
//  * @return {[type]}            [description]
//  */
// export function consumerDelete(post,list){
// 	return post("v1/customerArchive/delete", list)
// }

// /**
//  * 客户的修改
//  * @param  {[type]} post       [description]
//  * @param  {[type]} list:{'id','code','name','status'} [description]
//  * @return {[type]}            [description]
//  */
// export function consumerUpdate(post,list){
// 	return post("v1/customerArchive/update", list)
// }

// /**
//  * 客户的列表查询
//  * @param  {[type]} post       [description]
//  * @param  {[type]} list [description]
//  * @return {[type]}            [description]
//  */
// export function consumerQuery(post,list){
// 	return post("v1/customerArchive/query", list)
// }

// /**
//  * 客户的单条记录查询
//  * @param  {[type]} post       [description]
//  * @param  {[type]} list:{'id'} [description]
//  * @return {[type]}            [description]
//  */
// export function consumerGetById(post,list){
// 	return post("v1/customerArchive/getById",list)
// }

// /**
//  *     vendor  供应商接口
//  *
//  * 供应商的新增
//  * @param  {[type]} post       [description]
//  * @param  {[type]} list:{'code','name','status'} [description]
//  * @return {[type]}            [description]
//  */
// export function vendorCreate(post,list){
// 	return post("v1/vendor/create", list)
// }

// /**
//  * 供应商的删除
//  * @param  {[type]} post       [description]
//  * @param  {[type]} list:{'id'} [description]
//  * @return {[type]}            [description]
//  */
// export function vendorDelete(post,list){
// 	return post("v1/vendor/delete", list)
// }

// /**
//  * 供应商的修改
//  * @param  {[type]} post       [description]
//  * @param  {[type]} list:{'id','code','name','status'} [description]
//  * @return {[type]}            [description]
//  */
// export function vendorUpdate(post,list){
// 	return post("v1/vendor/update", list)
// }

// /**
//  * 供应商的列表查询
//  * @param  {[type]} post       [description]
//  * @param  {[type]} list [description]
//  * @return {[type]}            [description]
//  */
// export function vendorQuery(post,list){
// 	return post("v1/vendor/query", list)
// }

// /**
//  * 供应商的单条记录查询
//  * @param  {[type]} post       [description]
//  * @param  {[type]} list:{'id'} [description]
//  * @return {[type]}            [description]
//  */
// export function vendorGetById(post,list){
// 	return post("v1/vendor/getById",list)
// }

// /**
//  *     inventory  存货接口
//  *
//  * 存货的新增
//  * @param  {[type]} post       [description]
//  * @param  {[type]} list:{'code','name','specification','unitId','status'} [description]
//  * @return {[type]}            [description]
//  */
// export function inventoryCreate(post,list){
// 	return post("v1/inventory/create", list)
// }

// /**
//  * 存货的删除
//  * @param  {[type]} post       [description]
//  * @param  {[type]} list:{'id'} [description]
//  * @return {[type]}            [description]
//  */
// export function inventoryDelete(post,list){
// 	return post("v1/inventory/delete", list)
// }

// /**
//  * 存货的修改
//  * @param  {[type]} post       [description]
//  * @param  {[type]} list:{'id','code','name','specification','unitId','status'} [description]
//  * @return {[type]}            [description]
//  */
// export function inventoryUpdate(post,list){
// 	return post("v1/inventory/update", list)
// }

// /**
//  * 存货的列表查询
//  * @param  {[type]} post       [description]
//  * @param  {[type]} list [description]
//  * @return {[type]}            [description]
//  */
// export function inventoryProperty(post,list){
// 	return post("v1/inventoryProperty/query", list)
// }

// /**
//  * 存货的属性查询
//  * @param  {[type]} post       [description]
//  * @param  {[type]} list [description]
//  * @return {[type]}            [description]
//  */
// export function inventoryQuery(post,list){
// 	return post("v1/inventory/query", list)
// }

// /**
//  * 存货的单条记录查询
//  * @param  {[type]} post       [description]
//  * @param  {[type]} list:{'id'} [description]
//  * @return {[type]}            [description]
//  */
// export function inventoryGetById(post,list){
// 	return post("v1/inventory/getById",list)
// }

// /**
//  *     project  项目接口
//  *
//  * 项目的新增
//  * @param  {[type]} post       [description]
//  * @param  {[type]} list:{'code','name','status'} [description]
//  * @return {[type]}            [description]
//  */
// export function projectCreate(post,list){
// 	return post("v1/project/create", list)
// }

// /**
//  * 项目的删除
//  * @param  {[type]} post       [description]
//  * @param  {[type]} list:{'id'} [description]
//  * @return {[type]}            [description]
//  */
// export function projectDelete(post,list){
// 	return post("v1/project/delete", list)
// }

// /**
//  * 项目的修改
//  * @param  {[type]} post       [description]
//  * @param  {[type]} list:{'id','code','name','status'} [description]
//  * @return {[type]}            [description]
//  */
// export function projectUpdate(post,list){
// 	return post("v1/project/update", list)
// }

// /**
//  * 项目的列表查询
//  * @param  {[type]} post       [description]
//  * @param  {[type]} list [description]
//  * @return {[type]}            [description]
//  */
// export function projectQuery(post,list){
// 	return post("v1/project/query", list)
// }

// /**
//  * 项目的单条记录查询
//  * @param  {[type]} post       [description]
//  * @param  {[type]} list:{'id'} [description]
//  * @return {[type]}            [description]
//  */
// export function projectGetById(post,list){
// 	return post("v1/project/getById",list)
// }

// /**
//  *     bankAccount  账号接口
//  *
//  * 账号的新增
//  * @param  {[type]} post       [description]
//  * @param  {[type]} list:{'code',name','bankAccountTypeId','bankName','isDefault','status'} [description]
//  * @return {[type]}            [description]
//  */
// export function bankAccountCreate(post,list){
// 	return post("v1/bankAccount/create", list)
// }

// /**
//  * 账号的删除
//  * @param  {[type]} post       [description]
//  * @param  {[type]} list:{'orgId','id'} [description]
//  * @return {[type]}            [description]
//  */
// export function bankAccountDelete(post,list){
// 	return post("v1/bankAccount/delete", list)
// }

// /**
//  * 账号的修改
//  * @param  {[type]} post       [description]
//  * @param  {[type]} list:{'id','code','name','bankAccountTypeId','bankName','isDefault','status'} [description]
//  * @return {[type]}            [description]
//  */
// export function bankAccountUpdate(post,list){
// 	return post("v1/bankAccount/update", list)
// }

// /**
//  * 账号的列表查询
//  * @param  {[type]} post       [description]
//  * @param  {[type]} list [description]
//  * @return {[type]}            [description]
//  */
// export function bankAccountQuery(post,list){
// 	return post("v1/bankAccount/query", list)
// }

// /**
//  * 账号的单条记录查询
//  * @param  {[type]} post       [description]
//  * @param  {[type]} list [description]
//  * @return {[type]}            [description]
//  */
// export function bankAccountGetById(post,list){
// 	return post("v1/bankAccount/getById",list)
// }

// /**
//  * 根据账户类型 id 列表查询账户信息
//  * @param  {[type]} post               post
//  * @param  {[type]} bankAccountTypeIds 账户类型 id 列表，98：现金，99：银行等，具体信息参考账户类型枚举值 bankAccountType
//  * @return {[type]}                    账户信息列表
//  */
// export function queryBankAccountByType(post, bankAccountTypeIds){
// 	let params = {
// 		bankAccountTypeIds: bankAccountTypeIds,
// 		status: true
// 	}
// 	return post('/v1/bankAccount/queryBankAccountByType', params)
// }

// /**
//  * 基础档案查询
//  * 部门、人员、客户、供应商、存货、项目、银行账号、币种
//  * @param  {[type]} post       [description]
//  * @param  {[type]} list [description]
//  * @return {[type]}            [description]
//  */
// export function baseArchiveQuery(post, objParam){
// 	return post("/v1/baseArchive/query", objParam)
// }

// /**
//  * 基础档案自动创建编码
//  * 部门、人员、客户、供应商、存货、项目、银行账号、币种
//  * @param  {[type]} post       [description]
//  * @param  {[type]} customer/supplier/project/inventory/bankAccount/unit/currency 请注意不是对象，只是一个字符串  [description]
//  * @return {[type]}            [description]
//  */
// export function getAutoCode(post, string){
// 	return post("/v1/baseArchive/getAutoCode", string)
// }
// /*校验投资人*/
// export function checkInvestorCode(post,list){
// 	return post("/v1/inventory/checkInvestorCode", list)
// }
// /*投资人和被投资人自动创建编码*/
// export function getInvestorCode(post,list){
// 	return post("/v1/inventory/getInvestorCode", list)
// }
// /*流水帐创建投资人*/
// export function createByInvestor(post,list){
// 	return post("/v1/account/createByInvestor", list)
// }
// /*查询投资人列表*/
// export function investorQuery(post,option={mtype:1}) {
// 	return post('/v1/inventory/queryInvestorCode',option)
// }
