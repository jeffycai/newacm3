import { Map, List, fromJS } from 'immutable'
import { reducer as MetaReducer } from 'mk-meta-engine'
import config from './config'
import moment from 'moment'
import { getInitState } from './data'

class reducer {
    constructor(option) {
        this.metaReducer = option.metaReducer
    }

    init = (state, option) => {
        return this.metaReducer.init(state, getInitState(option))
    }

    load = (state, { person }) => {
        return this.metaReducer.sf(state, 'data.other.person', fromJS(person))
    }


    setperson = (state, person) => {
        state = this.metaReducer.sf(state, 'data.form', fromJS(person))
        return state
    }


}

export default function creator(option) {
    const metaReducer = new MetaReducer(option),
        o = new reducer({ ...option, metaReducer })

    return { ...metaReducer, ...o }
}