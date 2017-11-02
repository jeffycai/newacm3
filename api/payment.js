
//付款单列表
export function payList(post, list)
{
	return post("/v1/web/payList/query", list)
}

/**
 * 付款单列表打印
 */
export function listprint(post, json)
{
	return post('/v1/web/payList/print', json)
}

/**
 * 付款单列表导出
 */
export function listexport(post, json)
{
	return post('/v1/web/payList/export', json)
}

/**
 * 创建付款单
 * @param  {[type]} post [description]
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
export function create(post, data) {
    return post("/v1/pay/create", data)
}

/**
 * 删除付款单
 * @param  {[type]} post [description]
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
export function del(post, data) {
    return post("/v1/pay/delete", data)
}

//批量删除付款单
export function deleteBatch(post, data) {
    return post('/v1/pay/deleteBatch', data)
}

/**
 * 付款单修改
 * @param  {object} post post
 * @param  {object} data 付款单
 * @return {object}      修改后的付款单
 */
export function update(post, data) {
    return post('/v1/pay/update', data)
}

/**
 * 通过id获取付款单
 * @param  {[type]} post [description]
 * @param  {[type]} id   [description]
 * @return {[type]}      [description]
 */
export function queryById(post, id) {
    return post("/v1/pay/queryById", { id })
}


/**
 * 上一页
 * @param  {[type]}
 * @param  {[type]}
 * @param  {[type]}
 * @return {[type]}
 */
export function prev(post, code) {
    return post('v1/pay/previous', { code })
}

/**
 * 下一页
 * @param  {[type]}
 * @param  {[type]}
 * @param  {[type]}
 * @return {Function}
 */
export function next(post, code) {
    return post('v1/pay/next', { code })
}
