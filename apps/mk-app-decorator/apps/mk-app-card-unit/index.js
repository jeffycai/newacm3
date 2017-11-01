import config from './config'
import * as data from './data'

export default {
	name: "mk-app-card-unit",
	version: "1.0.0",
	description: "mk-app-card-unit",
	meta: data.getMeta(),
	components: [],
	config: config,
	load: (cb) => {
		require.ensure([], require => {
			cb(require('./component'), require('./action'), require('./reducer'))
		}, "mk-app-card-unit")
	}
}