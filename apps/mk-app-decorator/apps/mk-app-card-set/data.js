import moment from 'moment'
import * as action from './action'

export function getMeta() {
	return {
		name: 'root',
		component: 'Layout',
		className: 'mk-app-card-set',
		children: [
			getHeaderMeta(),
			getContentMeta()
		]
	}
}

export function getHeaderMeta() {
	return {
		name: 'header',
		component: 'Layout',
		className: 'x-list-header',
		childrens: [
			getHeaderRightMeta()
		]
	}
}

export function getHeaderRightMeta() {
	return {
		name: 'headerRight',
		component: 'Layout',
		className: 'x-list-header-right',
		childrens: [{
			name: 'recover',
			component: 'Button',
			type: 'primary',
			colorStyle: 'orange',
			text: '恢复默认'
		}]
	}
}

export function getContentMeta() {
	return {
		name: 'content',
		component: 'Layout',
		className: 'x-list-content',
		childrens: [
			getTabMeta()
		]
	}
}

export function getTabMeta() {
	let meta = {
		name: 'headTabList',
		component: 'Tabs',
		activeKey: '0',
		enabledInternalActiveKey: false,
		childrens: []
	}

	if (action.initDataInfo) {

		if (action.initDataInfo.list) {
			meta.childrens.push({
				name: 'list',
				title: '列表',
				component: 'FormItems',
				childrens: []
			})
		} else if (action.initDataInfo.voucher) {
			meta.childrens.push({
				name: 'voucherHead',
				title: '表头',
				component: 'FormItems',
				childrens: []
			}, {
					name: 'voucherBody',
					title: '表体',
					visible: false,
					component: 'FormItems',
					childrens: []
				})
		}

		let metaList = [],
			visibleMetaList = action.initDataInfo.visibleList[0].details
		visibleMetaList.map((o, i) => {
			if (o.isHead) {
				meta.childrens[0].childrens.push({
					name: o.propertyName,
					title: o.propertyTitle,
					component: 'Checkbox',
					bindField: 'list.details.' + o.propertyName
				})
			} else {
				if (meta.childrens[1]) {
					meta.childrens[1].childrens.push({
						name: o.propertyName,
						title: o.propertyTitle,
						component: 'Checkbox',
						bindField: 'list.details.' + o.propertyName
					})
				}
			}
		})
		let visibleIndex = []
		for (let i in meta.childrens) {
			if (meta.childrens[i].childrens.length == 0) {
				visibleIndex.push(i)
			}
		}
		if (visibleIndex.length) {
			visibleIndex.map(o => {
				meta.childrens.splice(o, 1)
			})
		}
	}
	return meta
}

export function getInitState() {
	return {
		data: {
			form: {
				code: '',
				name: ''
			},
			other: {

			}
		}
	}
}