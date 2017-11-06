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
            this.component.props.setPortalContent('销售订单', 'app-scm-voucher-card')
    }

    selectFocus = (key)=> async()=>{
        let res = undefined
        switch (key) {
            case 'customers':
                res = await this.webapi.deliveryList.customerQuery()
                break;
            default:
            case 'commoditys':
                res = await this.webapi.deliveryList.commodityrQuery()
                break;
        }
        this.metaAction.sf(`data.other.${key}`,fromJS(res.dataList) )
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

        const ids = selectRows.map(o => { return {id:o.get('id'),ts:o.get('ts')}}).toJS()
        await this.webapi.deliveryList.deleteBatch(ids)
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

        const ids = selectRows.map(o => { return {id:o.get('id'),ts:o.get('ts')}}).toJS()
        await this.webapi.deliveryList.auditBatch(ids)
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
            this.component.props.setPortalContent('销售发票', 'app-scm-voucher-card', {deliveryId:id})
    }

    toggleShowAdvanceFilter = () => {
        this.metaAction.sf('data.other.isFold', !this.metaAction.gf('data.other.isFold'))
    }

    commonFilterChange = (e) => {

        const key = e.target.value

        let page = this.metaAction.gf('data.page').toJS(),
            filter = this.metaAction.gf('data.filter').toJS(),
            startTime,
            endTime


        switch (key) {
            case 'all':
                delete(filter.startTime)
                delete(filter.endTime)
                break;
            case 'today':
                startTime = moment().format('YYYY-MM-DD')
                endTime = moment().format('YYYY-MM-DD')
                filter.startTime = startTime
                filter.endTime = endTime
                break;
            case 'yesterday':
                startTime = moment().subtract(1, "days").format("YYYY-MM-DD")
                endTime = moment().subtract(1, "days").format("YYYY-MM-DD")
                filter.startTime = startTime
                filter.endTime = endTime
                break;
            case 'thisWeek':
                startTime = moment().startOf('week').format("YYYY-MM-DD")
                endTime = moment().endOf('week').format("YYYY-MM-DD")
                filter.startTime = startTime
                filter.endTime = endTime
                break;
            case 'lastWeek':
                startTime = moment().startOf('week').subtract(7, "days").format("YYYY-MM-DD")
                endTime = moment().endOf('week').subtract(7, "days").format("YYYY-MM-DD")
                filter.startTime = startTime
                filter.endTime = endTime
                break;
            case 'thisMonth':
                startTime = moment().startOf('month').format("YYYY-MM-DD")
                endTime = moment().endOf('month').format("YYYY-MM-DD")
                filter.startTime = startTime
                filter.endTime = endTime
                break;
            case 'lastMonth':
                startTime = moment(moment().subtract(1, "months").format("YYYY-MM-DD")).startOf('month').format('YYYY-MM-DD')

                endTime = moment(moment().subtract(1, "months").format("YYYY-MM-DD")).endOf('month').format('YYYY-MM-DD')
                filter.startTime = startTime
                filter.endTime = endTime

                break;
            case 'thisYear':
                startTime = moment().startOf('year').format("YYYY-MM-DD")
                endTime = moment().endOf('year').format("YYYY-MM-DD")
                filter.startTime = startTime
                filter.endTime = endTime
                break;

        }

        this.metaAction.sfs({
            'data.other.timer':key,
            'data.filter.startTime':startTime,
            'data.filter.endTime':endTime
        })

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


    dateChange = (v)=>{
        let startTime =  v[0].format('YYYY-MM-DD'),
            endTime =  v[1].format('YYYY-MM-DD')
        this.metaAction.sfs({
            'data.filter.startTime':startTime,
            'data.filter.endTime':endTime,
        })
    }
    getRangerDate = ()=>{
        let filter = this.metaAction.gf('data.filter').toJS()
        return [moment(filter.startTime),moment(filter.endTime)]
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
