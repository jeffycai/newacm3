// 收款单相关接口

/**
 * 新增收款单
 * @param  {object} post post
 * @param  {object} data 要新增的收款单
 * @return {object}      新增后的收款单
 */
export function create(post, data) {
    return post("/v1/receive/create", data)
}

/**
 * 删除收款单
 * @param  {object} post post
 * @param  {object} data 要删除的收款单
 * @return {object}      收款单
 */
export function del(post, data) {
    return post("/v1/receive/delete", data)
}

/**
 * 批量删除收款单
 * @param  {object} post post
 * @param  {Array}  data 要删除的收款单
 * @return {object}      删除结果
 */
export function deleteBatch(post, data) {
    return post('/v1/receive/deleteBatch', data)
}

/**
 * 修改收款单
 * @param  {object} post post
 * @param  {object} data 收款单
 * @return {object}      修改后的收款单
 */
export function update(post, data) {
    return post('/v1/receive/update', data)
}

/**
 * 通过 id 获取收款单
 * @param  {object} post post
 * @param  {Number} id   收款单 id
 * @return {object}      收款单信息
 */
export function queryById(post, id) {
    return post("/v1/receive/queryById", { id })
}

/**
 * 获取上一张收款单
 * @param  {object} post post
 * @param  {string} code 单据编号
 * @return {object}      收款单信息
 */
export function prev(post, code) {
    return post('v1/receive/previous', { code })
}

/**
 * 获取下一张收款单
 * @param  {object} post post
 * @param  {string} code 单据编号
 * @return {object}      收款单信息
 */
export function next(post, code) {
    return post('v1/receive/next', { code })
}



/**
 * 获取对应收款类型的编辑配置信息
 * @param  {object} post           post
 * @param  {Number} businessTypeId 收款类型 id
 * @return {object}                编辑配置信息
 */
export function getCardControl(post, businessTypeId) {
    return post('/v1/web/receive/getCardControl', { businessTypeId })
}
