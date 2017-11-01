import config from './config'
import * as data from './data'

export default {
	name: "mk-app-card-set",
	version: "1.0.0",
	description: "mk-app-card-set",
	meta: data.getMeta(),
	components: [],
	config: config,
	load: (cb) => {
		require.ensure([], require => {
			cb(require('./component'), require('./action'), require('./reducer'))
		}, "mk-app-card-customer")
	}
}