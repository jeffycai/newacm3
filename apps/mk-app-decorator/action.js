import React from 'react'
import utils from 'mk-utils'
import config from './config'
import Immutable, { fromJS, Map, List } from 'immutable'

export default class action {

    constructor(option) {
        this.metaAction = option.metaAction
        this.voucherAction = option.voucherAction
    }

    onInit = ({ component, injections }) => {
        this.component = component
        this.injections = injections

        this.config = config.current
        this.webapi = this.config.webapi
    }

    fieldChange = async (fieldPath, value, checkFn) => {
        await this.check([{ path: fieldPath, value }], checkFn, true)
    }

    setting = async (dtoProp, isVoucher) => {
        if (!dtoProp) return
        const ret = await this.metaAction.modal('show', {
            title: '设置',
            width: 700,
            children: this.metaAction.loadApp('mk-app-setting', {
                store: this.component.props.store,
                dtoProp,
                isVoucher
            })
        })
        if (ret) {
            return ret
            //
        }
    }

    addCustomer = async (field) => {
        const ret = await this.metaAction.modal('show', {
            title: '新增客户',
            width: 400,
            children: this.metaAction.loadApp(
                'mk-app-card-customer', {
                    store: this.component.props.store
                }
            )
        })
        if (ret) {
            this.metaAction.sfs({
                [field]: fromJS(ret)
            })

        }
    }

    getCustomer = async (params) => {
        let list = {
            "isContentEmpty": false,
            "status": true,
            "notNeedPage": true,
            "page": {
                "currentPage": 1,
                "pageSize": 50
            }
        }
        if (!params) {
            list = Object.assign(list, params)

        }

        const response = await this.webapi.basicFiles.consumerQuery.query(list)
        if (response) {
            this.metaAction.sf('data.other.customer', fromJS(response.dataList))
        }
    }

    getDepartment = async (params) => {
        if (!params) {

        }

        const response = await this.webapi.dept.getEndNodeDepartByOrgId.query('')
        if (response) {
            this.metaAction.sf('data.other.department', fromJS(response))
        }
    }

    getPerson = async (params) => {
        if (!params) params = {}
        if (params.deptId)
            param = { departmentId: deptId }

        const response = await this.webapi.person.getPersonDeptList.query(params)

        if (response) {
            this.metaAction.sf('data.other.person', fromJS(response))
        }
    }

    getProject = async (params) => {
        if (!params) {
            // params = {}
            params = { notNeedPage: true, status: 1 }
        }
        const response = await this.webapi.basicFiles.projectQuery.query(params)

        if (response && response.dataList) {
            this.metaAction.sf('data.other.project', fromJS(response.dataList))
        }
    }

    getInventory = async (params) => {
        let invParam = { status: true, notNeedPage: true }
        if (params && params.voucherTypeId) {
            invParam.voucherTypeId = params.voucherTypeId
        }
        const response = await this.webapi.receipt.getInventorys.query(invParam)
        if (response && response.dataList) {
            this.metaAction.sf('data.other.inventory', fromJS(response.dataList))
        }
    }

    getTaxRate = async (params) => {

    }

    getBankAccount = async (params) => {
        if (!params) {
            params = {
                bankAccountTypeIds: [98, 99, 101, 100, 152],
                status: true
            }
        }
        else {
            params = {
                status: true,
                bankAccountTypeIds: params.bankAccountTypeIds
            }
        }
        const response = await this.webapi.basicFiles.queryBankAccountByType.query(params)

        if (response) {
            this.metaAction.sf('data.other.bankAccount', fromJS(response))
        }
    }



    addAssets = async (field) => {
        const ret = await this.metaAction.modal('show', {
            title: '新增资产',
            children: this.metaAction.loadApp(
                'mk-app-card-customer', {
                    store: this.component.props.store
                }
            )
        })

        if (ret) {

        }
    }

    addDepartment = async (field) => {
        const ret = await this.metaAction.modal('show', {
            title: '新增部门',
            width: 400,
            children: this.metaAction.loadApp(
                'mk-app-card-department', {
                    store: this.component.props.store
                }
            )
        })

        if (ret) {
            this.metaAction.sfs({
                [field]: fromJS(ret)
            })
        }
    }

    addPerson = async (field) => {
        const ret = await this.metaAction.modal('show', {
            title: '新增业务员',
            width: 720,
            children: this.metaAction.loadApp(
                'mk-app-card-person', {
                    store: this.component.props.store
                }
            )
        })

        if (ret) {
            this.metaAction.sfs({
                [field]: fromJS(ret)
            })
        }
    }

    addProject = async (field) => {
        const ret = await this.metaAction.modal('show', {
            title: '新增项目',
            width: 400,
            children: this.metaAction.loadApp(
                'mk-app-card-project', {
                    store: this.component.props.store
                }
            )
        })

        if (ret) {
            this.metaAction.sfs({
                [field]: fromJS(ret)
            })
        }
    }


    addInventory = async () => {
        const ret = await this.metaAction.modal('show', {
            title: '新增存货',
            children: this.metaAction.loadApp(
                'mk-app-card-inventory', {
                    store: this.component.props.store
                }
            )
        })

        if (ret) {

        }
    }

    calc = (fieldName, rowIndex, rowData, params) => {
        let v = params.value
        if (fieldName === 'price') {
            this.priceChange(rowIndex, rowData, v)
        }
        else if (fieldName === 'amount') {
            this.amountChange(rowIndex, rowData, v)
        }
        else if (fieldName === 'quantity') {
            this.quantityChange(rowIndex, rowData, v)
        }
        else if (fieldName === 'taxRate') {
            this.taxRateChange(rowIndex, rowData, v)
        }
        else if (fieldName === 'tax') {
            this.taxChange(rowIndex, rowData, v)
        }
        else if (fieldName === 'amountWithTax') {
            this.amountWithTaxChange(rowIndex, rowData, v)
        }

    }

    priceChange = (rowIndex, rowData, v) => {
        const price = utils.number.round(v, 2),
            quantity = utils.number.round(rowData.quantity, 2),
            amount = utils.number.round(price * quantity, 2),
            tax = utils.number.round(amount * (rowData.tax ? rowData.tax.id : 0) / 100, 2),
            amountWithTax = utils.number.round(amount + tax, 2)

        this.metaAction.sfs({
            [`data.form.details.${rowIndex}.price`]: price,
            [`data.form.details.${rowIndex}.amount`]: amount,
            [`data.form.details.${rowIndex}.tax`]: tax,
            [`data.form.details.${rowIndex}.amountWithTax`]: amountWithTax,
        })
    }

    amountChange = (rowIndex, rowData, v) => {
        const quantity = utils.number.round(rowData.quantity, 2),
            amount = utils.number.round(v, 2),
            price = utils.number.round(rowData.price, 2),
            tax = utils.number.round(rowData.tax, 2),
            taxRate = utils.number.round(rowData.taxRate.taxRate, 2),
            amountWithTax = utils.number.round(rowData.amountWithTax, 2)

        if (tax != undefined && taxRate >= 0) {
            let _tax = amount * taxRate
            let _amountWithTax = amount + _tax,
                _price = price
            if (quantity != 0) {
                _price = utils.number.round(amount / quantity,2)
            }

            this.metaAction.sfs({
                [`data.form.details.${rowIndex}.amount`]: v,
                [`data.form.details.${rowIndex}.tax`]: _tax,
                [`data.form.details.${rowIndex}.amountWithTax`]: _amountWithTax,
                [`data.form.details.${rowIndex}.price`]: _price

            })

        }

    }

    quantityChange = (rowIndex, rowData, v) => {
        const quantity = utils.number.round(v, 2),
            price = utils.number.round(rowData.price, 2),
            amount = utils.number.round(price * quantity, 2),
            tax = utils.number.round(amount * (rowData.tax ? rowData.tax.id : 0) / 100, 2),
            amountWithTax = utils.number.round(amount + tax, 2)

        this.metaAction.sfs({
            [`data.form.details.${rowIndex}.quantity`]: quantity,
            [`data.form.details.${rowIndex}.amount`]: amount,
            [`data.form.details.${rowIndex}.tax`]: tax,
            [`data.form.details.${rowIndex}.amountWithTax`]: amountWithTax,
        })

    }

    taxRateChange = (rowIndex, rowData, v) => {
        let taxRates = this.metaAction.gf('data.other.taxRate').toJS()
        if (taxRates) {
            const hit = taxRates.find(o => o.id == v)

            if (!hit)
                return

            const amount = rowData.amount,
                tax = utils.number.round(amount * hit.id / 100, 2),
                amountWithTax = utils.number.round(amount + tax, 2)

            this.metaAction.sfs({
                [`data.form.details.${rowIndex}.taxRate`]: fromJS(hit),
                [`data.form.details.${rowIndex}.tax`]: fromJS(tax),
                [`data.form.details.${rowIndex}.amountWithTax`]: amountWithTax,
            })
        }

    }

    taxChange = (rowIndex, rowData, v) => {
        this.metaAction.sfs({
            [`data.form.details.${rowIndex}.tax`]: v
        })
    }
    amountWithTaxChange = (rowIndex, rowData, v) => {
        this.metaAction.sfs({
            [`data.form.details.${rowIndex}.amountWithTax`]: v
        })
    }

    sumColumn = (col) => {
        let currentSumCol = col,
            details = this.metaAction.gf('data.form.details')
        return this.numberFormat(this.sum(details, (a, b) => a + b.get(`${currentSumCol}`)), 2)
    }


    sum = (details, fn) => {
        if (!details || details.length == 0)
            return this.numberFormat(0, 2)

        return details.reduce((a, b) => {
            let r = fn(a, b)
            return isNaN(r) ? a : r
        }, 0)
    }

    cancel = (params) => {
        if (params) {
            // let isChanged = this.metaAction.gf(params.statusPath)
            // if (isChanged == consts.VOUCHER_STATUS_EDIT || isChanged == consts.VOUCHER_STATUS_ADD) {
            //     if (ma.confirm('放弃', '单据尚未保存，还要离开吗？')) {
            //         //
            //     }
            // }
        }

    }

    checkSave = (form) => {
        var msg = []
        if (!form.customer || !form.customer.id) {
            msg.push('客户不能为空!')
        }

        if (!form.businessDate)
            msg.push('单据日期不能为空!')


        if (!form.invoiceType || !form.invoiceType.enumItemId)
            msg.push('票据类型不能为空!')

        if (!form.details || form.details.length == 0) {
            msg.push('明细不能为空！')
        }

        form.details.forEach((detail, index) => {
            if (!detail.inventory)
                msg.push(`明细第${index + 1}行，存货不能为空！`)
        })

        return msg
    }

    showMsg = (msg) => {
        this.metaAction.toast('error',
            <ul style={{ textAlign: 'left' }}>
                {msg.map(o => <li>{o}</li>)}
            </ul>
        )
    }

    check = async (option, checkFn, needSaveFieldValue) => {
        if (!option || !utils._.isArray(option))
            return

        var checkResults = []

        for (let child of option) {
            let checkResult

            if (checkFn) {
                checkResult = await checkFn({ path: child.path, value: child.value })
            }

            if (checkResult) {
                checkResults.push(checkResult)
            }
        }

        var hasError = false, json = {}
        if (needSaveFieldValue) {
            option.forEach(o => {
                json[o.path] = o.value
            })
        }

        if (checkResults.length > 0) {
            checkResults.forEach(o => {
                json[o.errorPath] = o.message
                if (o.message)
                    hasError = true
            })
        }

        if (json) {
            this.metaAction.sfs(json)
        }
        return !hasError
    }

    numberFormat = (number, decimals, isFocus = false) => {
        if (isFocus === true) return number
        return utils.number.format(number, decimals)
    }
}
