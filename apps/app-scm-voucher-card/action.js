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
        const response = await this.webapi.deliveryOrder.init({ id: this.component.props.deliveryOrderId })
        this.injections.reduce('load', response)
    }

    prev = async () => {
        const id = this.metaAction.gf('data.form.id')
        const response = await this.webapi.deliveryOrder.prev(id)
        if (response) {
            this.injections.reduce('setForm', response)
        }
    }

    next = async () => {
        const id = this.metaAction.gf('data.form.id')
        const response = await this.webapi.deliveryOrder.next(id)
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
            const response = await this.webapi.deliveryOrder.del({ id })
            this.metaAction.toast('success', '删除单据成功')
            this.injections.reduce('setForm', response)
        }
    }

    audit = async () => {
        const id = this.metaAction.gf('data.form.id')
        if (!id)
            return

        const response = await this.webapi.deliveryOrder.audit({ id })
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
            const response = await this.webapi.deliveryOrder.update(form)
            if (response) {
                this.metaAction.toast('success', '保存单据成功')
                this.injections.reduce('setForm', response)
            }
        }
        else {
            const response = await this.webapi.deliveryOrder.create(form)
            if (response) {
                this.metaAction.toast('success', '保存单据成功')
                this.injections.reduce('setForm', response)
            }
        }
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
        const response = await this.webapi.customer.query()
        this.metaAction.sf('data.other.customers', fromJS(response))
    }

    departmentFocus = async () => {
        const response = await this.webapi.department.query()
        this.metaAction.sf('data.other.department', fromJS(response))
    }

    personFocus = async () => {
        const response = await this.webapi.person.query()
        this.metaAction.sf('data.other.person', fromJS(response))
    }

    projectFocus = async () => {
        const response = await this.webapi.project.query()
        this.metaAction.sf('data.other.project', fromJS(response))
    }

    warehouseFocus = async () => {
        const response = await this.webapi.warehouse.query()
        this.metaAction.sf('data.other.warehouses', fromJS(response))
    }

    ticketTypeFocus = async () => {
        const response = await this.webapi.ticketType.query()
        this.metaAction.sf('data.other.ticketTypes', fromJS(response))
    }

    stockFocus = async () => {
        const response = await this.webapi.stock.query()
        this.metaAction.sf('data.other.stocks', fromJS(response))
    }

    taxRateFocus = async () => {
        const response = await this.webapi.taxRate.query()
        this.metaAction.sf('data.other.taxRates', fromJS(response))
    }

    settlementModeFocus = async () => {
        const response = await this.webapi.settlementMode.query()
        this.metaAction.sf('data.other.settlementModes', fromJS(response))
    }

    accountFocus = async () => {
        const response = await this.webapi.assetAccount.query()
        this.metaAction.sf('data.other.assetAccounts', fromJS(response))
    }




    calc = (rowIndex, fieldName, rowData, params) => (v) => {
        this.injections.reduce('calc', rowIndex, fieldName, rowData, { v, ...params })
    }

    numberFormat = (number, decimals, isFocus = false) => {
        return this.voucherAction.numberFormat(number, decimals, isFocus = false)
    }

    sumAmount = (details) => {
        return this.voucherAction.numberFormat(this.sum(details, (a, b) => a + b.amount), 2)
    }

    sumTax = (details) => {
        return this.voucherAction.numberFormat(this.sum(details, (a, b) => a + b.tax), 2)
    }

    sumPriceTaxTotal = (details) => {
        return this.voucherAction.numberFormat(this.sum(details, (a, b) => a + b.priceTaxTotal), 2)
    }

    calcBalance = (data) => {
        const priceTaxTotal = this.sum(data.form.details, (a, b) => a + b.priceTaxTotal),
            settlementTotal = this.sum(data.form.settlements, (a, b) => a + b.settlementAmount),
            advanceAmount = data.form.useAdvance ? utils.number.round(data.form.advanceAmount, 2) : 0

        return this.voucherAction.numberFormat(priceTaxTotal - settlementTotal - advanceAmount, 2)
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