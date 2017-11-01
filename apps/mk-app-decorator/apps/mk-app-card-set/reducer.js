import { Map, List, fromJS } from 'immutable'
import { reducer as MetaReducer } from 'mk-meta-engine'
import config from './config'
import moment from 'moment'
import { getInitState } from './data'

class reducer {
    constructor(option) {
        this.metaReducer = option.metaReducer
    }

    init = (state) => {
        return this.metaReducer.init(state, getInitState())
    }

    load = (state, { customer }) => {
        return this.metaReducer.sf(state, 'data.other.customer', fromJS(customer))
    }


    setField = (state, fieldPath, value) => {
        state = this.metaReducer.setField(state, fieldPath, value)
        return this.setCheckFields(state, fieldPath)
    }

    setCheckFields = (state, fields) => {
        if (!fields) return statefields
        var checkFields = this.metaReducer.gf(state, 'data.other.checkFields') || List()

        if (typeof fields == 'string') {
            checkFields = checkFields.includes(fields) ? checkFields : checkFields.push(fields)
            return this.metaReducer.sf(state, 'data.other.checkFields', checkFields)
        }
        if (fields instanceof Array) {
            fields.forEach(field => {
                checkFields = checkFields.includes(field) ? checkFields : checkFields.push(field)
            })

            return this.metaReducer.sf(state, 'data.other.checkFields', checkFields)
        }

        return state
    }
}

export default function creator(option) {
    const metaReducer = new MetaReducer(option),
        o = new reducer({ ...option, metaReducer })

    return { ...metaReducer, ...o }
}