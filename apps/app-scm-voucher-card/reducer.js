import { Map, List, fromJS } from 'immutable'
import { reducer as MetaReducer } from 'mk-meta-engine'
import config from './config'
import { getInitState } from './data'
import moment from 'moment'
import extend from './extend'

import decorator from '../mk-app-decorator/index'

class reducer {
    constructor(option) {
        this.metaReducer = option.metaReducer
        this.config = config.current
        this.voucherReducer = option.voucherReducer
    }

    init = (state, option) => {
        return this.metaReducer.init(state, getInitState())
    }

    load = (state, response) => {
        if (response) {
            //state = this.metaReducer.sf(state, 'data.form', fromJS(response))
        }
        else {
            state = this.metaReducer.sf(state, 'data', fromJS(getInitState().data))
        }
        // debugger
        state = this.metaReducer.sf(state, 'data.other.invoiceType', fromJS(response.invoiceType.enumDetail))
        return state
    }

    calc = (v) => (state, rowIndex, fieldName, rowData, params) => {
        debugger
        //this.voucherReducer.calc(state, rowIndex, fieldName, rowData, params)
    }

    setForm = (state, form) => {
        if (form)
            return this.metaReducer.sf(state, 'data.form', fromJS(form))
        else
            return this.metaReducer.sf(state, 'data.form', fromJS(getInitState().data.form))
    }
}

export default function creator(option) {
    const metaReducer = new MetaReducer(option),
        extendReducer = extend.reducerCreator({ ...option, metaReducer }),
        voucherReducer = decorator.reducerCreator({ ...option, metaReducer }),
        o = new reducer({ ...option, metaReducer, extendReducer, voucherReducer })

    return { ...metaReducer, ...extendReducer.gridReducer, ...o }
}