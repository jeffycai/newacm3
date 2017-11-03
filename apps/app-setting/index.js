import config from './config'
import * as data from './data'

export default {
	name: "app-setting",
	version: "1.0.0",
	description: "app-setting",
	meta: data.getMeta(),
	components: [],
	config: config,
	load: (cb) => {
		require.ensure([], require => {
			cb(require('./component'), require('./action'), require('./reducer'))
		}, "app-setting")
	}
}