// 报税管理列表查询接口
export function getOrgInfoList(post){
	return post('/v1/web/tax/getOrgInfoList')
}

// 增值税申报获取年份列表，当前年月接口
export function getYears(post){
	return post('/v1/web/tax/getYears')
}

// 增值税申报列表按年月查询接口
export function init(post,formYear,quarter){
	return post('/v1/web/tax/init',{'formYear':formYear,'quarter':quarter})
}

// 计算申报表接口
export function calForm(post,formYear,quarter,type, isReCalc){
	return post('/v1/web/tax/calForm',{'year':formYear,'quarter':quarter,'type':type, 'isReCalc': isReCalc})
}

// 小规模初始化接口
export function calFormForInit(post, formYear, quarter, isReCalc){
	return post('/v1/web/tax/calFormForInit',{'year':formYear, 'quarter':quarter, 'isReCalc':isReCalc})
}

// 初始数据界面查询数据接口
export function getOrgInitData(post){
	return post('/v1/web/tax/getOrgInitData')
}

// 初始化税设备抵扣接口
export function initTaxDeductibleEquipment(post, formYear,quarter){
	return post('/v1/web/tax/initTaxDeductibleEquipment',{'formYear':formYear,'quarter':quarter})
}

// 更新本期结转余额接口
export function updateCurrentBalance(post, formYear,quarter,currentBalance){
	return post('/v1/web/tax/initTaxDeductibleEquipment',{'formYear':formYear,'quarter':quarter,'currentBalance':currentBalance})
}

// 取未开票数据接口
export function getNoInvoiceLedger(post, formYear,quarter){
	return post('/v1/web/tax/getNoInvoiceLedger',{'formYear':formYear,'quarter':quarter})
}

// 更新未开票数据接口
export function updateNoInvoiceLedger(post, formYear,quarter,goodsUuRevenue,serviceUuRevenue,a1,a2){
	return post('/v1/web/tax/updateNoInvoiceLedger',{'formYear':formYear,'quarter':quarter,'goodsUuRevenue':goodsUuRevenue,'serviceUuRevenue':serviceUuRevenue,'a1':a1,'a2':a2})
}

// 计算申报表接口
export function calIncomeTaxPreAForm(post, formYear,quarter,type){
	return post('/v1/web/tax/calIncomeTaxPreAForm',{'formYear':formYear,'quarter':quarter,'type':type})
}

// 计算申报表接口B
export function calIncomeTaxPreBForm(post, formYear,quarter){
	return post('/v1/web/tax/calIncomeTaxPreBForm',{'formYear':formYear,'quarter':quarter})
}

// 修改A类表附表值传给后台接口
export function updateIncomeTaxPreAFormField(post, year, quarter, type, name, value){
	return post('/v1/web/tax/updateIncomeTaxPreAFormField',{'year':year,'quarter':quarter,'type':type,'name':name,'value':value})
}

// 修改A类表附表值传给后台接口
export function updateIncomeTaxPreBFormField(post, year, quarter, type, name, value){
	return post('/v1/web/tax/updateIncomeTaxPreBFormField',{'year':year,'quarter':quarter,'type':type,'name':name,'value':value})
}

// 修改增值税申报表附表期初最后一行给后台接口
export function currentBalance(post,list){
	return post('/v1/web/tax/currentBalance',list)
}

// 修改增值税申报表给后台接口
export function insertCalForm(post,list){
	return post('/v1/web/tax/insertCalForm',list)
}

// 修改增值税申报表给后台接口 修改后
export function updateVatSmallFormField(post,list){
	return post('/v1/web/tax/updateVatSmallFormField',list)
}

// zengzhishui download
export function download(post,formYear,quarter){
	return post('/v1/web/tax/download',{formYear,quarter})
}
// 小规模增值税申报表 打印
export function print(post,formYear,quarter){
	return post('/v1/web/tax/print',{formYear,quarter})
}
// A类表 打印
export function printIncomeTaxPreAForm(post,formYear,quarter){
	return post('/v1/web/tax/printIncomeTaxPreAForm',{formYear,quarter})
}
// B类表 打印
export function printIncomeTaxPreBForm(post,formYear,quarter){
	return post('/v1/web/tax/printIncomeTaxPreBForm',{formYear,quarter})
}

// zengzhishui qichu download
export function template(post){
	return post('/v1/web/tax/template')
}

// A lei download
export function downloadIncomeTaxPreAForm(post,formYear,quarter){
	return post('/v1/web/tax/downloadIncomeTaxPreAForm',{formYear,quarter})
}
// B lei download
export function downloadIncomeTaxPreBForm(post,formYear,quarter){
	return post('/v1/web/tax/downloadIncomeTaxPreBForm',{formYear,quarter})
}

// 存档接口
export function saveVatSmall(post, formYear,quarter){
	return post('/v1/web/tax/saveVatSmall',{'year':formYear,'quarter':quarter})
}
// 取消存档接口
export function cacelSaveVatSmall(post, formYear,quarter){
	return post('/v1/web/tax/cacelSaveVatSmall',{'year':formYear,'quarter':quarter})
}

// 小规模纳税人 批量计算
export function batchUpdateVatSmallFormField(post,list){
	return post('/v1/web/tax/batchUpdateVatSmallFormField',list)
}
// 批量更新A表接口 批量计算
export function batchUpdateIncomeTaxPreAFormField(post,list){
	return post('/v1/web/tax/batchUpdateIncomeTaxPreAFormField',list)
}
// 批量更新B表接口 批量计算
export function batchUpdateIncomeTaxPreBFormField(post,list){
	return post('/v1/web/tax/batchUpdateIncomeTaxPreBFormField',list)
}

//小规模分享 生成字符串
// export function share(post,list) {
// 	return post('/v1/web/tax/taxDeclaration/share',list)
// }
export function share(post,list) {
	return post('/v1/web/tax/taxDeclaration/share',list)
}
//小规模分享 获得增值税申报分享数据
export function getShareData(post,list) {
	// return post('/v1/web/tax/taxDeclaration/getShareData',list)
	return post('/v1/web/tax/taxDeclaration/getShareData',{})
}
//小规模分享 发送分享邮件
export function sendShareMail(post,list) {
	return post('/v1/web/tax/taxDeclaration/sendShareMail',list)
}
//小规模分享 分享图片
export function getPicture(post,list) {
	return post('/v1/web/tax/getPicture',{})
}
//2017.3.10
// A类 存档接口
export function saveIncomeTaxPreA(post, formYear,quarter){
	return post('/v1/web/tax/saveIncomeTaxPreA',{'year':formYear,'quarter':quarter})
}
// A类 取消存档接口
export function cacelIncomeTaxPreA(post, formYear,quarter){
	return post('/v1/web/tax/cacelIncomeTaxPreA',{'year':formYear,'quarter':quarter})
}
// B类 存档接口
export function saveIncomeTaxPreB(post, formYear,quarter){
	return post('/v1/web/tax/saveIncomeTaxPreB',{'year':formYear,'quarter':quarter})
}
// B类 取消存档接口
export function cacelIncomeTaxPreB(post, formYear,quarter){
	return post('/v1/web/tax/cacelIncomeTaxPreB',{'year':formYear,'quarter':quarter})
}
// 小规模取得减免代码接口，包括减税、免税项目代码
export function getVatRPCode(post){
	return post('/v1/web/tax/getVatRPCode',{})
}
// 小规模取得减免代码接口，减税、免税代码分列为不同的对象
export function getVatRPCodeWithType(post){
	return post('/v1/web/tax/getVatRPCodeWithType', {})
}

//*****************一般纳税人增值税申报表接口START*********************
// 一般纳税人申报表初始化接口
export function initGeneral(post){
	return post('/v1/web/tax/vat/general/init')
}

// 一般纳税人增值税申报表单个表获取数据
// isReduce: 是否减税（减:1，免:0）
export function general(post, formYear, period, type, isYearMonChange){
	return post('/v1/web/tax/vat/general/calForm',{'year': formYear,'period': period,'type': type, 'isYearMonChange': isYearMonChange ? isYearMonChange : false})
}

// 批量更新一般纳税人增值税申报表
export function batchUpdateField(post, list){
	return post('/v1/web/tax/vat/general/batchUpdateField', list)
}

// 一般纳税人增值税申报表已申报接口
export function generalDeclare(post, taxForm){
	return post('/v1/web/tax/vat/general/declare', taxForm)
}

// 一般纳税人增值税申报表取消申报接口
export function generalCancelDeclare(post, taxForm){
	return post('/v1/web/tax/vat/general/cancelDeclare', taxForm)
}

// 一般纳税人增值税申报表打印
export function generalPrint(post, formYear, period){
	return post('/v1/web/tax/vat/general/print',{ formYear, period })
}

// 一般纳税人增值税申报表导出
export function generalDownload(post, formYear, period){
	return post('/v1/web/tax/vat/general/download',{ formYear, period })
}

// 一般纳税人增值税申报表获取期初数据
export function getInitData(post){
	return post('/v1/web/tax/vat/general/getInitData', {})
}

// 一般纳税人增值税申报表保存期初数据
export function saveInitData(post, list){
	return post('/v1/web/tax/vat/general/saveInitData', list)
}

// 一般纳税人增值税申报表期初录入模板下载
export function downloadTemplate(post){
	return post('/v1/web/tax/vat/general/downloadTemplate', {})
}

// 一般纳税人税负分析表获取相应项目代码的期初余额
export function getBeginBalance(post, formYear, period, value){
	return post('/v1/web/tax/vat/general/getBeginBalance', { 'year': formYear, 'period': period, 'value': value })
}

// 一般纳税人申报表分享功能
export function generalShare(post, year, period){
	return post('/v1/web/tax/vat/general/share', { year, period })
}

//小规模分享 发送分享邮件
export function generalSendShareMail(post, shareData) {
	return post('/v1/web/tax/vat/general/sendShareMail', shareData)
}
//*****************一般纳税人增值税申报表接口END***********************


/**
 * 保存数据接口
 * {
    "reportTypeId": 1, -- 小规模增值税 1；所得税A类预缴 2；一般纳税人增值税 3
    "yearBegin": 2017,
    "periodBegin": 1,
    "yearEnd": 2017,
    "periodEnd": 7
}
 */
export function saveReportData(post,list){
    return post('/v1/web/tax/saveReportData',list)
}

/**
 * 对比数据接口
 * {
    "reportTypeId": 1, -- 小规模增值税 1；所得税A类预缴 2；一般纳税人增值税 3
    "yearBegin": 2017,
    "periodBegin": 1,
    "yearEnd": 2017,
    "periodEnd": 7
}
 */
export function checkReportData(post,list){
    return post('/v1/web/tax/checkReportData',list)
}

//*****************城建等附加税申报表接口START***********************
export function extraTaxInit(post, shareData) {
	return post('/v1/web/surtax/init', shareData)
}

export function extraTaxQuery(post, year, period) {
	return post('/v1/web/surtax/calFormForPeriod', {year, period})
}
//*****************城建等附加税申报表接口END***********************
