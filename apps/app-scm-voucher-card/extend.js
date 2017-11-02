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
                    'inventoryCode',
                    'inventoryName',
                    'spec',
                    'unit',
                    'isGift',
                    'quantity',
                    'price',
                    'amount',
                    'taxRate',
                    'tax',
                    'amountWithTax'
                ]
            },
            cellIsReadonly: (cellPosition, path, gf) => {
                if (cellPosition.x == 1
                    || cellPosition.x == 2
                    || cellPosition.x == 3
                    || cellPosition.x == 7
                    || cellPosition.x == 9
                    || cellPosition.x == 10)
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