import { config, start, componentFactory } from 'mk-meta-engine'
import * as mkComponents from 'mk-component'
import myConfig  from './config'

import app_scm_voucher_card from './apps/app-scm-voucher-card/index.js'
import app_scm_voucher_list from './apps/app-scm-voucher-list/index.js'
import mk_app_apidoc from './apps/mk-app-apidoc/index.js'
import mk_app_bar_graph from './apps/mk-app-bar-graph/index.js'
import mk_app_card_assets from './apps/mk-app-decorator/apps/mk-app-card-assets/index.js'
import mk_app_card_customer from './apps/mk-app-decorator/apps/mk-app-card-customer/index.js'
import mk_app_card_department from './apps/mk-app-decorator/apps/mk-app-card-department/index.js'
import mk_app_card_inventory from './apps/mk-app-decorator/apps/mk-app-card-inventory/index.js'
import mk_app_card_person from './apps/mk-app-decorator/apps/mk-app-card-person/index.js'
import mk_app_card_project from './apps/mk-app-decorator/apps/mk-app-card-project/index.js'
import mk_app_card_set from './apps/mk-app-decorator/apps/mk-app-card-set/index.js'
import mk_app_card_unit from './apps/mk-app-decorator/apps/mk-app-card-unit/index.js'
import mk_app_devtools_test from './apps/mk-app-devtools/apps/mk-app-devtools-test/index.js'
import mk_app_devtools from './apps/mk-app-devtools/index.js'
import mk_app_home_chart from './apps/mk-app-home/apps/mk-app-home-chart/index.js'
import mk_app_home_list from './apps/mk-app-home/apps/mk-app-home-list/index.js'
import mk_app_home_shortcuts from './apps/mk-app-home/apps/mk-app-home-shortcuts/index.js'
import mk_app_home from './apps/mk-app-home/index.js'
import mk_app_hot_modify_app from './apps/mk-app-hot-modify-app/index.js'
import mk_app_login from './apps/mk-app-login/index.js'
import mk_app_meta_design_preview from './apps/mk-app-meta-design/apps/mk-app-meta-design-preview/index.js'
import mk_app_meta_design from './apps/mk-app-meta-design/index.js'
import mk_app_portal_about from './apps/mk-app-portal/apps/mk-app-portal-about/index.js'
import mk_app_portal_app1 from './apps/mk-app-portal/apps/mk-app-portal-app1/index.js'
import mk_app_portal_app2 from './apps/mk-app-portal/apps/mk-app-portal-app2/index.js'
import mk_app_portal from './apps/mk-app-portal/index.js'
import mk_app_root_about from './apps/mk-app-root/apps/mk-app-root-about/index.js'
import mk_app_root_helloWorld from './apps/mk-app-root/apps/mk-app-root-helloWorld/index.js'
import mk_app_root from './apps/mk-app-root/index.js'

const apps = {
		
	[app_scm_voucher_card.name]: app_scm_voucher_card,	
	[app_scm_voucher_list.name]: app_scm_voucher_list,	
	[mk_app_apidoc.name]: mk_app_apidoc,	
	[mk_app_bar_graph.name]: mk_app_bar_graph,	
	[mk_app_card_assets.name]: mk_app_card_assets,	
	[mk_app_card_customer.name]: mk_app_card_customer,	
	[mk_app_card_department.name]: mk_app_card_department,	
	[mk_app_card_inventory.name]: mk_app_card_inventory,	
	[mk_app_card_person.name]: mk_app_card_person,	
	[mk_app_card_project.name]: mk_app_card_project,	
	[mk_app_card_set.name]: mk_app_card_set,	
	[mk_app_card_unit.name]: mk_app_card_unit,	
	[mk_app_devtools_test.name]: mk_app_devtools_test,	
	[mk_app_devtools.name]: mk_app_devtools,	
	[mk_app_home_chart.name]: mk_app_home_chart,	
	[mk_app_home_list.name]: mk_app_home_list,	
	[mk_app_home_shortcuts.name]: mk_app_home_shortcuts,	
	[mk_app_home.name]: mk_app_home,	
	[mk_app_hot_modify_app.name]: mk_app_hot_modify_app,	
	[mk_app_login.name]: mk_app_login,	
	[mk_app_meta_design_preview.name]: mk_app_meta_design_preview,	
	[mk_app_meta_design.name]: mk_app_meta_design,	
	[mk_app_portal_about.name]: mk_app_portal_about,	
	[mk_app_portal_app1.name]: mk_app_portal_app1,	
	[mk_app_portal_app2.name]: mk_app_portal_app2,	
	[mk_app_portal.name]: mk_app_portal,	
	[mk_app_root_about.name]: mk_app_root_about,	
	[mk_app_root_helloWorld.name]: mk_app_root_helloWorld,	
	[mk_app_root.name]: mk_app_root,
}

apps.config = (options) => {
	Object.keys(options).forEach(key => {
		const reg = new RegExp(`^${key == '*' ? '.*' : key}$`)
		Object.keys(apps).forEach(appName => {
			if (appName != 'config') {
				if (reg.test(appName)) {
					apps[appName].config(options[key])
				}
			}
		})
	})
}

apps.config({ '*': { apps } })

config(myConfig({ apps }))

Object.keys(mkComponents).forEach(key=>{
	componentFactory.registerComponent(key, mkComponents[key])
})
	
start()