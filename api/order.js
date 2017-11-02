/**
 * Created by lmh on 17/5/31.
 */

/**
 * 立即购买接口
 * @param post
 * @param  "vatTaxpayer":"0",productId = 1000
 * @returns {*}
 */
export function queryOrgList(post, list){
    return post('/v1/order/queryOrgList', list)
}
/*服务商的接口*/
export function getAllFriend(post, list){
    return post('/v1/app/getAll', list)
}
/*新增伙伴接口*/
export function createPartner(post, list){
    return post('/v1/app/createApp', list)
}
/*删除伙伴接口*/
export function deletePartner(post, list){
    return post('/v1/app/deleteApp', list)
}
/*检验伙伴名称是否存在接口*/
export function checkNameIsExists(post, list){
    return post('/v1/app/checkNameIsExists', list)
}

export function updatePartner(post, list) {
	return post('/v1/app/updateApp', list)
}
export function getById(post, list) {
	return post('/v1/app/getById', list)
}
export function orderInit(post,list) {
	return post('/v1/order/init',list)
}

//根据手机查企业名称
export function queryOrgListByMobile(post,list) {
	return post('/v1/order/queryOrgListByMobile',list)
}
//根据产品查产品信息
export function productGetById(post,list) {
	return post('/v1/product/getById',list)
}

export function getSPListByApp(post,list) {
	return post('/v1/order/getSPListByApp',list)
}
/**
 * 
 * 提交订单
 * @param post
 * @param  "orgId": 2468395544938496,
	   	"productId": 1000,
	   "invoice": {
	            "invoiceType": 200000000000050,
	            "content": "1",
	            "title": "发票抬头",
	            "address": "寄送地址",
	            "contact": "收件人",
	            "mobile": "联系方式",
	        }
	   } 
 * @returns {*}
 */
export function create(post, list){
    return post('/v1/order/create', list)
}

/**
 * 	取消订单
 * @param post
 * @param  "id":"2560484866458624",
    		"payStatus":"2"
 * @returns {*}
 */
export function cancel(post, list){
    return post('/v1/order/cancel', list)
}

/**
 * 	完成订单
 * @param post
 * @param  "id":"2560484866458624",
    "payType":"1",
    "payStatus":"0"
 * @returns {*}
 */
export function pay(post, list){
    return post('/v1/order/pay', list)
}

/**
 * 	删除订单
 * @param post
 * @param  "id":"2560484866458624",
 * @returns {*}
 */
export function deleteOrder(post, list){
    return post('/v1/order/delete', list)
}
/**
 * 	删除订单前校验
 * @param post
 * @param  "id":"2560484866458624",
 * @returns {*}
 */
export function deleteTest(post, list){
    return post('/v1/order/deleteTest', list)
}

//更新订单
export function updateOrder(post, list){
    return post('/v1/order/update', list)
}

/**
 * 	我的订单别表&订单管理别表
 * @param post
 * @param   orderType": 0,
	 * "payType":0,
	 * "payStatus":0,
	 * "orgName": 0,
	 * "mobile":0
 * @returns {*}
 */
export function queryOrderList(post, list){
    return post('/v1/order/queryOrderList', list)
}

/**
 * 	订单管理弹出框
 * @param post
 * @param   id
 * @returns {*}
 */
export function queryOrderDetail(post, list){
    return post('/v1/order/queryOrderDetail', list)
}
/**
 * 	订单管理弹出框保存
 * @param post
 * @param    id=1,
	 * "payType":0,
	 * "payStatus":0
	 * endTime = 1991-01-01,
	 * invoiceStatus = 1,
	 * memo = "asd"
 * @returns {*}
 */
export function updateOrderByAdministrator(post, list){
    return post('/v1/order/updateOrderByAdministrator', list)
}

/**
 * 	取时间
 * @param post
 * @param    id=1,
	 * "orgId":0,
	 * "payStatus":0
 * @returns {*}
 */
export function changeStatusToDate(post, list){
    return post('/v1/order/changeStatusToDate', list)
}

/**
 * 	企业管理 创建订单
 * @param post
 * @param    id=1,
	 * "orgId":0,
	 * "payStatus":0
 * @returns {*}
 */
export function getOrgUserById(post, list){
    return post('/v1/org/getOrgUserById', list)
}