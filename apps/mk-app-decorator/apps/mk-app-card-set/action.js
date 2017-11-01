import React from 'react'
import { action as MetaAction, AppLoader } from 'mk-meta-engine'
import { List, fromJS } from 'immutable'
import moment from 'moment'
import config from './config'

class action {
    constructor(option) {
        this.metaAction = option.metaAction
        this.config = config.current
        this.webapi = this.config.webapi
    }

    onInit = ({ component, injections }) => {
        this.component = component
        this.injections = injections
        injections.reduce('init')

        if (this.component.props.setOkListener) {
            this.component.props.setOkListener(this.onOk)
        }

        injections.reduce('init', {
            isPop: this.component.props.isPop
        })
    }

}

export default function creator(option) {
    const metaAction = new MetaAction(option),
        o = new action({ ...option, metaAction }),
        ret = { ...metaAction, ...o }

    metaAction.config({ metaHandlers: ret })

    return ret
}