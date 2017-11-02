import moment from 'moment'

export function getMeta() {
	return {
		name: 'root',
		component: 'Layout',
		className: 'mk-app-card-customer',
		children: [{
			name: 'codeItem',
			component: 'Form.Item',
			label: '编码',
			required: true,
			validateStatus: "{{data.other.error.code?'error':'success'}}",
			help: '{{data.other.error.code}}',
			children: [{
				name: 'code',
				component: 'Input',
				value: '{{data.form.code}}',
				onChange: "{{(e)=>$fieldChange('data.form.code',e.target.value)}}"
			}]

		}, {
			name: 'nameItem',
			component: 'Form.Item',
			label: '名称',
			required: true,
			validateStatus: "{{data.other.error.name?'error':'success'}}",
			help: '{{data.other.error.name}}',
			children: [{
				name: 'name',
				component: 'Input',
				value: '{{data.form.name}}',
				onChange: "{{(e)=>$fieldChange('data.form.name',e.target.value)}}"
			}]
		}, {
			name: 'beginningBalanceItem',
			component: 'Form.Item',
			label: '期初余额',
			children: [{
				name: 'beginningBalance',
				component: 'Input',
				value: '{{data.form.beginningBalance}}',
				onChange: "{{(e)=>$fieldChange('data.form.beginningBalance',e.target.value)}}"
			}]
		}, {
			name: 'statusItem',
			component: 'Form.Item',
			label: '停用',		
			children: [{
				name: 'status',
				component: 'Checkbox',
				value: '{{data.form.status}}',
				onChange: "{{(e)=>$fieldChange('data.form.status',e.target.value)}}"
			}]
		}]
	}
}

export function getInitState() {
	return {
		data: {
			form: {
				code: '',
				name: ''
			},
			other: {
				error: {}
			}
		}
	}
}