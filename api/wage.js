// 工资单列表查询接口
export function querydetail(post, orgId, year, month){
	return post('/v1/wage/querydetail',{'orgId':orgId,'year':year,'month':month})
}
// 工资单管理列表查询接口
export function querylist(post, orgId, year, month, currentPage, pageSize){
	return post('/v1/wage/querylist',{'orgId':orgId,'year':year,'month':month,'page':{'pageSize':pageSize,'currentPage':currentPage}})
}
// 生成凭证接口
export function generateDoc(post, id){
	return post('/v1/wage/doc/generate',{'id':id})
}
// // 工资单模板excel导出接口
// export function exportTemplate(post,orgId,fileName){
// 	return post('/v1/wage/excel/exporttemplate',{'orgId':orgId,'fileName':fileName})
// }
// // 工资单导出个税申报模板接口
// export function exportIncomeTax(post,wage,download){
// 	return post('/v1/wage/excel/exportincometax',{'wage':wage,'download':download})
// }

// 计提生成凭证接口
export function accrued(post,id,year,month){
	return post('/v1/wage/doc/accrued',{'id':id,'year':year,'month':month})
}

// 计提生成凭证接口
export function query(post,id,year,month){
	return post('/v1/wage/doc/query',{'id':id,'year':year,'month':month})
}

// 生成缴纳公积金凭证接口
export function payhousingfund(post,id,year,month,payHousingFundAccount,payAccountTypeId){
	return post('/v1/wage/doc/payhousingfund',{'id':id,'year':year,'month':month,'payHousingFundAccount':payHousingFundAccount,'payAccountTypeId':payAccountTypeId})
}

// 生成缴纳个税凭证接口
export function payincometax(post,id,year,month,payIncomeTaxAccount,payAccountTypeId){
	return post('/v1/wage/doc/payincometax',{'id':id,'year':year,'month':month,'payIncomeTaxAccount':payIncomeTaxAccount,'payAccountTypeId':payAccountTypeId})
}

// 生成缴纳社保凭证接口
export function payinsurance(post,id,year,month,payInsuranceAccount,payAccountTypeId){
	return post('/v1/wage/doc/payinsurance',{'id':id,'year':year,'month':month,'payInsuranceAccount':payInsuranceAccount,'payAccountTypeId':payAccountTypeId})
}

// 生成发放工资凭证接口
export function paywage(post,id,year,month,payWagesAccount,payAccountTypeId){
	return post('/v1/wage/doc/paywage',{'id':id,'year':year,'month':month,'payWagesAccount':payWagesAccount,'payAccountTypeId':payAccountTypeId})
}

// 根据上一个界面的wageId获取工资单列表
export function queryWageDetail(post,id,orgid){
	return post('/v1/wage/queryWageDetail',{'id':id,'orgId':orgid})
}
// 导出模板接口
export function exporttemplate(post,year,month,filename){
	return post('/v1/wage/excel/exporttemplate',{year,month,filename})
}
// 导出模板接口
export function exportWage(post,year,month,filename){
	return post('/v1/wage/excel/exportWage',{year,month,filename})
}
// xia zai ge shui 模板接口
export function exportincometax(post,wageId,filename,download){
	return post('/v1/wage/excel/exportincometax',{wageId,filename,download})
}

// 导入模板出错下载文件接口
export function excelDownload(post,filename,newfilename){
	return post('/v1/wage/excel/download',{filename,newfilename})
}

// 导入模板出错下载文件接口
export function wageDelete(post,year,month){
	return post('/v1/wage/delete',{'year':year,'month':month})
}