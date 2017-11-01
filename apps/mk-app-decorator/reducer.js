import { Map } from 'immutable'
import { reducer as MetaReducer } from 'mk-meta-engine'
import utils from 'mk-utils'
export default class reducer {
    constructor(option) {
        this.metaReducer = option.metaReducer
    }

    calc = (state, rowIndex, fieldName, rowData, params) => {
        let v = params.v,
            taxRates = params.taxRates
        if (fieldName === 'price') {
            state = this.priceChange(state, rowIndex, rowData, v)
        }
        else if (fieldName === 'amount') {
            state = this.amountChange(state, rowIndex, rowData, v)
        }
        else if (fieldName === 'number') {
            state = this.numberChange(state, rowIndex, rowData, v)
        }
        else if (fieldName === 'taxRate') {
            state = this.taxRateChange(state, rowIndex, rowData, v, taxRates)
        }

        return state
    }

    numberChange = (state, rowIndex, rowData, v) => {
        const number = utils.number.round(v, 2),
            price = utils.number.round(rowData.price, 2),
            amount = utils.number.round(price * number, 2),
            tax = utils.number.round(amount * (rowData.tax ? rowData.tax.id : 0) / 100, 2),
            priceTaxTotal = utils.number.round(amount + tax, 2)

        state = this.metaReducer.sf(state, `data.form.details.${rowIndex}.number`, number)
        state = this.metaReducer.sf(state, `data.form.details.${rowIndex}.amount`, amount)
        state = this.metaReducer.sf(state, `data.form.details.${rowIndex}.tax`, tax)
        state = this.metaReducer.sf(state, `data.form.details.${rowIndex}.priceTaxTotal`, priceTaxTotal)

        return state
    }

    amountChange = (state, rowIndex, rowData, v) => {
        return state
    }

    priceChange = (state, rowIndex, rowData, v) => {
        const price = utils.number.round(v, 2),
            number = utils.number.round(rowData.number, 2),
            amount = utils.number.round(price * number, 2),
            tax = utils.number.round(amount * (rowData.tax ? rowData.tax.id : 0) / 100, 2),
            priceTaxTotal = utils.number.round(amount + tax, 2)

        state = this.metaReducer.sf(state, `data.form.details.${rowIndex}.price`, price)
        state = this.metaReducer.sf(state, `data.form.details.${rowIndex}.amount`, amount)
        state = this.metaReducer.sf(state, `data.form.details.${rowIndex}.tax`, tax)
        state = this.metaReducer.sf(state, `data.form.details.${rowIndex}.priceTaxTotal`, priceTaxTotal)
        return state
    }

    taxRateChange = (state, rowIndex, rowData, v, taxRates) => {
        const hit = taxRates.find(o => o.id == v)

        if (!hit)
            return

        const amount = rowData.amount,
            tax = utils.number.round(amount * hit.id / 100, 2),
            priceTaxTotal = utils.number.round(amount + tax, 2)
        state = this.metaReducer.sf(state, `data.form.details.${rowIndex}.taxRate`, fromJS(taxRate))
        state = this.metaReducer.sf(state, `data.form.details.${rowIndex}.tax`, fromJS(tax))
        state = this.metaReducer.sf(state, `data.form.details.${rowIndex}.priceTaxTotal`, priceTaxTotal)

        return state

    }
}
