import aarGrid from 'mk-aar-grid'

function getGridOption() {
    return {
        'details': {
            path: 'data.form.details',
            selectFieldName: 'selected',

            cellClassName: 'app-scm-voucher-card-cell',
            emptyRow: {},
            getColNames: (gf) => {
                return [
                    'inventoryCode',//0
                    'inventoryName',//1
                    'specification',//2
                    'unit',//3
                    'isGift',//4
                    'quantity',//5
                    'price',//6
                    'amount',//7
                    'taxRate',//8
                    'tax',//9
                    'amountWithTax'//10
                ]
            },
            cellIsReadonly: (cellPosition, path, gf) => {
                if (cellPosition.x == 1
                    || cellPosition.x == 2
                    || cellPosition.x == 3
                    || cellPosition.x == 9)
                    return true

                return false
            }
        },
    }
}

function actionCreator(option) {
    return {
        gridAction: new aarGrid.action({ ...option, gridOption: getGridOption() })
    }
}

function reducerCreator(option) {
    return {
        gridReducer: new aarGrid.reducer({ ...option, gridOption: getGridOption() })
    }
}

export default {
    actionCreator,
    reducerCreator
}