import * as consts from './consts'
import moment from 'moment'

let currentTime = moment().format('YYYY-MM')

export function getMeta() {
    return {
        name: 'root',
        component: 'Layout',
        className: 'x-tab x-list purchase-list',
        childrens: [
            // getAddOneMeta(),
            getHeaderMeta(),
            getTabMeta(),
            getContentMeta(),
            getFooterMeta(),
        ]
    }
}

function getHeaderMeta() {
    return {
        name: 'header',
        component: 'Layout',
        className: 'x-list-header',
        childrens: [
            getHeaderLeftMeta(),
            getHeaderRightMeta()
        ]
    }
}

function getHeaderLeftMeta() {
    return {
        name: 'headerLeft',
        component: 'Layout',
        className: 'x-list-header-left',
        childrens: [/*{
            name: 'yearMonth',
            component: 'MonthPicker',
            bindField: 'filter.yearMonth',
            width: 150,
        },*/{
            name: 'purchaseQuery',
            title: 'purchaseQuery',
            className: 'purchaseQuery',
            appPath: 'apps/common/inquire',
            placement: 'bottomLeft',
            component: 'Inquire',
            bindField: 'purchaseQuery',
            refName: 'purchaseQuery',
            childrens: [{
                name: 'formItems',
                component: 'FormItems',
                childrens: [{
                    name: 'dateRangePicker',
                    component: 'RangePicker',
                    componentName: 'DatePicker',
                    showPeriodSelect: true,
                    title: '期间',
                    containerId: '',
                    showLable: true,
                    className: 'dateRangePicker',
                    style: {width: '140px'},
                    format: 'YYYY-MM-DD',
                    bindField: 'form.dateRangePicker'
                }, {
                    name: 'vendor',
                    title: '供应商',
                    type: 'string',
                    component: 'Select',
                    selectButtonName: '...',
                    bindField: 'form.vendorId',
                    width: 150,
                    combobox: false,
                    getPopupContainer: true, //click后parent弹窗不消失
                    showSearch: true,
                    allowClear: true,
                    valueMember: 'id',
                    displayMember: 'name',
                    required: false,
                    dataSource: [],
                    dataSourceFetchMode: 2
                }, {
                    name: 'billType',
                    title: '票据类型',
                    type: 'string',
                    component: 'Select',
                    selectButtonName: '...',
                    bindField: 'form.billType',
                    width: 150,
                    combobox: false,
                    allowClear: true,
                    showSearch: true,
                    valueMember: 'enumItemId',
                    displayMember: 'enumItemName',
                    required: false,
                    getPopupContainer: true,
                    dataSource: [],
                    dataSourceFetchMode: 2
                }, {
                    name: 'billNum',
                    title: '发票号码',
                    type: 'string',
                    component: 'Input',
                    bindField: 'form.billNum',
                    width: 150,
                    required: false
                }, {
                    name: 'commodity',
                    title: '商品',
                    type: 'string',
                    component: 'Select',
                    selectButtonName: '...',
                    bindField: 'form.commodity',
                    width: 150,
                    combobox: false,
                    allowClear: true,
                    showSearch: true,
                    valueMember: 'id',
                    displayMember: 'name',
                    required: false,
                    getPopupContainer: true,
                    dataSource: [],
                    dataSourceFetchMode: 2
                }]
            }]
        },
        {
            name: 'refresh',
            component: 'Button',
            zIcon: 'refresh',
            title: '刷新',
            // width: 50,
        }]
    }
}

function getHeaderRightMeta() {
    return {
        name: 'headerRight',
        component: 'Layout',
        className: 'x-list-header-right',
        childrens: [{
            name: 'add',
            component: 'Button',
            text: '新增采购发票',
            colorStyle: 'orange',
            width:110
        },{
            name: 'import',
            component: 'Button',
            text: '发票导入'
        },  {
            name: 'pay',
            component: 'Button',
            text: '付款',
        },{
            name: 'setting',
            component: 'Button',
            type: 'primary',
            text: '设置'
        },  {
            name: 'print',
            component: 'Button',
            zIcon: 'print',
            title: '打印',
            // width: 50,
        }, {
            name: 'upload',
            component: 'Button',
            zIcon: 'upload',
            title: '导出Excel',
            // width: 50,
        }]
    }
}
function getTabMeta() {
    return {
        name: 'tabList',
        component: 'Tabs',
        activeKey: '0',
        enabledInternalActiveKey: false,
        childrens: [{
            name: 'total',
            title: '全部',
            component: 'FormItems',
            childrens: []
        }, {
            name: 'unCheck',
            title: '未审核',
            component: 'FormItems',
            childrens: []
        }, {
            name: 'unChargeAgainst',
            title: '未冲销完',
            component: 'FormItems',
            childrens: []
        }, {
            name: 'chargeAgainst',
            title: '已冲销',
            component: 'FormItems',
            childrens: []
        }]
    }
}
function getContentMeta() {
    return {
        name: 'content',
        component: 'Layout',
        className: 'x-list-content',
        childrens: [{
            name: 'list',
            component: 'Grid',
            bindField: 'list',
            rowHeight: 32,
            headerHeight: 32,
            disabled: true,
            enableSum: false,
            enableSequenceColumn: true,

            childrens: [{
                name: 'select',
                title: '选',
                type: 'bool',
                isSelectColumn: true,
                bindField: 'list.{0}.select',
                width: 30
            }, {
                name: 'code',
                title: '单据号',
                bindField: 'list.{0}.code',
                type: 'string',
                displayComponent: 'Link',
                textAlign: 'center',
                width: 120
            },{
                name: 'invoiceNum',
                title: '发票号码',
                bindField: 'list.{0}.invoiceNum',
                type: 'string',
                textAlign: 'center',
                width: 120
            },{
                name: 'invoiceCode',
                title: '发票代码',
                bindField: 'list.{0}.invoiceCode',
                type: 'string',
                textAlign: 'center',
                enableEllipsis: true,
                width: 120
            },{
                name: 'docCode',
                title: '凭证号',
                bindField: 'list.{0}.docCode',
                type: 'string',
                textAlign: 'center',
                enableEllipsis: true,
                width: 120
            }, {
                name: 'businessDate',
                title: '业务日期',
                type: 'date',
                bindField: 'list.{0}.businessDate',
                width: 100,
                textAlign: 'center'
            },{
                name: 'vendorName',
                title: '供应商',
                type: 'int',
                bindField: 'list.{0}.vendorName',
                width: 70,
                enableEllipsis: true
            },{
                name: 'businessName',
                title: '业务类型',
                type: 'string',
                bindField: 'list.{0}.businessName',
                flexGrow: 1,
                width: 100,
                enableEllipsis: true
            }, {
                name: 'totalAmount',
                title: '金额汇总',
                type: 'float',
                bindField: 'list.{0}.totalAmount',
                enableSum: true,
                precision: 2,
                width: 100,
                textAlign: 'right',
                format: 'thousand'
            }, {
                name: 'totalAmountWithTax',
                title: '价税合计汇总',
                type: 'float',
                bindField: 'list.{0}.totalAmountWithTax',
                enableSum: true,
                precision: 2,
                width: 100,
                textAlign: 'right',
                format: 'thousand'
            }, {
                name: 'settledAmount',
                title: '已冲销金额',
                type: 'float',
                bindField: 'list.{0}.settledAmount',
                enableSum: true,
                precision: 2,
                width: 100,
                textAlign: 'right',
                format: 'thousand'
            }, {
                name: 'unpaidAmount',
                title: '未冲销金额',
                type: 'float',
                bindField: 'list.{0}.unpaidAmount',
                enableSum: true,
                precision: 2,
                width: 100,
                textAlign: 'right',
                format: 'thousand'
            },{
                name: 'remark',
                title: '备注',
                type: 'string',
                bindField: 'list.{0}.remark',
                width: 150,
                enableEllipsis: true,
                flexGrow: 1,
            },{
                name: 'operate',
                title: '操作',
                displayComponent: 'Layout',
                isFixed: true,
                width: 70,
                childrens: [{
                    name: 'audit',
                    title: '审核',
                    component: 'ZIcon',
                    zIcon: 'audit',
                },{
                    name: 'reject',
                    title: '反审核',
                    component: 'ZIcon',
                    zIcon: 'reject',
                },{
                    name: 'del',
                    title: '删除',
                    component: 'ZIcon',
                    colorStyle: 'orange',
                    zIcon: 'remove',
                }]

            }],
        }]
    }
}

function getFooterMeta() {
    return {
        name: 'footer',
        component: 'Layout',
        className: 'x-list-footer',
        childrens: [{
            name: 'pagination',
            component: 'Pagination',
            bindField: 'pagination'
        }]
    }
}

function getAddOneMeta() {
    return {
        name: 'addOne',
        className: 'movablePanel',
        component: 'MovablePanel',
        title: '记一笔'
    }

}
export function getData() {
    return {
            list: [],
            pagination:{current: 1, total: 0, pageSize: 20},
            filter: {
              isInit:true
            },
            other:{
              tabIndex:'0'
            },
            purchaseQuery: {}

        }

}
export function init(post, page, filter) {
    filter.page = {currentPage:page.current, pageSize:page.pageSize}
    return post('/v1/arrival/queryList', filter)
}
