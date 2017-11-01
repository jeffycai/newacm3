import { Map } from 'immutable'
import { reducer as MetaReducer } from 'mk-meta-engine'

export default class reducer {
    constructor(option) {
        this.metaReducer = option.metaReducer
    }

    calc = (state, rowIndex, fieldName, rowData, params) => {
        let v = params.v,
            taxRates = params.taxRates
        if (fieldName === 'price') {
            state = priceChange(rowIndex, rowData, v)
        }
        else if (fieldName === 'amount') {
            state = amountChange(rowIndex, rowData, v)
        }
        else if (fieldName === 'number') {
            state = numberChange(rowIndex, rowData, v)
        }
        else if (fieldName === 'taxRate') {
            state = taxRateChange(rowIndex, rowData, v, taxRates)
        }

        return state
    }


    numberChange = (rowIndex, rowData, v) => {
        const number = utils.number.round(v, 2),
            price = utils.number.round(rowData.price, 2),
            amount = utils.number.round(price * number, 2),
            tax = utils.number.round(amount * (rowData.tax ? rowData.tax.id : 0) / 100, 2),
            priceTaxTotal = utils.number.round(amount + tax, 2)

        this.metaAction.sfs({
            [`data.form.details.${rowIndex}.number`]: number,
            [`data.form.details.${rowIndex}.amount`]: amount,
            [`data.form.details.${rowIndex}.tax`]: tax,
            [`data.form.details.${rowIndex}.priceTaxTotal`]: priceTaxTotal,
        })
    }

    amountChange = (rowIndex, rowData, v) => {

    }

    priceChange = (rowIndex, rowData, v) => {
        const price = utils.number.round(v, 2),
            number = utils.number.round(rowData.number, 2),
            amount = utils.number.round(price * number, 2),
            tax = utils.number.round(amount * (rowData.tax ? rowData.tax.id : 0) / 100, 2),
            priceTaxTotal = utils.number.round(amount + tax, 2)

        this.metaAction.sfs({
            [`data.form.details.${rowIndex}.price`]: price,
            [`data.form.details.${rowIndex}.amount`]: amount,
            [`data.form.details.${rowIndex}.tax`]: tax,
            [`data.form.details.${rowIndex}.priceTaxTotal`]: priceTaxTotal,
        })
    }

    taxRateChange = (rowIndex, rowData, v, taxRates) => {
        const hit = taxRates.find(o => o.id == v)

        if (!hit)
            return

        const amount = rowData.amount,
            tax = utils.number.round(amount * hit.id / 100, 2),
            priceTaxTotal = utils.number.round(amount + tax, 2)

        this.metaAction.sfs({
            [`data.form.details.${rowIndex}.taxRate`]: fromJS(hit),
            [`data.form.details.${rowIndex}.tax`]: fromJS(tax),
            [`data.form.details.${rowIndex}.priceTaxTotal`]: priceTaxTotal,
        })
    }
}
