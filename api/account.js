/**
 * 会计科目api接口
 */

/**
* 新增科目
* @param  {[type]} post [description]
* @param  {[type]} data 科目信息
* @returns {*}
*/
export function add(post, data){
   return post('/v1/account/create', data)
}

/**
* 修改科目
* @param  {[type]} post [description]
* @param  {[type]} data 科目信息
* @returns {*}
*/
export function update(post, data){
   return post('/v1/account/update', data)
}

/**
* 删除科目
* @param	orgId	组织机构id
* @param	id	  科目id
* @returns {*}
*/
export function del(post, id,ts){
   return post('/v1/account/delete', {id:id,ts:ts})
}

/**
* 查询科目
* @param	orgId	组织机构id
* @param	accountTypeId	  科目类型id(可选)
* @returns {*}
*/
export function query(post, orgId, accountTypeId, isEndNode, status){
   return post('/v1/account/query', {orgId:orgId, accountTypeId:accountTypeId, isEndNode, status})
}

/**
* 按照组织id、科目id查询科目
* @param	orgId	组织机构id
* @param	objAccount	科目对象
* @returns {*}
*/
export function findById(post, objAccount){
   return post('/v1/account/getById', objAccount)
}

/**
* 科目是否已被使用
* @param	id	  科目id
* @returns {*}
*/
export function isUsed(post, id){
   return post('/v1/account/isUsed', {id:id})
}

/**
* 获取最小的凭证日期
* @param 无
* @returns {*}
*/
export function getMinDocVoucherDate(post){
   return post('/v1/journal/getMinDocVoucherDate')
}

/**
* 判断组织有无凭证
* @param 无
* @returns {*}
*/
export function haveDoc(post){
   return post('/v1/journal/haveDoc')
}

/**
* 根据会计准则+行业重新预置科目档案，需要先清除组织的科目期初（高恩接口）和科目档案
* @param 无
* @returns {*}
*/
export function reset(post,accountingStandardsId,industryId){
   return post('/v1/account/reset',{accountingStandardsId:accountingStandardsId,industryId:industryId})
}

/**
* 根据会计准则+行业，提供预置科目预览
* @param 无
* @returns {*}
*/
export function preview(post,accountingStandardsId,industryId){
   return post('/v1/account/preview',{accountingStandardsId:accountingStandardsId,industryId:industryId})
}

/**
* 返回当前服务器时间的年度
* @param 无
* @returns {*}
*/
export function curYear(post){
   return post('/v1/account/curYear',{})
}
