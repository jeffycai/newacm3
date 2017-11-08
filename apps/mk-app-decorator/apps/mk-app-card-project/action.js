import React from 'react'
import { action as MetaAction, AppLoader } from 'mk-meta-engine'
import { List, fromJS } from 'immutable'
import moment from 'moment'
import config from './config'

import decorator from '../../index'

class action {
    constructor(option) {
        this.metaAction = option.metaAction
        this.voucherAction = option.voucherAction
        this.config = config.current
        this.webapi = this.config.webapi
    }

    onInit = ({ component, injections }) => {
        this.voucherAction.onInit({ component, injections })
        this.component = component
        this.injections = injections

        if (this.component.props.setOkListener) {
            this.component.props.setOkListener(this.onOk)
        }

        injections.reduce('init', {
            isPop: this.component.props.isPop
        })

        this.load()
    }

    load = async () => {
        const payload = {}

        var response = await this.webapi.project.query()
        payload.project = response

        if (this.component.props.personId || this.component.props.personId == 0) {
            response = await this.webapi.project.findById(this.component.props.personId)
            payload.person = response
        }

        this.injections.reduce('load', payload)
    }

    onOk = async () => {
        return await this.save()
    }

    save = async () => {
        const form = this.metaAction.gf('data.form').toJS()
        const ok = await this.voucherAction.check([{
            path: 'data.form.code', value: form.code
        }, {
            path: 'data.form.name', value: form.name
        }], this.check)


        if (!ok) return false
        if (form.id || form.id == 0) {
            const response = await this.webapi.project.update(form)
            if (response) {
                this.metaAction.toast('success', '保存成功')
                return response
            }

        } else {
            const response = await this.webapi.project.create(form)
            if (response) {
                this.metaAction.toast('success', '保存成功')
                return response
            }
        }
    }

    check = async (option) => {
        if (!option || !option.path)
            return

        if (option.path == 'data.form.code') {
            return { errorPath: 'data.other.error.code', message: option.value ? '' : '请录入编码' }
        }
        else if (option.path == 'data.form.name') {
            return { errorPath: 'data.other.error.name', message: option.value ? '' : '请录入名称' }
        }

    }

    fieldChange = (path, value) => {
        this.voucherAction.fieldChange(path, value, this.check)
    }
}

export default function creator(option) {
    const metaAction = new MetaAction(option),
        voucherAction = decorator.actionCreator({ ...option, metaAction }),
        o = new action({ ...option, metaAction, voucherAction }),
        ret = { ...metaAction, ...voucherAction, ...o }

    metaAction.config({ metaHandlers: ret })

    return ret
}
