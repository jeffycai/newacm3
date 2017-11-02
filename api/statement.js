//账户列表查询
export function getAccountList(post, bankAccountTypeId) {
	let data = {
		"isContentCash": false,
		"status":true,
		"notNeedPage": true
	}
	
	if(bankAccountTypeId) data.bankAccountTypeId = bankAccountTypeId
	
	return post('/v1/bankAccount/query', data)
}

//对账单列表查询
export function queryList(post, data) {
	return post('/v1/acmBankReconciliatio/queryList', data)
}

//对账单导入
export function imports(post, data) {
	return post('/v1/brImport/import', data)
}

//下载通用模版
export function exportTemplate(post) {
	return post('/v1/brImport/downloadTemplate')
}

//打印
export function printList(post, data) {
	return post('/v1/acmBankReconciliatio/printList', data)
}

//导出
export function exportList(post, data) {
	return post('/v1/acmBankReconciliatio/exportList', data)
}

//删除
export function batchDelete(post, data) {
	return post('/v1/acmBankReconciliatio/batchDelete', data)
}
