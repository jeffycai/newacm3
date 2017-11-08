import moment from 'moment'

export function getMeta() {
	return {
		name: 'root',
		component: 'Layout',
		className: 'mk-app-card-person',
		children: [{
			name: 'form',
			component: 'Form',
			className: 'mk-app-card-person-form',
			children: [{
				name: 'mobileItem',
				component: 'Form.Item',
				label: '注册手机号',
				validateStatus: "{{data.other.error.mobile?'error':'success'}}",
				help: '{{data.other.error.mobile}}',
				children: [{
					name: 'mobile',
					component: 'Input.Number',
					value: '{{data.form.mobile}}',
					onChange: `{{(v)=>$setField('data.form.mobile',v)}}`,
				}]
			}, {
				name: 'emailItem',
				component: 'Form.Item',
				label: '邮箱',
				validateStatus: "{{data.other.error.email?'error':'success'}}",
				help: '{{data.other.error.email}}',
				children: [{
					name: 'email',
					component: 'Input',
					value: '{{data.form.email}}',
					onChange: `{{(v)=>$setField('data.form.email',v.target.value)}}`,
				}]
			}, {
				name: 'nameItem',
				component: 'Form.Item',
				label: '姓名',
				required: true,
				validateStatus: "{{data.other.error.name?'error':'success'}}",
				help: '{{data.other.error.name}}',
				children: [{
					name: 'name',
					component: 'Input',
					value: '{{data.form.name}}',
					onChange: `{{(e)=>$fieldChange('data.form.name',e.target.value)}}`,
				}]
			}, {
				name: 'identityNumberItem',
				component: 'Form.Item',
				label: '身份证',
				validateStatus: "{{data.other.error.identityNumber?'error':'success'}}",
				help: '{{data.other.error.identityNumber}}',
				children: [{
					name: 'ids',
					component: 'Input',
					value: '{{data.form.identityNumber}}',
					onChange: `{{(v)=>$setField('data.form.identityNumber',v.target.value)}}`,
				}]
			}, {
				name: 'departmentItem',
				component: 'Form.Item',
				label: '所属部门',
				required: true,
				validateStatus: "{{data.other.error.department?'error':'success'}}",
				help: '{{data.other.error.department}}',
				children: [{
					name: 'department',
					component: 'Select',
					dropdownFooter: {
						name: 'add',
						component: 'Button',
						type: 'primary',
						style: { width: '100%' },
						children: '新增',
						onClick: '{{$addDepartment}}'
					},
					value: '{{data.form.deptName}}',
					//onFocus: '{{$departmentFocus}}',
					onChange: "{{(v)=>$departmentChange('data.form.departmentId', v)}}",
					children: {
						name: 'option',
						component: 'Select.Option',
						value: "{{ data.other.departments && data.other.departments[_rowIndex].id }}",
						children: '{{data.other.departments && data.other.departments[_rowIndex].name }}',
						_power: 'for in data.other.departments'
					}
				}]
			}, {
				name: 'jobDutyItem',
				component: 'Form.Item',
				label: '职位',
				validateStatus: "{{data.other.error.jobDuty?'error':'success'}}",
				help: '{{data.other.error.position}}',
				children: [{
					name: 'jobDuty',
					component: 'Input',
					value: '{{data.form.jobDuty}}',
					onChange: `{{(v)=>$setField('data.form.jobDuty',v.target.value)}}`,
				}]
			}, {
				name: 'sexItem',
				component: 'Form.Item',
				label: '性别',
				children: [{
					name: 'sex',
					component: 'Radio.Group',
					value: '{{data.form.sex}}',
					onChange: '{{(v)=>$setField("data.form.sex", v.target.value)}}',
					children: [{
						name: 'male',
						component: 'Radio',
						value: '200000000000000',
						children: '男'
					}, {
						name: 'female',
						component: 'Radio',
						value: '200000000000001',
						children: '女'
					}, {
						name: 'secrecy',
						component: 'Radio',
						value: '200000000000002',
						children: '保密'
					}]
				}]
			}, {
				name: 'maritalStatusItem',
				component: 'Form.Item',
				label: '婚姻状况',
				children: [{
					name: 'maritalStatus',
					component: 'Select',
					//showSearch: false,
					value: '{{data.form.maritalStatus}}',
					onChange: "{{(v)=>$setField('data.form.maritalStatus', v)}}",
					children: [{
						name: 'unknown',
						component: 'Select.Option',
						value: '200000000000010',
						children: '未知'
					}, {
						name: 'married',
						component: 'Select.Option',
						value: '200000000000011',
						children: '已婚'
					}, {
						name: 'unmarried',
						component: 'Select.Option',
						value: '200000000000012',
						children: '未婚'
					}]
				}]
			}, {
				name: 'qualificationsItem',
				component: 'Form.Item',
				label: '学历',
				children: [{
					name: 'qualifications',
					component: 'Input',
					value: '{{data.form.qualifications}}',
					onChange: "{{(e)=>$setField('data.form.qualifications',e.target.value)}}"
				}]
			}, {
				name: 'majorItem',
				component: 'Form.Item',
				label: '专业',
				children: [{
					name: 'major',
					component: 'Input',
					value: '{{data.form.major}}',
					onChange: "{{(e)=>$setField('data.form.major',e.target.value)}}"
				}]
			}, {
				name: 'beginWorkItem',
				component: 'Form.Item',
				label: '参加工作时间',
				children: [{
					name: 'beginWork',
					component: 'DatePicker',
					value: '{{$stringToMoment(data.form.beginWork)}}',
					onChange: "{{(v)=>$sf('data.form.beginWork', $momentToString(v,'YYYY-MM-DD'))}}",
				}]
			}, {
				name: 'entryDateItem',
				component: 'Form.Item',
				label: '入职时间',
				children: [{
					name: 'entryDate',
					component: 'DatePicker',
					value: '{{$stringToMoment(data.form.entryDate)}}',
					onChange: "{{(v)=>$sf('data.form.entryDate', $momentToString(v,'YYYY-MM-DD'))}}",
				}]
			}, {
				name: 'professionItem',
				component: 'Form.Item',
				label: '专业职称／职业资格',
				children: [{
					name: 'profession',
					component: 'Input',
					value: '{{data.form.profession}}',
					onChange: "{{(e)=>$setField('data.form.profession',e.target.value)}}"
				}]
			}, {
				name: 'birthDateItem',
				component: 'Form.Item',
				label: '出生日期',
				children: [{
					name: 'birthDate',
					component: 'DatePicker',
					value: '{{$stringToMoment(data.form.birthDate)}}',
					onChange: "{{(v)=>$sf('data.form.birthDate', $momentToString(v,'YYYY-MM-DD'))}}",
				}]
			}]
		}]
	}
}

export function getInitState(option) {
	var state = {
		data: {
			form: {
				//mobile: null,
				//email: null,
				name: null,
				//identityNumber: null,
				departmentId: null,
				deptName: null,
				orgId: null,
				//jobDuty: null,
				sex: '200000000000000',
				maritalStatus: '200000000000010',
				//qualifications: null,
				//major: null,
				beginWork: null,
				entryDate: null,
				//profession: null,
				birthDate: null,
				customerId: null,
				rIds: []
			},
			other: {
				departments: [],
				error: {}
			}
		}
	}

	state.data.other.isPop = !!option.isPop //是否弹出卡片使用

	return state
}