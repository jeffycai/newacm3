import { Map, List, fromJS } from 'immutable'
import { reducer as MetaReducer } from 'mk-meta-engine'
import config from './config'
import { getInitState, blankVoucherItem } from './data'
import moment from 'moment'
import utils from 'mk-utils'
import extend from './extend'
import consts from './consts'
import decorator from '../mk-app-decorator/index'

class reducer {
    constructor(option) {
        this.metaReducer = option.metaReducer
        this.config = config.current
        this.voucherReducer = option.voucherReducer
    }

    init = (state, option) => {
        return this.metaReducer.init(state, getInitState())
    }

    load = (state, response) => {
        if (!response) {
            return this.metaReducer.sf(state, 'data.form', fromJS(getInitState().data.form))
        }
        let parsed = this.parseResponse(response)
        state = this.metaReducer.sf(state, 'data.other.isChanged', false)
        state = this.metaReducer.sf(state, 'data.form', fromJS(parsed.form))

        if (parsed.other.columnSetting) {
            //上张、下张等操作时不更新columnsetting
            state = this.metaReducer.sf(state, 'data.other.columnSetting', fromJS(this.parseResponseBySet(parsed.other.columnSetting)))
        }
        if (parsed.other.invoiceType) {
            state = this.metaReducer.sf(state, 'data.other.invoiceType', fromJS(parsed.other.invoiceType))
        }
        if (parsed.other.taxRate) {
            state = this.metaReducer.sf(state, 'data.other.taxRate', fromJS(parsed.other.taxRate))
        }

        if (parsed.other.customer) {
            state = this.metaReducer.sf(state, 'data.other.customer', fromJS(parsed.other.customer))
        }

        if (parsed.form.status == consts.status.VOUCHER_STATUS_AUDITED || parsed.form.settleStatus == consts.status.VOUCHER_STATUS_WRITEOFF) {
        }

        return state
    }

    calc = (v) => (state, rowIndex, fieldName, rowData, params) => {
        debugger
        //this.voucherReducer.calc(state, rowIndex, fieldName, rowData, params)
    }

    parseResponseBySet = (response) => {
        let data = []
        data = response[0].details.map(o => {
            return {
                propertyName: o.propertyName.replace('Id', ''),
                propertyTitle: o.propertyTitle,
                visible: o.visible
            }
        })
        return data
    }

    parseResponse = (response) => {
        let data = {
            form: {
                details: [
                ]
            },
            other: {
                status: consts.status.VOUCHER_STATUS_NORMAL,
            }
        }
        let responseValue = response
        if (!responseValue) return data

        data.form = {
            id: responseValue.id,
            ts: responseValue.ts,
            code: responseValue.code,
            enclosures: responseValue.enclosures || [],
            businessDate: responseValue.businessDate,
            orgId: responseValue.orgId,
            invoiceNumber: responseValue.invoiceNumber,
            invoiceCode: responseValue.invoiceCode,
            creatorName: responseValue.creatorName,
            creator: responseValue.creator,
            titleText: responseValue.deliveryTypeId == 133 ? '红字' : '销售订单',
            status: responseValue.status,
            statusName: responseValue.statusName,
            settleStatus: responseValue.settleStatus,
            settleStatusName: responseValue.settleStatusName,
            deliveryTypeId: responseValue.deliveryTypeId,
            settledAmount: responseValue.settledAmount,
            totalAmount: responseValue.totalAmount,
            totalAmountWithTax: responseValue.totalAmountWithTax || 0,
            receiveAmount: responseValue.receiveAmount || 0,
            remark: responseValue.remark,
            restMoney: 0,
            preReceiveAmount: responseValue.preReceiveAmount || 0,
            balance: 0,
            auditorName: responseValue.auditorName,
            customer: {
                id: responseValue.customerId,
                name: responseValue.customerName
            },
            invoiceType: {
                enumItemId: responseValue.invoiceTypeId || responseValue.defaultInvoiceType,
                enumItemName: responseValue.invoiceTypeName || responseValue.defaultInvoiceTypeName,
            },
            department: {
                id: responseValue.departmentId,
                name: responseValue.departmentName
            },
            person: {
                id: responseValue.salesPersonId,
                name: responseValue.salesPersonName
            },
            bankAccount: {
                id: responseValue.bankAccountId,
                name: responseValue.bankAccountName,
            },
            project: {
                id: responseValue.projectId,
                name: responseValue.projectName
            }
        }
        data.form.album = responseValue.enclosures
        data.form.restMoney = utils.number.format(data.form.totalAmountWithTax - data.form.receiveAmount, 2)
        data.form.balance = utils.number.format(data.form.restMoney - data.form.preReceiveAmount, 2)

        if ((!data.form.id && !data.form.ts) || responseValue.operateStatus == 'Deleted') {
            data.other.status = consts.status.VOUCHER_STATUS_ADD
        }

        if (data.form.customer && data.form.customer.id) {
            debugger
            //data.other.customer = data.form.customer
        }

        if (responseValue.taxRateList) {
            data.other.taxRate = responseValue.taxRateList
        }

        if (responseValue.invoiceType && responseValue.invoiceType.enumDetail) {
            data.other.invoiceType = responseValue.invoiceType.enumDetail
        }

        if (responseValue.columnSetting) {
            data.other.columnSetting = responseValue.columnSetting
        }

        //如果行数太少,则用空行补足
        if (responseValue.details) {
            while (responseValue.details.length < getInitState().data.form.details.length) {
                responseValue.details.push(blankVoucherItem)
            }
        }
        else {
            responseValue.details = getInitState().data.form.details
        }

        data.form.details = responseValue.details.map(o => {
            if (o) {
                return {
                    id: o.id,
                    ts: o.ts,
                    voucherId: o.voucherId,
                    createTime: o.createTime ? moment(o.createTime).format('YYYY-MM-DD HH:mm:ss') : '',
                    amount: o.amount,
                    amountWithTax: o.amountWithTax,
                    status: o.status,
                    orderNumber: o.orderNumber,
                    inventory: {
                        id: o.inventoryId ? o.inventoryId : '',
                        name: o.inventoryName ? o.inventoryName : '',
                        code: o.inventoryCode ? o.inventoryCode : '',
                        codeAndName: (o.inventoryCode ? o.inventoryCode : '') + " " + (o.inventoryName ? o.inventoryName : ''),
                        specification: o.specification ? o.specification : '',
                        unit: o.unitName ? o.unitName : ''
                    },
                    quantity: o.quantity,
                    price: o.price,
                    tax: o.tax,
                    taxRate: {
                        id: o.taxRateId,
                        name: o.taxRateName,
                        value: o.taxRate
                    },
                    creator: o.creator,

                }
            }

        })
        return data
    }

}

export default function creator(option) {
    const metaReducer = new MetaReducer(option),
        extendReducer = extend.reducerCreator({ ...option, metaReducer }),
        voucherReducer = decorator.reducerCreator({ ...option, metaReducer }),
        o = new reducer({ ...option, metaReducer, extendReducer, voucherReducer })

    return { ...metaReducer, ...extendReducer.gridReducer, ...o }
}