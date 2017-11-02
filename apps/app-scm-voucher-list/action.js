import React from 'react'
import { action as MetaAction, AppLoader } from 'mk-meta-engine'
import { fromJS } from 'immutable'
import config from './config'
import moment from 'moment'
import utils from 'mk-utils'
import extend from './extend'

class action {
    constructor(option) {
        this.metaAction = option.metaAction
        this.extendAction = option.extendAction
        this.config = config.current
        this.webapi = this.config.webapi
    }

    onInit = ({ component, injections }) => {
        this.extendAction.gridAction.onInit({ component, injections })
        this.component = component
        this.injections = injections
        injections.reduce('init')

        const page = this.metaAction.gf('data.page').toJS()
        const filter = this.metaAction.gf('data.filter').toJS()
        this.load(page, filter)
    }

    load = async (page, filter) => {
        if(page){
            filter.page.currentPage = page.currentPage
            filter.page.pageSize = page.pageSize
        }

        const response = await this.webapi.deliveryList.init(filter)

        response.filter = filter
        this.injections.reduce('load', response)
    }
    reload = async () => {
        const page = this.metaAction.gf('data.page').toJS()
        const filter = this.metaAction.gf('data.filter').toJS()
        this.load(page, filter)
    }

    add = async () => {
        if (!this.config.apps['app-scm-voucher-card']) {
            throw '依赖app-scm-voucher-card app,请使用mk clone app-scm-voucher-card命令添加'
        }

        this.component.props.setPortalContent &&
            this.component.props.setPortalContent('销货单', 'app-scm-voucher-card')
    }


    batchMenuClick = (e) => {
        switch (e.key) {
            case 'del':
                this.batchDel()
                break
            case 'audit':
                this.batchAudit()
                break
        }
    }

    batchDel = async () => {
        const lst = this.metaAction.gf('data.list')

        if (!lst || lst.size == 0) {
            this.metaAction.toast('error', '请选中要删除的记录')
            return
        }

        const selectRows = lst.filter(o => o.get('selected'))

        if (!selectRows || selectRows.size == 0) {
            this.metaAction.toast('error', '请选中要删除的记录')
            return
        }

        const ret = await this.metaAction.modal('confirm', {
            title: '删除',
            content: '确认删除?'
        })

        if (!ret)
            return

        const ids = selectRows.map(o => o.get('id')).toJS()
        await this.webapi.deliverOrderList.del({ ids })
        this.metaAction.toast('success', '删除成功')
        this.reload()
    }

    batchAudit = async () => {
        const lst = this.metaAction.gf('data.list')

        if (!lst || lst.size == 0) {
            this.metaAction.toast('error', '请选中要审核的记录')
            return
        }

        const selectRows = lst.filter(o => o.get('selected'))

        if (!selectRows || selectRows.size == 0) {
            this.metaAction.toast('error', '请选中要审核的记录')
            return
        }

        const ids = selectRows.map(o => o.get('id')).toJS()
        await this.webapi.deliveryList.audit({ ids })
        this.metaAction.toast('success', '审核成功')
        this.reload()
    }

    audit = (id,ts) => async () => {
        await this.webapi.deliveryList.audit({ id,ts })
        this.metaAction.toast('success', '审核成功')
        this.reload()
    }

    reject = (id,ts) => async () => {
        await this.webapi.deliveryList.reject({ id,ts})
        this.metaAction.toast('success', '反审核成功')
        this.reload()
    }

    del = (id,ts) => async () => {
        const ret = await this.metaAction.modal('confirm', {
            title: '删除',
            content: '确认删除?'
        })

        if (!ret)
            return

        await this.webapi.deliveryList.del({ id,ts })
        this.metaAction.toast('success', '删除成功')
        this.reload()
    }

    modify = (id) => async () => {
        if (!this.config.apps['app-scm-voucher-card']) {
            throw '依赖app-scm-voucher-card app,请使用mk clone app-scm-voucher-card命令添加'
        }
        this.component.props.setPortalContent &&
            this.component.props.setPortalContent('存货卡片', 'app-scm-voucher-card', { deliveryOrderId: id })
    }

    toggleShowAdvanceFilter = () => {
        this.metaAction.sf('data.other.isFold', !this.metaAction.gf('data.other.isFold'))
    }

    commonFilterChange = async (e) => {

        const key = e.target.value

        const page = this.metaAction.gf('data.page').toJS(),
            filter = this.metaAction.gf('data.filter').toJS()

        filter.common = key
        const response = await this.webapi.deliverOrderList.query({ page, filter })

        response.filter = filter

        this.load(page, filter)
    }

    tabChange = async (key) => {
        const page = this.metaAction.gf('data.page').toJS(),
            filter = this.metaAction.gf('data.filter').toJS()

        filter.status = undefined
        filter.settleStatus = undefined

        if (key == '1') {
            filter.status = 127
        } else if (key == '2') {
            filter.settleStatus = 130
        } else if (key == '3') {
            filter.settleStatus = 131
        }
        this.metaAction.sf('data.other.activeKey',key)


        const response = await this.webapi.deliveryList.query(filter)
        response.filter = filter

        this.load(page, filter)
    }
    toDoc = (docId)=>{
        // debugger
        // this.metaAction.toast('success', '未开发凭证')
    }

    customerChange = (v) => {
        const ds = this.metaAction.gf('data.other.customers')
        const hit = ds.find(o => o.get('id') == v)
        this.metaAction.sf(`data.filter.customer`, hit)
    }
    commodityChange = (v)=>{

    }
    invoiceTypeChange = (v)=>{

    }
    dateChange = (v)=>{

    }
    search = () => {
        this.reload()
    }

    pageChanged = (currentPage, pageSize) => {
        const filter = this.metaAction.gf('data.filter').toJS()
        this.load({ currentPage, pageSize }, filter)
    }

    receipt = () => {
        throw '请实现收款功能'
    }

    print = () => {
        throw '请实现打印功能'
    }

    exp = () => {
        throw '请实现导出功能'
    }

    setting = () => {
        throw '请实现设置功能'
    }

    numberFormat = utils.number.format
}

export default function creator(option) {
    const metaAction = new MetaAction(option),
        extendAction = extend.actionCreator({ ...option, metaAction }),
        o = new action({ ...option, metaAction, extendAction })

    const ret = { ...metaAction, ...extendAction.gridAction, ...o }

    metaAction.config({ metaHandlers: ret })

    return ret
}
