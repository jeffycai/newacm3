import consts from './consts'

export function getMeta() {
	return {
		name: 'root',
		component: 'Layout',
		className: 'app-scm-voucher-card',
		onMouseDown: '{{$mousedown}}',
		children: [{
			name: 'header',
			component: 'Layout',
			className: 'app-scm-voucher-card-header',
			children: [{
				name: 'left',
				component: 'Layout',
				className: 'app-scm-voucher-card-header-left',
				children: [{
					name: 'page',
					component: 'Button.Group',
					children: [{
						name: 'prev',
						component: 'Button',
						type: 'bluesky',
						icon: 'left',
						onClick: '{{$prev}}'
					}, {
						name: 'next',
						component: 'Button',
						type: 'bluesky',
						icon: 'right',
						onClick: '{{$next}}'
					}]
				}, {
					name: 'setting',
					component: 'Button',
					className: 'app-scm-voucher-card-iconbutton',
					type: 'showy',
					iconFontFamily: 'mkicon',
					icon: 'setting',
					title: '设置',
					onClick: '{{$setting}}'
				}]
			}, {
				name: 'right',
				component: 'Layout',
				className: 'app-scm-voucher-card-header-right',
				children: [{
					name: 'add',
					component: 'Button',
					type: 'showy',
					onClick: '{{$add}}',
					children: '新增'
				}, {
					name: 'audit',
					component: 'Button',
					type: 'bluesky',
					disabled: '{{!data.form.id}}',
					onClick: '{{$audit}}',
					children: '{{$getText()}}'
				}, {
					name: 'history',
					component: 'Button',
					type: 'bluesky',
					onClick: '{{$history}}',
					children: '历史单据'
				}, {
					name: 'more',
					component: 'Dropdown',
					overlay: {
						name: 'menu',
						component: 'Menu',
						onClick: '{{$moreMenuClick}}',
						children: [{
							name: 'del',
							component: 'Menu.Item',
							key: 'del',
							disabled: '{{!data.form.id || data.form.status === 128}}',
							children: '删除'
						}, {
							name: 'reject',
							component: 'Menu.Item',
							key: 'reject',
							disabled: '{{!data.form.id}}',
							children: '生成红字销售订单'
						}, {
							name: 'receipt',
							component: 'Menu.Item',
							key: 'receipt',
							disabled: '{{!data.form.id}}',
							children: '收款'
						}]
					},
					children: {
						name: 'internal',
						component: 'Button',
						type: 'bluesky',
						children: ['更多', {
							name: 'down',
							component: 'Icon',
							type: 'down'
						}]
					}
				}]
			}]
		}, {
			name: 'title',
			component: 'Layout',
			className: 'app-scm-voucher-card-title',
			children: [{
				name: 'left',
				component: 'Layout',
				className: 'app-scm-voucher-card-title-left',
				children: [{
					name: 'audited',
					component: '::img',
					className: 'app-scm-voucher-card-title-left-tag',
					src: require('./img/audited.png'),
					_visible: '{{data.form.status===128?true:false}}'
				}, {
					name: 'settleStatus',
					component: '::img',
					className: 'app-scm-voucher-card-title-left-tag',
					src: require('./img/settle.png'),
					_visible: '{{data.form.status===131?true:false}}'
				}]
			}, {
				name: 'center',
				component: '::div',
				className: 'app-scm-voucher-card-title-center',
				children: {
					name: 'title',
					component: '::h1',
					style: { fontWeight:'bold'},
					children: '销售订单'
				}
			}, {
				name: 'right',
				component: 'Layout',
				className: 'app-scm-voucher-card-title-right',
				children: ['单据编号:', {
					name: 'code',
					component: '::div',
					className: 'code',
					style: { marginRight: 10 },
					children: "{{data.form.code || ''}}"
				}, {
						name: 'attachment',
						component: 'Attachment',
						data: '{{data.form.attachmentFiles}}'
					}]
			}]
		}, {
			name: 'formHeader',
			component: 'Form',
			className: 'app-scm-voucher-card-form-header',
			children: [{
				name: 'customerItem',
				component: 'Form.Item',
				required: true,
				//validateStatus: 'info',
				//help: '应收余额:0.00',
				label: '客户',
				children: [{
					name: 'customer',
					component: 'Select',
					placeholder: '按名称/拼音搜索',
					showSearch: true,
					disabled: '{{$getControlEnable()}}',
					value: '{{data.form.customer && data.form.customer.name }}',
					onChange: '{{$onFieldChange(`customer`)}}',
					onFocus: "{{$customerFocus}}",
					children: {
						name: 'option',
						component: 'Select.Option',
						value: "{{ data.other.customer && data.other.customer[_rowIndex].id }}",
						children: '{{data.other.customer && data.other.customer[_rowIndex].name }}',
						_power: 'for in data.other.customer'
					},
					dropdownFooter: {
						name: 'add',
						component: 'Button',
						type: 'primary',
						style: { width: '100%' },
						children: '新增',
						onClick: '{{$addCustomer}}'
					},
				}]
			}, {
				name: 'invoiceTypeItem',
				component: 'Form.Item',
				label: '票据类型',
				required: true,
				children: [{
					name: 'invoiceType',
					component: 'Select',
					showSearch: false,
					disabled: '{{$getControlEnable()}}',
					value: '{{data.form.invoiceType && data.form.invoiceType.enumItemId }}',
					onChange: `{{(v)=>$sf('data.form.invoiceType', $fromJS(data.other.invoiceType.find(o=>o.enumItemId==v),null))}}`,
					onFocus: "{{$invoiceTypeFocus}}",
					children: {
						name: 'option',
						component: 'Select.Option',
						value: "{{ data.other.invoiceType && data.other.invoiceType[_rowIndex].enumItemId }}",
						children: '{{data.other.invoiceType && data.other.invoiceType[_rowIndex].enumItemName }}',
						_power: 'for in data.other.invoiceType'
					}
				}]
			},{
				name:'invoiceNumberItem',
				component:'Form.Item',
				label:'发票号码',
				required:false,
				_visible:'{{data.other.columnSetting && data.other.columnSetting.filter(o=> o.propertyName === "invoiceNumber" )[0].visible }}',
				children:{
					name: 'invoiceNumber',
					disabled: '{{$getControlEnable()}}',
					component: 'Input',
					value: '{{data.form.invoiceNumber}}',
					onChange: '{{(e)=>$sf("data.form.invoiceNumber",e.target.value)}}'
				}
			},{
				name:'invoiceCodeItem',
				component:'Form.Item',
				label:'发票代码',
				required:false,
				_visible:'{{data.other.columnSetting && data.other.columnSetting.filter(o=> o.propertyName === "invoiceCode" )[0].visible }}',
				children:{
					name: 'invoiceCode',
					component: 'Input',
					disabled: '{{$getControlEnable()}}',
					value: '{{data.form.invoiceCode}}',
					onChange: '{{(e)=>$sf("data.form.invoiceCode",e.target.value)}}'
				}
			}, {
				name: 'departmentItem',
				component: 'Form.Item',
				required: false,
				validateStatus: 'info',
				label: '部门',
				_visible:'{{data.other.columnSetting && data.other.columnSetting.filter(o=> o.propertyName === "department" )[0].visible }}',
				children: [{
					name: 'department',
					component: 'Select',
					showSearch: true,
					disabled: '{{$getControlEnable()}}',
					value: '{{data.form.department && data.form.department.name }}',
					onChange: `{{(v)=>$sf('data.form.department', $fromJS(data.other.department.find(o=>o.id==v),null))}}`,
					onFocus: "{{$departmentFocus}}",
					children: {
						name: 'option',
						component: 'Select.Option',
						value: "{{ data.other.department && data.other.department[_rowIndex].id }}",
						children: '{{data.other.department && data.other.department[_rowIndex].name }}',
						_power: 'for in data.other.department'
					},
					dropdownFooter: {
						name: 'add',
						component: 'Button',
						type: 'primary',
						style: { width: '100%' },
						children: '新增',
						onClick: '{{$addDepartment}}'
					},
				}]
			}, {
				name: 'personItem',
				component: 'Form.Item',
				validateStatus: 'info',
				label: '业务员',
				_visible:'{{data.other.columnSetting && data.other.columnSetting.filter(o=> o.propertyName === "salesPerson" )[0].visible }}',
				children: [{
					name: 'person',
					component: 'Select',
					showSearch: true,
					disabled: '{{$getControlEnable()}}',

					value: '{{data.form.salesPerson && data.form.salesPerson.name }}',
					onChange: `{{(v)=>$sf('data.form.salesPerson', $fromJS(data.other.salesPerson.find(o=>o.id==v),null))}}`,
					onFocus: "{{$salesPersonFocus}}",
					children: {
						name: 'option',
						component: 'Select.Option',
						value: "{{ data.other.salesPerson && data.other.salesPerson[_rowIndex].id }}",
						children: '{{data.other.salesPerson && data.other.salesPerson[_rowIndex].name }}',
						_power: 'for in data.other.salesPerson'
					},
					dropdownFooter: {
						name: 'add',
						component: 'Button',
						type: 'primary',
						style: { width: '100%' },
						children: '新增',
						onClick: '{{$addPerson}}'
					},
				}]
			}, {
				name: 'projectItem',
				component: 'Form.Item',
				required: false,
				validateStatus: 'info',
				label: '项目',
				_visible:'{{data.other.columnSetting && data.other.columnSetting.filter(o=> o.propertyName === "project" )[0].visible }}',
				children: [{
					name: 'project',
					component: 'Select',
					showSearch: true,
					disabled: '{{$getControlEnable()}}',
					value: '{{data.form.project && data.form.project.name }}',
					onChange: `{{(v)=>$sf('data.form.project', $fromJS(data.other.project.find(o=>o.id==v),null))}}`,
					onFocus: "{{$projectFocus}}",
					children: {
						name: 'option',
						component: 'Select.Option',
						value: "{{ data.other.project && data.other.project[_rowIndex].id }}",
						children: '{{data.other.project && data.other.project[_rowIndex].name }}',
						_power: 'for in data.other.project'
					},
					dropdownFooter: {
						name: 'add',
						component: 'Button',
						type: 'primary',
						style: { width: '100%' },
						children: '新增',
						onClick: '{{$addProject}}'
					},
				}]
			}, {
				name: 'dateItem',
				component: 'Form.Item',
				label: '记账日期',
				required: true,
				children: [{
					name: 'businessDate',
					component: 'DatePicker',
					disabled: '{{$getControlEnable()}}',
					value: '{{$stringToMoment(data.form.businessDate)}}',
					onChange: "{{(d)=>$sf('data.form.businessDate',$momentToString(d,'YYYY-MM-DD'))}}",
				}]
			},{
				name: 'remarkItem',
				component: 'Form.Item',
				label: '备注',
				className: 'app-scm-voucher-card-form-header-remark',
				children: [{
					name: 'remark',
					component: 'Input',
					disabled: '{{$getControlEnable()}}',
					value: '{{data.form.remark}}',
					onChange: "{{(e)=>$sf('data.form.remark',e.target.value)}}",
				}]
			}]
		}, {
			name: 'details',
			component: 'DataGrid',
			className: 'app-scm-voucher-card-form-details',
			headerHeight: 35,
			rowHeight: 35,
			footerHeight: 35,
			rowsCount: '{{(data.form.details && data.form.details.length) ?data.form.details.length:1 }}',
			enableSequence: true,
			enableAddDelrow: true,
			startSequence: 1,
			sequenceFooter: {
				name: 'footer',
				component: 'DataGrid.Cell',
				children: '合计'
			},
			readonly: false,
			onAddrow: "{{$addRow('details')}}",
			onDelrow: "{{$delRow('details')}}",
			onKeyDown: '{{$gridKeydown}}',
			scrollToColumn: '{{data.other.detailsScrollToColumn}}',
			scrollToRow: '{{data.other.detailsScrollToRow}}',
			columns: [ {
				name: 'inventoryName',
				component: 'DataGrid.Column',
				columnKey: 'inventoryName',
				flexGrow: 1,
				width: 100,
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: '存货名称'
				},
				cell: {
					name: 'cell',
					component: "DataGrid.TextCell",
					className: "{{$getCellClassName(_ctrlPath) + ' app-scm-voucher-card-cell-disabled'}}",
					value: "{{data.form.details[_rowIndex] && data.form.details[_rowIndex].inventory && data.form.details[_rowIndex].inventory.name}}",
					_power: '({rowIndex})=>rowIndex',
				}
			}, {
				name: 'specification',
				component: 'DataGrid.Column',
				columnKey: 'specification',
				flexGrow: 1,
				width: 100,
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: '规格型号'
				},
				cell: {
					name: 'cell',
					component: "DataGrid.TextCell",
					className: "{{$getCellClassName(_ctrlPath) + ' app-scm-voucher-card-cell-disabled'}}",
					value: "{{data.form.details[_rowIndex] && data.form.details[_rowIndex].inventory && data.form.details[_rowIndex].inventory.specification}}",
					_power: '({rowIndex})=>rowIndex',
				}
			}, {
				name: 'unit',
				component: 'DataGrid.Column',
				columnKey: 'unit',
				//flexGrow: 1,
				width: 80,
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: '计量单位'
				},
				cell: {
					name: 'cell',
					component: "DataGrid.TextCell",
					className: "{{$getCellClassName(_ctrlPath) + ' app-scm-voucher-card-cell-disabled'}}",
					value: "{{data.form.details[_rowIndex] && data.form.details[_rowIndex].inventory && data.form.details[_rowIndex].inventory.unitName}}",
					_power: '({rowIndex})=>rowIndex',
				}
			}, {
				name: 'isGift',
				component: 'DataGrid.Column',
				columnKey: 'isGift',
				_visible: '{{$getControlVisible()}}',
				width: 100,
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: '赠品'
				},
				cell: {
					name: 'cell',
					component: "{{$isFocus(_ctrlPath) ? 'Checkbox' : 'DataGrid.TextCell'}}",
					className: "{{$getCellClassName(_ctrlPath)}}",
					value: "{{ (data.form.details[_rowIndex] && data.form.details[_rowIndex].isGift) ? '是': '' }}",
					checked: "{{ data.form.details[_rowIndex] && data.form.details[_rowIndex].isGift }}",
					onChange: "{{(e)=>$sf('data.form.details.' + _rowIndex + '.isGift', e.target.checked)}}",
					_power: '({rowIndex})=>rowIndex',
				}
			}, {
				name: 'quantity',
				component: 'DataGrid.Column',
				columnKey: 'quantity',
				width: 100,
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: '数量'
				},
				cell: {
					name: 'cell',
					component: "{{$isFocus(_ctrlPath) ? 'Input.Number' : 'DataGrid.TextCell'}}",
					className: "{{$getCellClassName(_ctrlPath) + ' app-scm-voucher-card-cell-right'}}",
					value: "{{$quantityFormat(data.form.details[_rowIndex].quantity,2,$isFocus(_ctrlPath))}}",
					onChange: "{{$calc('quantity',_rowIndex,data.form.details[_rowIndex])}}",
					_power: '({rowIndex})=>rowIndex',
				}
			}, {
				name: 'price',
				component: 'DataGrid.Column',
				columnKey: 'price',
				width: 100,
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: '单价'
				},
				cell: {
					name: 'cell',
					component: "{{$isFocus(_ctrlPath) ? 'Input.Number' : 'DataGrid.TextCell'}}",
					className: "{{$getCellClassName(_ctrlPath) + ' app-scm-voucher-card-cell-right'}}",
					value: "{{$quantityFormat(data.form.details[_rowIndex].price,2,$isFocus(_ctrlPath))}}",
					onChange: "{{$calc('price',_rowIndex,data.form.details[_rowIndex])}}",
					_power: '({rowIndex})=>rowIndex',
				}
			}, {
				name: 'amount',
				component: 'DataGrid.Column',
				columnKey: 'amount',
				width: 100,
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: '金额'
				},
				cell: {
					name: 'cell',
					component: "{{$isFocus(_ctrlPath) ? 'Input.Number' : 'DataGrid.TextCell'}}",
					className: "{{$getCellClassName(_ctrlPath) + ' app-scm-voucher-card-cell app-scm-voucher-card-cell-right'}}",
					value: "{{$quantityFormat(data.form.details[_rowIndex].amount, 2)}}",
					onChange: "{{$calc('amount',_rowIndex,data.form.details[_rowIndex])}}",
					_power: '({rowIndex})=>rowIndex',
				},
				footer: {
					name: 'footer',
					component: 'DataGrid.Cell',
					className: 'app-scm-voucher-card-list-cell-right',
					children: '{{$sumAmount(`amount`)}}'
				}
			}, {
				name: 'taxRate',
				component: 'DataGrid.Column',
				columnKey: 'taxRate',
				width: 100,
				_visible: '{{$getControlVisible()}}',
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: '税率'
				},
				cell: {
					name: 'cell',
					component: "{{$isFocus(_ctrlPath) ? 'Select' : 'DataGrid.TextCell'}}",
					className: "{{$getCellClassName(_ctrlPath)}}",
					showSearch: false,
					value: `{{{
								if(data.form.details[_rowIndex] && !data.form.details[_rowIndex].taxRate) return
								return $isFocus(_ctrlPath)
									? data.form.details[_rowIndex].taxRate.id
									: data.form.details[_rowIndex].taxRate.name
							}}}`,
					onChange: "{{$calc('taxRate',_rowIndex, data.form.details[_rowIndex])}}",
					onFocus: "{{$taxRateFocus}}",
					children: {
						name: 'option',
						component: 'Select.Option',
						value: "{{ data.other.taxRate && data.other.taxRate[_lastIndex].id }}",
						children: '{{data.other.taxRate && data.other.taxRate[_lastIndex].name }}',
						_power: 'for in data.other.taxRate'
					},
					_excludeProps: "{{$isFocus(_ctrlPath)? ['onClick'] : ['children'] }}",
					_power: '({rowIndex})=>rowIndex',
				}
			}, {
				name: 'tax',
				component: 'DataGrid.Column',
				columnKey: 'tax',
				width: 100,
				_visible: '{{$getControlVisible()}}',
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: '税额'
				},
				cell: {
					name: 'cell',
					component: "{{$isFocus(_ctrlPath) ? 'Input.Number' : 'DataGrid.TextCell'}}",
					className: "{{$getCellClassName(_ctrlPath) + ' app-scm-voucher-card-cell app-scm-voucher-card-cell-right'}}",
					value: "{{$quantityFormat(data.form.details[_rowIndex].tax, 2)}}",
					onChange: "{{$calc('tax',_rowIndex,data.form.details[_rowIndex])}}",
					_power: '({rowIndex})=>rowIndex',
				},
				footer: {
					name: 'footer',
					component: 'DataGrid.Cell',
					className: 'app-scm-voucher-card-list-cell-right',
					children: '{{$sumTax(`tax`)}}'
				}
			}, {
				name: 'amountWithTax',
				component: 'DataGrid.Column',
				columnKey: 'amountWithTax',
				width: 100,
				_visible: '{{$getControlVisible()}}',
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: '价税合计'
				},
				cell: {
					name: 'cell',
					component: "{{$isFocus(_ctrlPath) ? 'Input.Number' : 'DataGrid.TextCell'}}",
					className: "{{$getCellClassName(_ctrlPath) + ' app-scm-voucher-card-cell app-scm-voucher-card-cell-right'}}",
					value: "{{$quantityFormat(data.form.details[_rowIndex].amountWithTax, 2)}}",
					onChange: "{{$calc('amountWithTax',_rowIndex,data.form.details[_rowIndex])}}",
					_power: '({rowIndex})=>rowIndex',
				},
				footer: {
					name: 'footer',
					component: 'DataGrid.Cell',
					className: 'app-scm-voucher-card-list-cell-right',
					children: '{{$sumAmountWithTax(`amountWithTax`)}}'
				}
			}]
		}, {
			name: 'formFooter',
			component: 'Layout',
			className: 'app-scm-voucher-card-form-footer',
			children: [{
				name: 'settlement',
				component: 'Form',
				className: 'app-scm-voucher-card-form-footer-settlement',
				children: [/*{
					name: 'settlementModeItem',
					component: 'Form.Item',
					label: '结算方式',
					children: [{
						name: 'settlementMode',
						component: 'Select',
						showSearch: false,
						value: '{{data.form.settlementMode && data.form.settlementMode.id }}',
						onChange: `{{(v)=>$sf('data.form.settlementMode', $fromJS(data.other.settlementModes.find(o=>o.id==v),null))}}`,
						onFocus: "{{$settlementModeFocus}}",
						children: {
							name: 'option',
							component: 'Select.Option',
							value: "{{ data.other.settlementModes && data.other.settlementModes[_lastIndex].id }}",
							children: '{{data.other.settlementModes && data.other.settlementModes[_lastIndex].name }}',
							_power: 'for in data.other.settlementModes'
						}
					}]
				},*/ {
						name: 'bankAccountItem',
						component: 'Form.Item',
						_visible:'{{data.other.columnSetting && data.other.columnSetting.filter(o=> o.propertyName === "bankAccount" )[0].visible }}',
						label: '现结账户',
						children: [{
							name: 'bankAccount',
							component: 'Select',
							showSearch: false,
							disabled: '{{$getControlEnable()}}',
							value: '{{data.form.bankAccount && data.form.bankAccount.name }}',
							onChange: `{{(v)=>$sf('data.form.bankAccount', $fromJS(data.other.bankAccount.find(o=>o.id==v),null))}}`,
							onFocus: "{{$bankAccountFocus}}",
							children: {
								name: 'option',
								component: 'Select.Option',
								value: "{{ data.other.bankAccount[_lastIndex] && data.other.bankAccount[_lastIndex].id }}",
								children: '{{data.other.bankAccount[_lastIndex] && data.other.bankAccount[_lastIndex].name }}',
								_power: 'for in data.other.bankAccount'
							}
						}]
					}, {
						name: 'settlementAmount',
						component: 'Form.Item',
						_visible:'{{data.other.columnSetting && data.other.columnSetting.filter(o=> o.propertyName === "receiveAmount" )[0].visible }}',
						label: '现结金额',
						children: [{
							name: 'settlementAmount',
							component: 'Input.Number',
							disabled: '{{$getControlEnable()}}',
							value: "{{data.form.receiveAmount}}",
							onChange: "{{(v)=>$sf('data.form.receiveAmount', v)}}",
						}]
					}],
			}, {
				name: 'advance',
				component: 'Form',
				className: 'app-scm-voucher-card-form-footer-advance',
				_visible:'{{data.other.columnSetting && data.other.columnSetting.filter(o=> o.propertyName === "preReceiveAmount" )[0].visible }}',
				children: [{
					name: 'useItem',
					component: 'Form.Item',
					label: '使用预收款',
					children: [{
						name: 'useAdvance',
						component: 'Checkbox',
						disabled: '{{$getControlEnable()}}',
						checked: '{{data.form.useAdvance}}',
						onChange: `{{(e)=>$sf('data.form.useAdvance', e.target.checked)}}`,
					}]
				}, {
					name: 'advanceAmountItem',
					component: 'Form.Item',
					label: '预收款',
					children: [{
						name: 'advanceAmount',
						component: 'Input.Number',
						disabled: '{{$getControlEnable()}}',
						value: '{{data.form.advanceAmount}}',
						onChange: `{{(v)=>$sf('data.form.advanceAmount', v)}}`,
					}]
				}]
			}/*, {
				name: 'balance',
				component: 'Form',
				className: 'app-scm-voucher-card-form-footer-balance',
				children: [{
					name: 'balanceItem',
					component: 'Form.Item',
					label: '余额',
					children: [{
						name: 'balanceAdvance',
						component: '::span',
						//children: '{{$calcBalance(data)}}'
					}]
				}]
			}*/]
		}, {
			name: 'footer',
			component: 'Layout',
			className: 'app-scm-voucher-card-footer',
			children: [{
				name: 'left',
				component: 'Layout',
				className: 'app-scm-voucher-card-footer-left',
				children: [{
					name: 'creator',
					component: 'Layout',
					children: ['制单人', '{{data.form.creatorName}}'],
					style: { marginRight: 30 }
				}, {
					name: 'approver',
					component: 'Layout',
					children: ['审核人', '{{data.form.auditorName}}'],
				}]

			}, {
				name: 'right',
				component: 'Layout',
				className: 'app-scm-voucher-card-footer-right',
				children: [{
					name: 'save',
					component: 'Button',
					type: 'showy',
					onClick: '{{$save}}',
					children: '保存'
				}, {
					name: 'saveAndNew',
					component: 'Button',
					type: 'bluesky',
					onClick: '{{$saveAndNew}}',
					children: '保存新增'
				}, {
					name: 'cancel',
					component: 'Button',
					type: 'bluesky',
					onClick: '{{$cancel}}',
					children: '放弃'
				}]

			}]
		}]
	}
}

export function getInitState() {
	return {
		data: {
			form: {
				customer: {
					id: '',
					name: ''
				},
				details: [
					blankVoucherItem,
					blankVoucherItem,
					blankVoucherItem,
					blankVoucherItem,
					blankVoucherItem


				],
				settlements: [{}]
			},
			total: {

			},
			other: {
				status: consts.status.VOUCHER_STATUS_ADD
			}
		}
	}
}

export const blankVoucherItem = {
	inventory: {
		id: null,
		name: null
	},
	isGift:null,
	quantity:null,
	tax:null,
	taxRate:null,
	price:null,
	amount:''
}
