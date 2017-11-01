import React from 'react'
import { action as MetaAction, AppLoader } from 'mk-meta-engine'
import config from './config'
import md5 from 'md5'

class action {
    constructor(option) {
        this.metaAction = option.metaAction
        this.config = config.current
        this.webapi = this.config.webapi
    }

    onInit = ({ component, injections }) => {
        this.component = component
        this.injections = injections
        injections.reduce('init')
    }

    getLogo = () => this.config.logo

    login = async () => {
        let form = this.metaAction.gf('data.form').toJS()
        if(form.password){
            form.password =  md5(form.password+'yiJia9*')
        }
        if(!form.account && !form.password ){
            form.account = sessionStorage['account'],
            form.password = sessionStorage['password']
        }

        const response = await this.webapi.user.login(form)

        this.metaAction.context.set('user', response.value.sysUser)

        sessionStorage['account'] = form.account
        sessionStorage['username'] = response.value.sysUser.name
        sessionStorage['_accessToken'] = response.token
        sessionStorage['password'] = form.password

        if (this.component.props.onRedirect && this.config.goAfterLogin) {
            this.component.props.onRedirect(this.config.goAfterLogin)
        }
    }

    goRegister = () => {
        if(!this.config.apps['mk-app-register']){
            throw '请将这个应用加入到带mk-app-root和mk-app-register的网站中，跳转功能才能正常使用'
        }
        if (this.component.props.onRedirect && this.config.goRegister) {
            this.component.props.onRedirect(this.config.goRegister)
        }
    }

    goForgot = () =>{
        if(!this.config.apps['mk-app-forgot-password']){
            throw '请将这个应用加入到带mk-app-root和mk-app-forgot-password的网站中，跳转功能才能正常使用'
        }
        if (this.component.props.onRedirect && this.config.goForgot) {
            this.component.props.onRedirect(this.config.goForgot)
        }
    }

    fieldChange = async (fieldPath, value) => {
        await this.check([{ path: fieldPath, value }])
    }

    check = async (fieldPathAndValues) => {
        if (!fieldPathAndValues)
            return

        var checkResults = []

        for (var o of fieldPathAndValues) {
            let r = { ...o }
            if (o.path == 'data.form.mobile') {
                Object.assign(r, await this.checkMobile(o.value))
            }
            else if (o.path == 'data.form.password') {
                Object.assign(r, await this.checkPassword(o.value))
            }
            checkResults.push(r)
        }

        var json = {}
        var hasError = true
        checkResults.forEach(o => {
            json[o.path] = o.value
            json[o.errorPath] = o.message
            if (o.message)
                hasError = false
        })

        this.metaAction.sfs(json)

        return hasError
    }


    checkMobile = async (mobile) => {
        var message

        if (!mobile)
            message = '请录入手机号'
        else if (!/^1[3|4|5|8][0-9]\d{8}$/.test(mobile))
            message = '请录入有效的手机号'

        return { errorPath: 'data.other.error.mobile', message }
    }

    checkPassword = async (password) => {
        var message

        if (!password)
            message = '请录入密码'

        return { errorPath: 'data.other.error.password', message }
    }
}

export default function creator(option) {
    const metaAction = new MetaAction(option),
        o = new action({ ...option, metaAction }),
        ret = { ...metaAction, ...o }

    metaAction.config({ metaHandlers: ret })

    return ret
}
