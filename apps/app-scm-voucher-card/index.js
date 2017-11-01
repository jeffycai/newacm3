import config from './config'
import * as data from './data'

export default {
	name: "app-scm-voucher-card",
	version: "1.0.2",
	description: "app-scm-voucher-card",
	meta: data.getMeta(),
	components: [],
	dependencies:['mk-aar-grid'],
	config: config,
	load: (cb) => {
		require.ensure([], require => {
			cb(require('./component'), require('./action'), require('./reducer'))
		}, "app-scm-voucher-card")
	}
}