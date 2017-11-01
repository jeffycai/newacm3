import React from 'react'
import utils from 'mk-utils'
import Immutable, { fromJS, Map, List } from 'immutable'

export default class action {

    constructor(option) {
        this.metaAction = option.metaAction
        this.voucherAction = option.voucherAction
    }

    onInit = ({ component, injections }) => {
        this.component = component
        this.injections = injections
    }

    fieldChange = async (fieldPath, value, checkFn) => {
        await this.check([{ path: fieldPath, value }], checkFn, true)
    }

    setting = async (dtoProp) => {
        if (!dtoProp) return
        const ret = await this.metaAction.modal('show', {
            title: '设置',
            children: this.metaAction.loadApp(
                'mk-app-card-set', {
                    store: this.component.props.store
                }
            )
        })
        if (ret) {

        }
    }

    addCustomer = async (field) => {
        const ret = await this.metaAction.modal('show', {
            title: '新增客户',
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


    addAssets = async () => {
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

    addDepartment = async () => {
        const ret = await this.metaAction.modal('show', {
            title: '新增部门',
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

    addProject = async () => {
        const ret = await this.metaAction.modal('show', {
            title: '新增项目',
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

    calc = async (rowIndex, fieldName, rowData, params) => {
        if (!fieldName) return

        //this.injections.reduce('calc', rowIndex,fieldName,rowData,params)
        
    }

    checkSave = (form) => {
        var msg = []
        if (!form.customer || !form.customer.id) {
            msg.push('客户不能为空!')
        }

        if (!form.date)
            msg.push('单据日期不能为空!')

        if (!form.warehouse || !form.warehouse.id)
            msg.push('仓库不能为空!')

        if (!form.ticketType || !form.ticketType.id)
            msg.push('票据类型不能为空!')

        if (!form.details || form.details.length == 0) {
            msg.push('明细不能为空！')
        }

        form.details.forEach((detail, index) => {
            if (!detail.stock)
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