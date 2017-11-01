import { Toast, Notification, Modal } from 'mk-component'
import { fetch, history } from 'mk-utils'
import './mock.js' //脱离后台测试，启用mock，否则这行注释

import apiDoc from './apiDoc'

var _options = {}

//配置fetch
fetch.config({
	mock: false, //脱离后台测试，启用mock，否则这行注释

	//fetch支持切面扩展（before,after），对restful api统一做返回值或者异常处理
	after: (response, url) => {
		if (response.result) {
			if (response.token) {
				fetch.config({ token: response.token })
			}
			if(url === '/v1/user/login'){
				return response
			}
			return response.value
		}
		else {
			Toast.error(response.error.message)
			throw { url, response }
		}
	}
})

/*
//支持url hash别名配置
history.config({
	isAlias: (pathName) => {
		if(!pathName || pathName == '/')
			return false
		const reg = /\/(mk-app-root\/){0,1}(mk-app-portal\/){0,1}([\s\S]+)/
		const ret = pathName.match(reg)
		return !ret[1]
	},
	toAlias: (pathName) => {
		if(!pathName || pathName == '/')
			return false
		const reg = /\/(mk-app-root\/){0,1}(mk-app-portal\/){0,1}([\s\S]+)/
		return pathName.replace(reg, (all, root, portal, app) => {
			return all.replace(root, '').replace(portal, 'app-').replace(/mk-app-/g, '')
		})
	},
	toRealName: (pathName) => {
		const reg = /\/(app-){0,1}([\s\S]+)/
		return pathName.replace(reg, (all, portal, app) => {
			return `/mk-app-root/${portal ? 'mk-app-portal/' : ''}mk-app-${app}`
		})
	}
})
*/

function config(options) {
	Object.assign(_options, options)

	//对应用进行配置，key会被转换为'^<key>$'跟app名称正则匹配
	_options.apps && _options.apps.config({
		//'*': { webapi } //正式网站应该有一个完整webapi对象，提供所有web请求函数
		'mk-app-root': {
			startAppName: 'mk-app-login'
		},
		'mk-app-login': {
			goAfterLogin: {
				appName: 'mk-app-portal'
			}
		},
		'mk-app-portal': {
			menu: [{
				key: '1',
				name: '首页',
				appName: 'mk-app-home',
				icon: 'home',
				isDefault: true
			}, {
				key: '2',
				name: 'apps',
				isExpand: true,
				icon: 'appstore',
				children: [{
					key: '201',
					name: '单据测试',
					children: [{
						key: '20106',
						name: '销货单列表',
						appName: 'app-scm-voucher-list'
					}, {
						key: '20107',
						name: '销货单明细表',
						appName: 'mk-app-report'
					}]

				}, {
					key: '209',
					name: '开发工具',
					children: [{
						key: '20901',
						name: '开发工具整体',
						appName: 'mk-app-devtools'
					}, {
						key: '20902',
						name: '元数据设计',
						appName: 'mk-app-meta-design'
					}, {
						key: '20903',
						name: 'webapi文档',
						appName: 'mk-app-apidoc'
					}, {
						key: '20904',
						name: 'action监控',
						appName: 'mk-app-trace-action'
					}, {
						key: '20905',
						name: '元数据、状态修改',
						appName: 'mk-app-hot-modify-app'
					}]

				}]
			}]
		},
		'mk-app-apidoc': {
			apis: apiDoc
		}
	})

	_options.targetDomId = 'app' //react render到目标dom
	_options.startAppName = 'mk-app-root' //启动app名，需要根据实际情况配置

	_options.toast = Toast //轻提示使用组件，mk-meta-engine使用
	_options.notification = Notification //通知组件
	_options.modal = Modal //模式弹窗组件
	return _options
}

config.current = _options

export default config
