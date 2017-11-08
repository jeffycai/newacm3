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

        var response = await this.webapi.person.query()
        payload.departments = response

        /*if (this.component.props.personId || this.component.props.personId == 0) {
            response = await this.webapi.person.findById(this.component.props.personId)
            payload.person = response
        }*/

        this.injections.reduce('load', payload)
    }

    onOk = async () => {
        return await this.save()
    }

    save = async () => {
        const form = this.metaAction.gf('data.form').toJS()
        const ok = await this.voucherAction.check([{
	        path: 'data.form.mobile', value: form.mobile
        }, {
	        path: 'data.form.email', value: form.email
        }, {
            path: 'data.form.name', value: form.name
        }, {
	        path: 'data.form.identityNumber', value: form.identityNumber
        }, {
	        path: 'data.form.departmentId', value: form.departmentId
        }], this.check)
	    
        if (!ok) return false
	    
        //if (form.id || form.id == 0) {
            //const response = await this.webapi.person.update(form)
            //if (response) {
                //this.metaAction.toast('success', '保存成功')
                //this.injections.reduce('setperson', response)
            //}

        //} else {
            const response = await this.webapi.person.create(form)
            if (response) {
                this.metaAction.toast('success', '保存成功')
                //this.injections.reduce('setperson', response)
	            return response
            }
        //}
    }

    check = async (option) => {
        if (!option || !option.path)
            return
		let mobileReg = /^1[3|4|5|8][0-9]\d{4,8}$/,
			emailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
			identityReg = /^\d{17}(\d|x)$/i
	    
	    if (option.path == 'data.form.mobile') {
		    return { errorPath: 'data.other.error.mobile', message: (option.value && !(mobileReg.test(option.value))) ? '请输入正确格式的手机号' : '' }
	    }else if (option.path == 'data.form.email') {
		    return { errorPath: 'data.other.error.email', message: option.value && !(emailReg.test(option.value)) ? '请输入正确格式的邮箱' : '' }
	    }else if (option.path == 'data.form.name') {
		    return { errorPath: 'data.other.error.name', message: option.value ? '' : '请录入姓名' }
	    }else if (option.path == 'data.form.identityNumber') {
		    return { errorPath: 'data.other.error.identityNumber', message: (option.value && !(identityReg.test(option.value))) ? '请输入正确格式的身份证号' : '' }
	    }else if (option.path == 'data.form.departmentId') {
            return { errorPath: 'data.other.error.department', message: option.value ? '' : '请录入所属部门' }
        }
    }

    fieldChange = (path, value) => {
        this.voucherAction.fieldChange(path, value, this.check)
    }
	
	departmentChange = (path, value) => {
    	let departments = this.metaAction.gf('data.other.departments').toJS(), _rowIndex
		departments.map((item, index)=>{
    		if(item.id == value) _rowIndex = index
		})
		this.metaAction.sf('data.form.deptName', fromJS(departments[_rowIndex].name))
		this.metaAction.sf('data.form.orgId', fromJS(departments[_rowIndex].orgId))
		this.voucherAction.fieldChange(path, value, this.check)
	}
	
	addDepartment = async () => {
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
			this.metaAction.sf('data.form.departmentId', fromJS(ret.id))
			this.metaAction.sf('data.form.deptName', fromJS(ret.name))
			this.metaAction.sf('data.form.orgId', fromJS(ret.orgId))
		}
	}
}

export default function creator(option) {
    const metaAction = new MetaAction(option),
        voucherAction = decorator.actionCreator({ ...option, metaAction }),
        o = new action({ ...option, metaAction,voucherAction }),
        ret = { ...metaAction, ...voucherAction, ...o }

    metaAction.config({ metaHandlers: ret })

    return ret
}