/**
 * mock.js 提供应用截获ajax请求，为脱离后台测试使用
 * 模拟查询更改内存中mockData,并返回数据
 */

import { fetch } from 'mk-utils'
import img1 from './img/img1.png'
import img2 from './img/img2.jpg'

const mockData = fetch.mockData

function initMockData() {
    //类型
    if (!mockData.inventoryCategories) {
        mockData.inventoryCategories = [{
            id: 1,
            name: '商品'
        }, {
            id: 2,
            name: '劳务'
        }]
    }

    //计价方式
    if (!mockData.pricingModes) {
        mockData.pricingModes = [{
            id: 1,
            name: '移动平均'
        }, {
            id: 2,
            name: '全月平均'
        }, {
            id: 3,
            name: '先进先出'
        }]
    }

    //分类
    if (!mockData.inventoryTypes) {
        mockData.inventoryTypes = [{
            id: 1,
            code: '001',
            name: '食品',
            children: [{
                id: 101,
                code: '00101',
                name: '肉类'
            }, {
                id: 102,
                code: '00102',
                name: '酒类'
            }, {
                id: 103,
                code: '00102',
                name: '干果'
            }]
        }, {
            id: 2,
            code: '002',
            name: '服饰',
            children: [{
                id: 201,
                code: '00201',
                name: '衣服'
            }, {
                id: 202,
                code: '00202',
                name: '鞋子'
            }, {
                id: 203,
                code: '00203',
                name: '饰品'
            }]
        }, {
            id: 3,
            code: '003',
            name: '设备',
        }]
    }

    //税率
    if (!mockData.taxRates) {
        mockData.taxRates = [{
            id: 17,
            name: '17%'
        }, {
            id: 5,
            name: '5%'
        }, {
            id: 3,
            name: '3%'
        }]
    }

    //计量单位
    if (!mockData.meaUnits) {
        mockData.meaUnits = [{
            id: 1,
            name: '个'
        }, {
            id: 2,
            name: '件'
        }, {
            id: 3,
            name: '台'
        }, {
            id: 4,
            name: '斤'
        }, {
            id: 5,
            name: '双'
        }]
    }

    //存货
    if (!mockData.inventory) {
        mockData.inventory = []

        for (let i = 1; i <= 10; i++) {
            mockData.inventory.push({
                id: 1000 + i,
                code: 1000 + i + '',
                name: '肉' + i,
                remark: '肉' + i,
                category: {
                    id: 1,
                    name: '商品'
                },
                type: {
                    id: 101,
                    code: '00101',
                    name: '肉类'
                },
                meaUnit: {
                    id: 4,
                    name: '斤'
                },
                spec: '',
                pricingMode: {
                    id: 2,
                    name: '全月平均'
                },
                taxRate: {
                    id: 17,
                    name: '17%'
                },
                multiMea: true,
                disable: false,
                units: [{
                    id: 1,
                    unit: {
                        id: 4,
                        name: '斤'
                    },
                    conversionRate: 1,
                    conversionDesc: '',
                    isBase: true,
                    isPu: true,
                    isSa: true,
                    isSt: true
                }],
                prices: [{
                    id: 1,
                    unit: {
                        id: 4,
                        name: '斤'
                    },
                    lastPuPrice: 10,
                    referPuPrice: 10,
                    lastSaPrice: 20,
                    retailPrice: 20,
                    firstTradePrice: 11,
                    secondTradePrice: 12,
                    thirdTradePrice: 13
                }],
                imgs: [{
                    id: 1,
                    url: img1
                }, {
                    id: 2,
                    url: img2
                }]
            })
        }

        for (let i = 1; i < 6; i++) {
            mockData.inventory.push({
                id: 2000 + i,
                code: 2000 + i + '',
                name: '酒' + i,
                remark: '酒' + i,
                category: {
                    id: 1,
                    name: '商品'
                },
                type: {
                    id: 102,
                    code: '00102',
                    name: '酒类'
                },
                meaUnit: {
                    id: 4,
                    name: '斤'
                },
                spec: '',
                pricingMode: {
                    id: 2,
                    name: '全月平均'
                },
                taxRate: {
                    id: 17,
                    name: '17%'
                },
                multiMea: true,
                disable: false,
                units: [{
                    id: 1,
                    unit: {
                        id: 4,
                        name: '斤'
                    },
                    conversionRate: 1,
                    conversionDesc: '',
                    isBase: true,
                    isPu: true,
                    isSa: true,
                    isSt: true
                }],
                prices: [{
                    id: 1,
                    unit: {
                        id: 4,
                        name: '斤'
                    },
                    lastPuPrice: 10,
                    referPuPrice: 10,
                    lastSaPrice: 20,
                    retailPrice: 20,
                    firstTradePrice: 11,
                    secondTradePrice: 12,
                    thirdTradePrice: 13
                }],
                imgs: [{
                    id: 1,
                    url: img1
                }, {
                    id: 2,
                    url: img2
                }]
            })
        }

        for (let i = 1; i < 10; i++) {
            mockData.inventory.push({
                id: 3000 + i,
                code: 3000 + i + '',
                name: '干果' + i,
                remark: '干果' + i,
                category: {
                    id: 1,
                    name: '商品'
                },
                type: {
                    id: 103,
                    code: '00102',
                    name: '干果'
                }
                ,
                meaUnit: {
                    id: 4,
                    name: '斤'
                },
                spec: '',
                pricingMode: {
                    id: 2,
                    name: '全月平均'
                },
                taxRate: {
                    id: 17,
                    name: '17%'
                },
                multiMea: true,
                disable: false,
                units: [{
                    id: 1,
                    unit: {
                        id: 4,
                        name: '斤'
                    },
                    conversionRate: 1,
                    conversionDesc: '',
                    isBase: true,
                    isPu: true,
                    isSa: true,
                    isSt: true
                }],
                prices: [{
                    id: 1,
                    unit: {
                        id: 4,
                        name: '斤'
                    },
                    lastPuPrice: 10,
                    referPuPrice: 10,
                    lastSaPrice: 20,
                    retailPrice: 20,
                    firstTradePrice: 11,
                    secondTradePrice: 12,
                    thirdTradePrice: 13
                }],
                imgs: [{
                    id: 1,
                    url: img1
                }, {
                    id: 2,
                    url: img2
                }]
            })
        }

        for (let i = 1; i < 34; i++) {
            mockData.inventory.push({
                id: 4000 + i,
                code: 4000 + i + '',
                name: '衣服' + i,
                remark: '衣服' + i,
                category: {
                    id: 1,
                    name: '商品'
                },
                type: {
                    id: 201,
                    code: '00201',
                    name: '衣服'
                }
                ,
                meaUnit: {
                    id: 2,
                    name: '件'
                },
                spec: '',
                pricingMode: {
                    id: 2,
                    name: '全月平均'
                },
                taxRate: {
                    id: 17,
                    name: '17%'
                },
                multiMea: true,
                disable: false,
                units: [{
                    id: 1,
                    unit: {
                        id: 2,
                        name: '件'
                    },
                    conversionRate: 1,
                    conversionDesc: '',
                    isBase: true,
                    isPu: true,
                    isSa: true,
                    isSt: true
                }],
                prices: [{
                    id: 1,
                    unit: {
                        id: 2,
                        name: '件'
                    },
                    lastPuPrice: 10,
                    referPuPrice: 10,
                    lastSaPrice: 20,
                    retailPrice: 20,
                    firstTradePrice: 11,
                    secondTradePrice: 12,
                    thirdTradePrice: 13
                }],
                imgs: [{
                    id: 1,
                    url: img1
                }, {
                    id: 2,
                    url: img2
                }]
            })
        }

        for (let i = 1; i < 8; i++) {
            mockData.inventory.push({
                id: 5000 + i,
                code: 5000 + i + '',
                name: '鞋子' + i,
                remark: '鞋子' + i,
                category: {
                    id: 1,
                    name: '商品'
                },
                type: {
                    id: 202,
                    code: '00202',
                    name: '鞋子'
                }
                ,
                meaUnit: {
                    id: 5,
                    name: '双'
                },
                spec: '',
                pricingMode: {
                    id: 2,
                    name: '全月平均'
                },
                taxRate: {
                    id: 17,
                    name: '17%'
                },
                multiMea: true,
                disable: false,
                units: [{
                    id: 1,
                    unit: {
                        id: 5,
                        name: '双'
                    },
                    conversionRate: 1,
                    conversionDesc: '',
                    isBase: true,
                    isPu: true,
                    isSa: true,
                    isSt: true
                }],
                prices: [{
                    id: 1,
                    unit: {
                        id: 5,
                        name: '双'
                    },
                    lastPuPrice: 10,
                    referPuPrice: 10,
                    lastSaPrice: 20,
                    retailPrice: 20,
                    firstTradePrice: 11,
                    secondTradePrice: 12,
                    thirdTradePrice: 13
                }],
                imgs: [{
                    id: 1,
                    url: img1
                }, {
                    id: 2,
                    url: img2
                }]
            })
        }

        for (let i = 1; i < 28; i++) {
            mockData.inventory.push({
                id: 6000 + i,
                code: 6000 + i + '',
                name: '饰品' + i,
                remark: '饰品' + i,
                category: {
                    id: 1,
                    name: '商品'
                },
                type: {
                    id: 203,
                    code: '00203',
                    name: '饰品'
                }
                ,
                meaUnit: {
                    id: 2,
                    name: '件'
                },
                spec: '',
                pricingMode: {
                    id: 2,
                    name: '全月平均'
                },
                taxRate: {
                    id: 17,
                    name: '17%'
                },
                multiMea: true,
                disable: false,
                units: [{
                    id: 1,
                    unit: {
                        id: 2,
                        name: '件'
                    },
                    conversionRate: 1,
                    conversionDesc: '',
                    isBase: true,
                    isPu: true,
                    isSa: true,
                    isSt: true
                }],
                prices: [{
                    id: 1,
                    unit: {
                        id: 2,
                        name: '件'
                    },
                    lastPuPrice: 10,
                    referPuPrice: 10,
                    lastSaPrice: 20,
                    retailPrice: 20,
                    firstTradePrice: 11,
                    secondTradePrice: 12,
                    thirdTradePrice: 13
                }],
                imgs: [{
                    id: 1,
                    url: img1
                }, {
                    id: 2,
                    url: img2
                }]
            })
        }

        for (let i = 1; i < 50; i++) {
            mockData.inventory.push({
                id: 7000 + i,
                code: 7000 + i + '',
                name: '设备' + i,
                remark: '设备' + i,
                category: {
                    id: 1,
                    name: '商品'
                },
                type: {
                    id: 3,
                    code: '003',
                    name: '设备',
                }
                ,
                meaUnit: {
                    id: 3,
                    name: '台'
                },
                spec: '',
                pricingMode: {
                    id: 2,
                    name: '全月平均'
                },
                taxRate: {
                    id: 17,
                    name: '17%'
                },
                multiMea: true,
                disable: false,
                units: [{
                    id: 1,
                    unit: {
                        id: 3,
                        name: '台'
                    },
                    conversionRate: 1,
                    conversionDesc: '',
                    isBase: true,
                    isPu: true,
                    isSa: true,
                    isSt: true
                }],
                prices: [{
                    id: 1,
                    unit: {
                        id: 3,
                        name: '台'
                    },
                    lastPuPrice: 10,
                    referPuPrice: 10,
                    lastSaPrice: 20,
                    retailPrice: 20,
                    firstTradePrice: 11,
                    secondTradePrice: 12,
                    thirdTradePrice: 13
                }],
                imgs: [{
                    id: 1,
                    url: img1
                }, {
                    id: 2,
                    url: img2
                }]
            })
        }
    }

    //票据类型
    if (!mockData.ticketTypes) {
        mockData.ticketTypes = [{
            id: 1,
            name: '专用发票'
        }, {
            id: 2,
            name: '普通发票'
        }]
    }

    //客户
    if (!mockData.customer) {
        mockData.customer = [{
            id: 1,
            code: '0001',
            name: '腾讯'
        }, {
            id: 2,
            code: '0002',
            name: '阿里'
        }]
    }

    //部门

    if (!mockData.department) {
        mockData.department = [{
            id: 1,
            code: '0001',
            name: '部门一'
        }, {
            id: 2,
            code: '0002',
            name: '部门二'
        }]
    }

    //项目

    if (!mockData.project) {
        mockData.project = [{
            id: 1,
            code: '0001',
            name: '项目一'
        }, {
            id: 2,
            code: '0002',
            name: '项目二'
        }]
    }


    //人员

    if (!mockData.person) {
        mockData.person = [{
            id: 1,
            code: '0001',
            name: '张三'
        }, {
            id: 2,
            code: '0002',
            name: '李四'
        }]
    }

    //仓库
    if (!mockData.warehouses) {
        mockData.warehouses = [{
            id: 1,
            name: '北京仓'
        }, {
            id: 2,
            name: '上海仓'
        }]
    }

    //结算方式
    if (!mockData.settlementModes) {
        mockData.settlementModes = [{
            id: 1,
            name: '现结'
        }, {
            id: 2,
            name: '月结'
        }]
    }

    //资金账户
    if (!mockData.assetAccounts) {
        mockData.assetAccounts = [{
            id: 1,
            name: '现金'
        }, {
            id: 2,
            name: '支付宝'
        }, {
            id: 3,
            name: '微信'
        }]
    }

    // 销售出库单
    if (!mockData.delivery) {
        mockData.delivery = []
        for (let i = 0; i < 200; i++) {
            mockData.delivery.push({
                id: i,
                code: 'do20170101' + (100 + i + 1),
                ticketType: { id: 1, name: '专用发票' },
                warehouse: { id: 1, name: '北京仓' },
                businessDate: `2017-${i % 11 + 1}-${i % 28 + 1}`,
                customer: { id: 1, name: '腾讯' },
                person: { id: 1, name: '张三' },
                voucherNO: i % 2 == 1 ? '' : 'VO' + (10000 + i),
                receiptNumber: i % 2 == 1 ? '' : 'RE' + (10000 + i),
                amount: 100,
                priceTaxTotal: 105,
                paidAmount: 105 - (i % 3) * 10,
                unpaidAmount: (i % 3) * 10,
                isAudit: i % 3 == 0,
                remark: '备注' + i,
                settlementMode: { id: 1, name: '现结' },
                details: [{
                    id: 1,
                    inventory: mockData.inventory[1],
                    price: 10,
                    quantity: 10,
                    amount: 100,
                    taxRate: { id: 5, name: '5%' },
                    tax: 5,
                    amountWithTax: 105
                }],
                settlements: [{
                    bankAccount: { id: 1, name: '现金' },
                    settlementAmount: 105 - (i % 3) * 10
                }]
            })
        }
    }
}


fetch.mock('/v1/delivery/init', (option) => {
    initMockData()
    //debugger
    return {
        result: true,
        value: {
            voucher: (option.id || option.id == 0) ? mockData.delivery.find(o => o.id == option.id) : undefined,
            inventory: mockData.inventory,
            customer: mockData.customer,
            ticketTypes: mockData.ticketTypes,
            warehouses: mockData.warehouses,
            taxRates: mockData.taxRates,
            settlementModes: mockData.settlementModes,
            assetAccounts: mockData.assetAccounts
        }
    }
})

fetch.mock('/v1/inventory/query', (option) => {
    initMockData()
    return {
        result: true,
        value: mockData.inventory
    }
})

fetch.mock('/v1/customer/query', (option) => {
    initMockData()
    return {
        result: true,
        value: mockData.customer
    }
})

fetch.mock('/v1/department/query', (option) => {
    initMockData()
    return {
        result: true,
        value: mockData.department
    }
})

fetch.mock('/v1/project/query', (option) => {
    initMockData()
    return {
        result: true,
        value: mockData.project
    }
})

fetch.mock('/v1/ticketType/query', (option) => {
    initMockData()
    return {
        result: true,
        value: mockData.ticketTypes
    }
})

fetch.mock('/v1/warehouse/query', (option) => {
    initMockData()
    return {
        result: true,
        value: mockData.warehouses
    }
})

fetch.mock('/v1/taxRate/query', (option) => {
    initMockData()
    return {
        result: true,
        value: mockData.taxRates
    }
})

fetch.mock('/v1/settlementMode/query', (option) => {
    initMockData()
    return {
        result: true,
        value: mockData.settlementModes
    }
})

fetch.mock('/v1/assetAccount/query', (option) => {
    initMockData()
    return {
        result: true,
        value: mockData.assetAccounts
    }
})


fetch.mock('/v1/delivery/prev', (option) => {
    initMockData()
    if (!mockData.delivery || mockData.delivery.length == 0) {
        return {
            result: false,
            error: {
                message: '不存在任何单据！'
            }
        }
    }

    if (!(option.id || option.id == 0)) {
        return { result: true, value: mockData.delivery[mockData.delivery.length - 1] }
    }

    const index = mockData.delivery.findIndex(o => o.id == option.id)

    if (index == 0) {
        return {
            result: false,
            error: {
                message: '已经到第一张单据！'
            }
        }
    }

    return { result: true, value: mockData.delivery[index - 1] }
})


fetch.mock('/v1/delivery/next', (option) => {
    initMockData()

    if (!mockData.delivery || mockData.delivery.length == 0) {
        return {
            result: false,
            error: {
                message: '不存在任何存货！'
            }
        }
    }

    if (!(option.id || option.id == 0)) {
        return { result: true, value: mockData.delivery[mockData.delivery.length - 1] }
    }

    const index = mockData.delivery.findIndex(o => o.id == option.id)

    if (index == mockData.delivery.length - 1) {
        return {
            result: false,
            error: {
                message: '已经到最后一张单据！'
            }
        }
    }


    return { result: true, value: mockData.delivery[index + 1] }
})


fetch.mock('/v1/delivery/update', (option) => {
    initMockData()

    const index = mockData.delivery.findIndex(o => o.id == option.id)
    mockData.delivery.splice(index, 1, option)
    return { result: true, value: option }
})

fetch.mock('/v1/delivery/create', (option) => {
    initMockData()

    var maxId = 0

    mockData.delivery.forEach(o => {
        maxId = maxId > o.id ? maxId : o.id
    })

    const id = maxId + 1
    option = { ...option, id, code: 'do20170101' + (100 + id + 1), }

    mockData.delivery.push(option)

    return { result: true, value: option }
})

fetch.mock('/v1/delivery/audit', (option) => {
    initMockData()

    const order = mockData.delivery.find(o => o.id == option.id)
    order.isAudit = true

    return { result: true, value: order }
})

fetch.mock('/v1/delivery/del', (option) => {
    initMockData()

    const index = mockData.delivery.findIndex(o => o.id == option.id)
    mockData.delivery.splice(index, 1)

    if (!mockData.delivery || mockData.delivery.length == 0) {
        return {
            result: true
        }
    }

    if (mockData.delivery.length - 1 >= index) {
        return {
            result: true,
            value: mockData.delivery[index]
        }
    }
    else {
        return {
            result: true,
            value: mockData.delivery[mockData.delivery.length - 1]
        }
    }
})
