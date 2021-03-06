import moment from 'moment'

export function getMeta() {
	return {
		name: 'root',
		component: 'Layout',
		className: 'app-scm-voucher-list',
		children: [{
			name: 'header',
			component: 'Layout',
			className: 'app-scm-voucher-list-header',
			children: [{
				name: 'right',
				component: 'Layout',
				className: 'app-scm-voucher-list-header-right',
				children: [{
					name: 'addSaleOrder',
					component: 'Button',
					type: 'showy',
					children: '新增销售订单',
					onClick: '{{$add}}'
				}, {
					name: 'receipt',
					component: 'Button',
					type: 'bluesky',
					children: '收款',
					// onClick: '{{$receipt}}'
				}, {
					name: 'batch',
					component: 'Dropdown',
					overlay: {
						name: 'menu',
						component: 'Menu',
						onClick: '{{$batchMenuClick}}',
						children: [{
							name: 'modify',
							component: 'Menu.Item',
							key: 'audit',
							children: '审核'
						}, {
							name: 'del',
							component: 'Menu.Item',
							key: 'del',
							children: '删除'
						}]
					},
					children: {
						name: 'internal',
						component: 'Button',
						type: 'bluesky',

						children: ['批量', {
							name: 'down',
							component: 'Icon',
							type: 'down'
						}]
					}
				}, {
					name: 'print',
					component: 'Button',
					className: 'app-scm-voucher-list-iconbutton',
					type: 'softly',
					iconFontFamily: 'mkicon',
					icon: 'print',
					title: '打印',
					onClick: '{{$print}}'
				}, {
					name: 'export',
					component: 'Button',
					className: 'app-scm-voucher-list-iconbutton',
					type: 'softly',
					iconFontFamily: 'mkicon',
					icon: 'upload',
					title: '导出',
					onClick: '{{$exp}}'
				}, {
					name: 'setting',
					component: 'Button',
					className: 'app-scm-voucher-list-iconbutton',
					type: 'softly',
					iconFontFamily: 'mkicon',
					icon: 'setting',
					title: '设置',
					onClick: '{{$setting}}'
				}]
			}]
		}, {
			name: 'commonFilter',
			component: 'Layout',
			className: 'app-scm-voucher-list-baseFilter',

			children: [{
				name: 'internal',
				component: 'Radio.Group',
				value: '{{data.other.timer}}',
				onChange: `{{$commonFilterChange}}`,
				children: [{
					name: 'all',
					value: 'all',
					component: 'Radio.Button',
					children: '全部'
				}, {
					name: 'today',
					value: 'today',
					component: 'Radio.Button',
					children: '今天'
				}, {
					name: 'yesterday',
					value: 'yesterday',
					component: 'Radio.Button',
					children: '昨天'
				}, {
					name: 'thisWeek',
					value: 'thisWeek',
					component: 'Radio.Button',
					children: '本周'
				}, {
					name: 'lastWeek',
					value: 'lastWeek',
					component: 'Radio.Button',
					children: '上周'
				}, {
					name: 'thisMonth',
					value: 'thisMonth',
					component: 'Radio.Button',
					children: '本月'
				}, {
					name: 'lastMonth',
					value: 'lastMonth',
					component: 'Radio.Button',
					children: '上月'
				}, {
					name: 'thisYear',
					value: 'thisYear',
					component: 'Radio.Button',
					children: '本年'
				}]
			}, {
				name: 'fold',
				component: 'Icon',
				showStyle: 'softly',
				type: `{{!data.other.isFold ?  'down': 'right'}}`,
				style: {fontSize: 20},
				onClick: '{{$toggleShowAdvanceFilter}}',
			}],
		}, {
			name: 'advanceFilter',
			component: 'Layout',
			className: 'app-scm-voucher-list-advanceFilter',
			_visible: '{{!data.other.isFold}}',
			children: [{
				name: 'form',
				component: 'Form',
				className: 'app-scm-voucher-list-advanceFilter-form',
				children: [{
					name: 'dateItem',
					component: 'Form.Item',
					label: '日期',
					children: [{
						name: 'beginDate',
						component: 'DatePicker.RangePicker',
						value: '{{$getRangerDate()}}',
						onChange: '{{$dateChange}}'
					}]

				}, {
					name: 'customerItem',
					component: 'Form.Item',
					label: '客户',
					children: [{
						name: 'customer',
						component: 'Select',
						showSearch: false,
						value: '{{data.filter.customerId }}',
						onFocus:'{{$selectFocus("customers")}}',
						onChange: `{{(v)=>$sf('data.filter.customerId', v)}}`,
						children: {
							name: 'option',
							component: 'Select.Option',
							value: "{{ data.other.customers && data.other.customers[_rowIndex].id }}",
							children: '{{data.other.customers && data.other.customers[_rowIndex].name }}',
							_power: 'for in data.other.customers'
						}
					}]
				},{
					name: 'invoiceTypeItem',
					component: 'Form.Item',
					label: '票据类型',
					children: [{
						name: 'invoiceType',
						component: 'Select',
						showSearch: false,
						value: '{{data.filter.invoiceTypeId}}',
						onChange: `{{(v)=>$sf('data.filter.invoiceTypeId', v)}}`,
						children:{
							name: 'option',
							component: 'Select.Option',
							value: "{{ data.other.invoiceTypes && data.other.invoiceTypes[_rowIndex].enumItemId }}",
							children: '{{data.other.invoiceTypes && data.other.invoiceTypes[_rowIndex].enumItemName }}',
							_power: 'for in data.other.invoiceTypes'
						}
					}]
				},{
					name: 'codeItem',
					component: 'Form.Item',
					label: '发票号码',
					children: [{
						name: 'code',
						component: 'Input',
						value: '{{data.filter.invoiceNumber}}',
						onBlur: `{{(e)=>$sf('data.filter.invoiceNumber', e.target.value)}}`,
					}]
				},{
					name: 'commodityItem',
					component: 'Form.Item',
					label: '商品',
					children: [{
						name: 'commodity',
						component: 'Select',
						showSearch: false,
						value: '{{data.filter.inventoryId}}',
						onFocus:'{{$selectFocus("commoditys")}}',
						onChange: `{{(v)=>$sf('data.filter.inventoryId', v)}}`,
						children:{
							name: 'option',
							component: 'Select.Option',
							value: "{{ data.other.commoditys && data.other.commoditys[_rowIndex].id }}",
							children: '{{data.other.commoditys && data.other.commoditys[_rowIndex].name }}',
							_power: 'for in data.other.commoditys'
						}
					}]
				},{
					name: 'search',
					component: 'Button',
					type: 'bluesky',
					children: '查询',
					onClick: '{{$search}}'
				}]
			}]
		}, {
			name: 'tabs',
			component: 'Tabs',
			className: 'app-scm-voucher-list-tabs',
			type: 'card',
			activeKey: '{{data.other.activeKey}}',
			onChange: '{{$tabChange}}',
			children: [{
				name: 'all',
				component: 'Tabs.TabPane',
				key: '0',
				tab: `{{'全部(' + data.total.totalCount+ ')'}}`
			}, {
				name: 'unaudit',
				component: 'Tabs.TabPane',
				key: '1',
				tab: `{{'未审核(' + data.total.notApproveCount + ')'}}`
			}, {
				name: 'unpaid',
				component: 'Tabs.TabPane',
				key: '2',
				tab: `{{'未冲销完(' + data.total.notSettleCount + ')'}}`
			}, {
				name: 'paid',
				component: 'Tabs.TabPane',
				key: '3',
				tab: `{{'未冲销完(' + data.total.settledCount + ')'}}`
			}]
		}, {
			name: 'content',
			className: 'app-scm-voucher-list-content',
			component: 'Layout',
			children: [{
				name: 'dataGrid',
				component: 'DataGrid',
				headerHeight: 35,
				rowHeight: 35,
				// footerHeight: 35,
				enableSequence: true,
				startSequence: '{{(data.page.currentPage-1)*data.page.pageSize + 1}}',
				// sequenceFooter: {
				// 	name: 'footer',
				// 	component: 'DataGrid.Cell',
				// 	children: '汇总'
				// },
				rowsCount: "{{data.list ? data.list.length : 0}}",

				columns: [{
					name: 'select',
					component: 'DataGrid.Column',
					columnKey: 'select',
					width: 40,
					fixed: true,
					header: {
						name: 'header',
						component: 'DataGrid.Cell',
						children: {
							name: 'cb',
							component: 'Checkbox',
							checked: "{{$isSelectAll('dataGrid')}}",
							onChange: "{{$selectAll('dataGrid')}}"
						}
					},
					cell: {
						name: 'cell',
						component: 'DataGrid.Cell',
						_power: '({rowIndex})=>rowIndex',
						children: {
							name: 'checkbox',
							component: 'Checkbox',
							checked: '{{data.list[_rowIndex].selected}}',
							onChange: "{{ (e, option) => $setField('data.list.' + _rowIndex + '.selected', e.target.checked ) }}",
						}
					}
				}, {
					name: 'oprate',
					component: 'DataGrid.Column',
					columnKey: 'oprate',
					fixed: true,
					width: 80,
					header: {
						name: 'header',
						component: 'DataGrid.Cell',
						children: '操作'
					},
					cell: {
						name: 'cell',
						component: 'DataGrid.Cell',
						_power: '({rowIndex})=>rowIndex',
						children: [{
							name: 'audit',
							component: 'Icon',
							showStyle: 'softly',
							fontFamily: 'mkicon',
							type: 'audit',
							disabled: '{{data.list[_rowIndex].status == 128}}',
							style: {
								fontSize: 22
							},
							title: '审核',
							onClick: '{{$audit(data.list[_rowIndex].id,data.list[_rowIndex].ts)}}'
						}, {
							name: 'reject',
							component: 'Icon',
							showStyle: 'softly',
							fontFamily: 'mkicon',
							type: 'reject',
							disabled: '{{data.list[_rowIndex].status != 128}}',
							style: {
								fontSize: 22
							},
							title: '反审核',
							onClick: '{{$reject(data.list[_rowIndex].id,data.list[_rowIndex].ts)}}'
						}, {
							name: 'del',
							component: 'Icon',
							showStyle: 'showy',
							type: 'close',
							disabled: '{{data.list[_rowIndex].status == 128}}',
							style: {
								fontSize: 18
							},
							title: '删除',
							onClick: '{{$del(data.list[_rowIndex].id,data.list[_rowIndex].ts)}}'
						}]
					}
				}, {
					name: 'code',
					component: 'DataGrid.Column',
					columnKey: 'code',
					flexGrow: 1,
					width: 100,
					header: {
						name: 'header',
						component: 'DataGrid.Cell',
						children: '单据号'
					},
					cell: {
						name: 'cell',
						component: 'DataGrid.Cell',
						_power: '({rowIndex})=>rowIndex',
						children: {
							name: 'link',
							component: '::a',
							children: '{{data.list[_rowIndex].code}}',
							onClick: '{{$modify(data.list[_rowIndex].id)}}'
						},
					},
				}, {
					name: 'ticketType',
					component: 'DataGrid.Column',
					columnKey: 'ticketType',
					width: 100,
					header: {
						name: 'header',
						component: 'DataGrid.Cell',
						children: '发票类型'
					},
					cell: {
						name: 'cell',
						component: 'DataGrid.Cell',
						_power: '({rowIndex})=>rowIndex',
						children: "{{data.list[_rowIndex].invoiceTypeName}}",
					}
				},  {
					name: 'voucherNO',
					component: 'DataGrid.Column',
					columnKey: 'voucherNO',
					flexGrow: 1,
					width: 100,
					header: {
						name: 'header',
						component: 'DataGrid.Cell',
						children: '凭证号'
					},
					cell: {
						name: 'cell',
						component: 'DataGrid.Cell',
						_power: '({rowIndex})=>rowIndex',
						children:{
							name: 'link',
							component: '::a',
							children: '{{data.list[_rowIndex].docCode}}',
							onClick: '{{$toDoc(data.list[_rowIndex].docId)}}'
						}
					},
				}, {
					name: 'date',
					component: 'DataGrid.Column',
					columnKey: 'date',
					flexGrow: 1,
					width: 100,
					header: {
						name: 'header',
						component: 'DataGrid.Cell',
						children: '记账日期'
					},
					cell: {
						name: 'cell',
						component: 'DataGrid.Cell',
						_power: '({rowIndex})=>rowIndex',
						children: '{{data.list[_rowIndex].businessDate}}',
					},
				}, {
					name: 'customer',
					component: 'DataGrid.Column',
					columnKey: 'department',
					flexGrow: 1,
					width: 100,
					header: {
						name: 'header',
						component: 'DataGrid.Cell',
						children: '客户'
					},
					cell: {
						name: 'cell',
						component: 'DataGrid.Cell',
						className: 'app-scm-voucher-list-cell-left',
						_power: '({rowIndex})=>rowIndex',
						children: '{{data.list[_rowIndex].customerName}}',
					},
				}, {
					name: 'amount',
					component: 'DataGrid.Column',
					columnKey: 'amount',
					flexGrow: 1,
					width: 100,
					header: {
						name: 'header',
						component: 'DataGrid.Cell',
						children: '金额汇总'
					},
					cell: {
						name: 'cell',
						component: 'DataGrid.Cell',
						className: 'app-scm-voucher-list-cell-right',
						_power: '({rowIndex})=>rowIndex',
						children: '{{$numberFormat(data.list[_rowIndex].totalAmount,2)}}',
					}
				}, {
					name: 'priceTaxTotal',
					component: 'DataGrid.Column',
					columnKey: 'priceTaxTotal',
					flexGrow: 1,
					width: 100,
					header: {
						name: 'header',
						component: 'DataGrid.Cell',
						children: '价税合计汇总'
					},
					cell: {
						name: 'cell',
						component: 'DataGrid.Cell',
						className: 'app-scm-voucher-list-cell-right',
						_power: '({rowIndex})=>rowIndex',
						children: '{{$numberFormat(data.list[_rowIndex].totalAmountWithTax,2)}}',
					}
				}, {
					name: 'paidAmount',
					component: 'DataGrid.Column',
					columnKey: 'paidAmount',
					flexGrow: 1,
					width: 100,
					header: {
						name: 'header',
						component: 'DataGrid.Cell',
						children: '已冲销金额'
					},
					cell: {
						name: 'cell',
						component: 'DataGrid.Cell',
						className: 'app-scm-voucher-list-cell-right',
						_power: '({rowIndex})=>rowIndex',
						children: '{{$numberFormat(data.list[_rowIndex].settledAmount,2)}}',
					}
				}, {
					name: 'unpaidAmount',
					component: 'DataGrid.Column',
					columnKey: 'unpaidAmount',
					flexGrow: 1,
					width: 100,
					header: {
						name: 'header',
						component: 'DataGrid.Cell',
						children: '未冲销金额'
					},
					cell: {
						name: 'cell',
						component: 'DataGrid.Cell',
						className: 'app-scm-voucher-list-cell-right',
						_power: '({rowIndex})=>rowIndex',
						children: '{{$numberFormat(data.list[_rowIndex].unpaidAmount,2)}}',
					}
				},  {
					name: 'memo',
					component: 'DataGrid.Column',
					columnKey: 'memo',
					flexGrow: 1,
					width: 200,
					header: {
						name: 'header',
						component: 'DataGrid.Cell',
						children: '备注'
					},
					cell: {
						name: 'cell',
						component: 'DataGrid.Cell',
						className: 'app-scm-voucher-list-cell-left',
						_power: '({rowIndex})=>rowIndex',
						children: '{{data.list[_rowIndex].remark}}',
					},
				}]
			}]
		}, {
			name: 'footer',
			className: 'app-scm-voucher-list-footer',
			component: 'Layout',
			children: [{
				name: 'pagination',
				component: 'Pagination',
				showSizeChanger: true,
				pageSize: '{{data.page.pageSize}}',
				current: '{{data.page.currentPage}}',
				total: '{{data.page.totalPage}}',
				onChange: '{{$pageChanged}}',
				onShowSizeChange: '{{$pageChanged}}'
			}]
		}]
	}
}


export function getInitState() {
	return {
		data: {
			list: [],
			page: { currentPage: 1, totalPage: 0, pageSize: 20 },
			queryOption:{

			},
			filter: {
				startTime: moment().startOf('month').format('YYYY-MM-DD'),
  				endTime: moment().endOf('month').format('YYYY-MM-DD'),
				page:{
					currentPage: 1,
    				pageSize: 20
				}
			},
			total: {
				allCount: 0,
				unauditCount : 0,
				unpaidCount: 0,
				paidCount: 0
			},
			other: {
				isFold: true,
				activeKey:'0',
				timer:'thisMonth'
			 }
		}
	}
}
