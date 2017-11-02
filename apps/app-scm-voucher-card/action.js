import React from 'react'
import ReactDOM from 'react-dom'
import { action as MetaAction, AppLoader } from 'mk-meta-engine'
import config from './config'
import { Map, fromJS } from 'immutable'
import moment from 'moment'
import utils from 'mk-utils'
import extend from './extend'

import decorator from '../mk-app-decorator/index'


class action {
    constructor(option) {
        this.metaAction = option.metaAction
        this.extendAction = option.extendAction
        this.voucherAction = option.voucherAction
        this.config = config.current
        this.webapi = this.config.webapi
    }

    onInit = ({ component, injections }) => {
        this.extendAction.gridAction.onInit({ component, injections })
        this.voucherAction.onInit({ component, injections })
        this.component = component
        this.injections = injections
        injections.reduce('init')
        this.load()
    }

    load = async () => {
        const payload = {}
        const response = await this.webapi.delivery.init({ id: this.component.props.deliveryId })
        this.injections.reduce('load', response)
    }

    prev = async () => {
        const id = this.metaAction.gf('data.form.id')
        const response = await this.webapi.delivery.prev(id)
        if (response) {
            this.injections.reduce('setForm', response)
        }
    }

    next = async () => {
        const id = this.metaAction.gf('data.form.id')
        const response = await this.webapi.delivery.next(id)
        if (response) {
            this.injections.reduce('setForm', response)
        }
    }

    add = () => {
        this.injections.reduce('setForm')
    }

    del = async () => {
        const id = this.metaAction.gf('data.form.id')
        const ret = await this.metaAction.modal('confirm', {
            title: '删除',
            content: '确认删除?'
        })

        if (ret) {
            const response = await this.webapi.delivery.del({ id })
            this.metaAction.toast('success', '删除单据成功')
            this.injections.reduce('setForm', response)
        }
    }

    audit = async () => {
        const id = this.metaAction.gf('data.form.id')
        if (!id)
            return

        const response = await this.webapi.delivery.audit({ id })
        if (response) {
            this.injections.reduce('setForm', response)
        }
    }

    history = async () => {
        this.component.props.setPortalContent('销货单列表', 'app-scm-voucher-list')
    }

    moreMenuClick = (e) => {
        switch (e.key) {
            case 'del':
                this.del()
                break
            case 'receipt':
                throw '请实现收款功能'
            case 'history':
                this.history()
                break
        }
    }

    save = async () => {


        var form = this.metaAction.gf('data.form').toJS()

        let msg = this.voucherAction.checkSave(form)

        if (msg.length > 0) {
            this.voucherAction.showMsg(msg)
            return
        }

        if (form.id || form.id == 0) {
            const response = await this.webapi.delivery.update(form)
            if (response) {
                this.metaAction.toast('success', '保存更新成功')
                this.injections.reduce('setForm', response)
            }
        }
        else {
            form = this.transForSave(form)
            const response = await this.webapi.delivery.create(form)
            if (response) {
                this.metaAction.toast('success', '保存单据成功')
                this.injections.reduce('setForm', response)
            }
        }
    }

    transForSave = (form) => {
        let ret = {
            "id": form.id,
            "ts": form.ts,
            "deliveryTypeId": form.deliveryTypeId ? form.deliveryTypeId : 132,
            "invoiceNumber": form.invoiceNumber,
            "invoiceCode": form.invoiceCode,
            "customerId": form.customer ? form.customer.id : '',
            "departmentId": form.department ? form.department.id : '',
            "salesPersonId": form.person ? form.person.id : '',
            "projectId": form.project ? form.project.id : '',
            "invoiceTypeId": form.invoiceType ? form.invoiceType.enumDetail.enumItemId : '',
            "bankAccountId": form.bankAccount ? form.bankAccount.id : 4,
            //'totalSettleAmount': 0,
            "businessDate": form.businessDate,
            "creator": form.creator,
            'receiveAmount': form.receiveAmount,
            'preReceiveAmount': form.preReceiveAmount,
            "remark": form.remark,
            enclosures: [],
            "details": []
        }
        // let isEnclosureModify = form.isEnclosureModify || true
        // if (!form.id) {
        //     isEnclosureModify = true//不存在单据ID的时候，附件默认已修改
        // }
        if (form.album && form.album.length > 0) {
            form.album.map(element => {
                ret.enclosures.push({
                    enclosureId: element.id || element.enclosureId,
                    fileType: element.fileType
                })
            })
        }
        let _amountWithTax = 0
        form.details.forEach(row => {
            if (row) {
                if (!row.inventory || !row.inventory.id) return false
                _amountWithTax += row.amountWithTax
                ret.details.push({
                    id: row.id,
                    ts: row.ts,
                    "inventoryId": row.inventory.id,
                    "unitId": row.inventory.unitId,
                    "taxRate": row.taxRate ? row.taxRate.taxRate : 0,
                    "taxRateId": row.taxRate ? row.taxRate.id : '0',
                    "quantity": row.quantity,
                    "price": row.price,
                    "amount": row.amount,
                    "tax": row.tax,
                    "amountWithTax": row.amountWithTax
                })
            }

        })
        //ret.totalSettleAmount = _amountWithTax

        return ret
    }


    saveAndNew = async () => {
        await this.voucherAction.saveAndNew()
    }


    cancel = async () => {
        await this.voucherAction.cancel()
    }


    setting = async () => {
        await this.voucherAction.setting({ "dtoId": 3, "type": 1 })
    }

    addCustomer = async () => {
        await this.voucherAction.addCustomer('data.form.customer')
    }

    addDepartment = async () => {
        await this.voucherAction.addDepartment('data.form.department')
    }

    addProject = async () => {
        await this.voucherAction.addProject('data.form.project')
    }


    addPerson = async () => {
        await this.voucherAction.addPerson('data.form.person')
    }

    customerFocus = async () => {
        await this.voucherAction.getCustomer()
    }

    departmentFocus = async () => {
        await this.voucherAction.getDepartment({ orgId: '' })
    }

    personFocus = async () => {
        await this.voucherAction.getPerson()
    }

    projectFocus = async () => {
        await this.voucherAction.getProject()
    }

    warehouseFocus = async () => {
        const response = await this.webapi.warehouse.query()
        this.metaAction.sf('data.other.warehouses', fromJS(response))
    }

    invoiceTypeFocus = async () => {

    }

    inventoryFocus = async () => {
        await this.voucherAction.getInventory({ voucherTypeId: '137' })
    }

    taxRateFocus = async () => {
        //await this.voucherAction.getTaxRate()
    }

    settlementModeFocus = async () => {
        const response = await this.webapi.settlementMode.query()
        this.metaAction.sf('data.other.settlementModes', fromJS(response))
    }

    bankAccountFocus = async () => {
        const response = await this.webapi.assetAccount.query()
        this.metaAction.sf('data.other.bankAccount', fromJS(response))
    }



    quantityChange = (rowIndex, rowData) => (v) => {
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

    priceChange = (rowIndex, rowData) => (v) => {
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

    amountChange = (rowIndex, rowData) => (v) => {
    }

    taxRateChange = (rowIndex, rowData, taxRates) => (v) => {
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
    calc = (rowIndex, fieldName, rowData, params) => (v) => {
        this.voucherAction.calc()

    }

    quantityFormat = (quantity, decimals, isFocus = false) => {
        return this.voucherAction.numberFormat(quantity, decimals, isFocus = false)
    }

    sumAmount = (details) => {
        return this.voucherAction.numberFormat(this.sum(details, (a, b) => a + b.amount), 2)
    }

    sumTax = (details) => {
        return this.voucherAction.numberFormat(this.sum(details, (a, b) => a + b.tax), 2)
    }

    sumAmountWithTax = (details) => {
        return this.voucherAction.numberFormat(this.sum(details, (a, b) => a + b.amountWithTax), 2)
    }

    calcBalance = (data) => {
        const amountWithTax = this.sum(data.form.details, (a, b) => a + b.amountWithTax),
            settlementTotal = this.sum(data.form.settlements, (a, b) => a + b.settlementAmount),
            advanceAmount = data.form.useAdvance ? utils.number.round(data.form.advanceAmount, 2) : 0

        return this.voucherAction.numberFormat(amountWithTax - settlementTotal - advanceAmount, 2)
    }

    sum(details, fn) {
        if (!details || details.length == 0)
            return this.voucherAction.numberFormat(0, 2)

        return details.reduce((a, b) => {
            let r = fn(a, b)
            return isNaN(r) ? a : r
        }, 0)
    }
}

export default function creator(option) {
    const metaAction = new MetaAction(option),
        extendAction = extend.actionCreator({ ...option, metaAction }),
        voucherAction = decorator.actionCreator({ ...option, metaAction }),
        o = new action({ ...option, metaAction, extendAction, voucherAction }),
        ret = { ...metaAction, ...extendAction.gridAction, ...voucherAction, ...o }

    metaAction.config({ metaHandlers: ret })

    return ret
}