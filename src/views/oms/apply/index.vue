<template> 
	<div class="app-container">
		<el-card class="filter-container" shadow="never">
			<div style="overflow: hidden;">
				<i class="el-icon-search"></i>
				<span>筛选搜索</span>
				<el-button style="float:right" type="primary" @click="handleSearchList()" size="small">
					查询搜索
				</el-button>
				<el-button style="float:right;margin-right: 15px" @click="handleResetSearch()" size="small">
					重置
				</el-button>
			</div>
			<div style="margin-top: 15px">
				<el-form :inline="true" :model="listQuery" size="small" label-width="140px">
					<el-form-item label="输入ID：">
						<el-input clearable v-model="listQuery.id" class="input-width" placeholder="请输入服务单号ID"></el-input>
					</el-form-item>
					<el-form-item label="输入订单号：">
						<el-input clearable v-model="listQuery.orderSn" class="input-width" placeholder="请输入订单号"></el-input>
					</el-form-item>
					<el-form-item label="退款人姓名：">
						<el-input clearable v-model="listQuery.receiverName" class="input-width" placeholder="请输入退款人姓名"></el-input>
					</el-form-item>
					<el-form-item label="退款人手机号：">
						<el-input clearable v-model="listQuery.receiverPhone" class="input-width" placeholder="请输入退款人手机号"></el-input>
					</el-form-item>
					<el-form-item label="处理状态：">
						<el-select v-model="listQuery.status" placeholder="全部" clearable class="input-width">
							<el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="创建时间：">
						<el-date-picker clearable @change="getCreateTime" v-model="createTime" value-format="yyyy-MM-dd" type="daterange"
						 range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
						</el-date-picker>
					</el-form-item>
					<el-form-item label="处理人员：">
						<el-input clearable v-model="listQuery.handleMan" class="input-width" placeholder="请输入处理人员昵称"></el-input>
					</el-form-item>
					<el-form-item label="处理时间：">
						<el-date-picker clearable @change="getHandleTime" v-model="handleTime" value-format="yyyy-MM-dd" type="daterange"
						 range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
						</el-date-picker>
					</el-form-item>
				</el-form>
			</div>
		</el-card>
		<el-card class="operate-container" shadow="never">
			<i class="el-icon-tickets"></i>
			<span>数据列表</span>
		</el-card>
		<div class="table-container">
			<el-table ref="returnApplyTable" :data="list" style="width: 100%;" v-loading="listLoading" border>
				<el-table-column label="ID" width="80" align="center">
					<template slot-scope="scope">{{scope.row.id}}</template>
				</el-table-column>
				<el-table-column label="申请时间" width="160" align="center">
					<template slot-scope="scope">{{scope.row.createTime | formatTime}}</template>
				</el-table-column>
				<el-table-column label="创建人昵称" align="center">
					<template slot-scope="scope">{{scope.row.memberUsername}}</template>
				</el-table-column>
				<el-table-column label="创建人姓名" align="center">
					<template slot-scope="scope">{{scope.row.returnName}}</template>
				</el-table-column>
				<el-table-column label="创建人手机号" align="center">
					<template slot-scope="scope">{{scope.row.returnPhone}}</template>
				</el-table-column>
				<el-table-column label="订单号" width="170" align="center">
					<template slot-scope="scope">{{scope.row.orderSn}}</template>
				</el-table-column>
				<el-table-column label="退款金额" width="140" align="center">
					<template slot-scope="scope">￥{{scope.row.payAmount | priceFormat}}</template>
				</el-table-column>
				<el-table-column label="申请状态" width="100" align="center">
					<template slot-scope="scope">{{scope.row.status | formatStatus}}</template>
				</el-table-column>
				<el-table-column label="处理人昵称" align="center">
					<template slot-scope="scope">{{scope.row.handleManName ? scope.row.handleManName : '暂无'}}</template>
				</el-table-column>
				<el-table-column label="处理时间" width="160" align="center">
					<template slot-scope="scope">{{scope.row.handleTime | formatTime}}</template>
				</el-table-column>
				<el-table-column label="操作" width="180" align="center">
					<template slot-scope="scope">
						<el-button size="mini" type="primary" @click="handleViewDetail(scope.$index, scope.row)">查看详情</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div class="pagination-container" style="margin-bottom: 30px;">
			<el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="total, sizes,prev, pager, next,jumper"
			 :current-page.sync="listQuery.pageIndex" :page-size="listQuery.pageSize" :page-sizes="[5,10,15]" :total="total">
			</el-pagination>
		</div>
	</div>
</template>
<script>
	import {
		formatDate
	} from '@/utils/date';
	import {
		fetchList,
		deleteApply
	} from '@/api/returnApply';
	import {
		priceFormat
	} from '@/utils/date'
	const defaultListQuery = {
		pageIndex: 1,
		pageSize: 10,
		id: null,
		orderSn: '',
		receiverName: '',
		receiverPhone: '',
		createTimeStart: '',
		createTimeEnd: '',
		status: null,
		handleMan: '',
		handleTimeStart: '',
		handleTimeEnd: ''
	};
	const defaultStatusOptions = [{
			label: '待处理',
			value: 0
		},
		// {
		// 	label: '退货中',
		// 	value: 1
		// },
		{
			label: '已完成',
			value: 2
		},
		{
			label: '已拒绝',
			value: 3
		}
	];
	export default {
		name: 'returnApplyList',
		data() {
			return {
				listQuery: Object.assign({}, defaultListQuery),
				statusOptions: Object.assign({}, defaultStatusOptions),
				list: null,
				total: null,
				listLoading: false,
				multipleSelection: [],
				operateType: 1,
				operateOptions: [{
					label: "批量删除",
					value: 1
				}],
				createTime: '',
				handleTime: ''
			}
		},
		created() {
			this.getList();
		},
		filters: {
			formatTime(time) {
				if (time == null || time === '') {
					return 'N/A';
				}
				return time
			},
			formatStatus(status) {
				for (let i = 0; i < defaultStatusOptions.length; i++) {
					if (status === defaultStatusOptions[i].value) {
						return defaultStatusOptions[i].label;
					}
				}
			},
			formatReturnAmount(row) {
				return row.productRealPrice * row.productCount;
			},
			priceFormat(value) {
				return priceFormat(value)
			}
		},
		methods: {
			getCreateTime(val) {
				if (val) {
					this.listQuery.createTimeStart = val[0]
					this.listQuery.createTimeEnd = val[1]
				} else {
					this.listQuery.createTimeStart = ''
					this.listQuery.createTimeEnd = ''
				}
			},
			getHandleTime(val) {
				if (val) {
					this.listQuery.handleTimeStart = val[0]
					this.listQuery.handleTimeEnd = val[1]
				} else {
					this.listQuery.handleTimeStart = ''
					this.listQuery.handleTimeEnd = ''
				}
			},
			handleResetSearch() {
				this.listQuery = Object.assign({}, defaultListQuery);
				this.getList();
			},
			handleSearchList() {
				this.listQuery.pageIndex = 1;
				this.getList();
			},
			handleViewDetail(index, row) {
				this.$router.push({
					path: '/oms/returnApplyDetail',
					query: {
						id: row.id
					}
				})
			},
			handleSizeChange(val) {
				this.listQuery.pageIndex = 1;
				this.listQuery.pageSize = val;
				this.getList();
			},
			handleCurrentChange(val) {
				this.listQuery.pageIndex = val;
				this.getList();
			},
			getList() {
				this.listLoading = true;
				let data = {
					pageIndex: this.listQuery.pageIndex,
					pageSize: this.listQuery.pageSize
				}
				if (this.listQuery.nickName) {
					data.nickName = this.listQuery.nickName
				}
				if (this.listQuery.id) {
					data.id = this.listQuery.id
				}
				if (this.listQuery.orderSn) {
					data.orderSn = this.listQuery.orderSn
				}
				if (this.listQuery.receiverName) {
					data.receiverName = this.listQuery.receiverName
				}
				if (this.listQuery.receiverPhone) {
					data.receiverPhone = this.listQuery.receiverPhone
				}
				if (this.listQuery.status) {
					data.status = this.listQuery.status
				}
				if (this.listQuery.handleMan) {
					data.handleMan = this.listQuery.handleMan
				}
				if (this.listQuery.createTimeStart !== '' && this.listQuery.createTimeEnd !== '') {
					data.createTimeStart = this.listQuery.createTimeStart
					data.createTimeEnd = this.listQuery.createTimeEnd
				}
				if (this.listQuery.handleTimeStart !== '' && this.listQuery.handleTimeEnd !== '') {
					data.handleTimeStart = this.listQuery.handleTimeStart
					data.handleTimeEnd = this.listQuery.handleTimeEnd
				}
				fetchList(data).then(response => {
					this.listLoading = false;
					this.list = response.data.records;
					this.total = response.data.total;
				});
			}
		}
	}
</script>
<style scoped>
	.input-width {
		width: 203px;
	}
</style>
