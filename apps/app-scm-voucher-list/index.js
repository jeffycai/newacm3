import config from './config'
import * as data from './data'

export default {
	name: "app-scm-voucher-list",
	version: "1.0.7",
	description: "app-scm-voucher-list",
	meta: data.getMeta(),
	components: [],
	dependencies: ['mk-aar-grid'],
	config: config,
	load: (cb) => {
		require.ensure([], require => {
			cb(require('./component'), require('./action'), require('./reducer'))
		}, "app-scm-voucher-list")
	}
}