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
					<el-form-item label="优惠券名称：">
						<el-input v-model="listQuery.name" class="input-width" placeholder="优惠券名称" clearable></el-input>
					</el-form-item>
					<el-form-item label="优惠券类型：">
						<el-select v-model="listQuery.type" placeholder="全部" clearable class="input-width">
							<el-option label="普通增券" :value="0"></el-option>
							<el-option label="会员赠券" :value="1"></el-option>
						</el-select>
					</el-form-item>
				</el-form>
			</div>
		</el-card>
		<el-card class="operate-container" shadow="never">
			<i class="el-icon-tickets"></i>
			<span>数据列表</span>
			<el-button size="mini" class="btn-add" @click="handleAdd()">添加</el-button>
		</el-card>
		<div class="table-container">
			<el-table ref="couponTable" :data="list" style="width: 100%;" @selection-change="handleSelectionChange" v-loading="listLoading">
				<el-table-column label="ID" width="100" align="center">
					<template slot-scope="scope">{{scope.row.id}}</template>
				</el-table-column>
				<el-table-column label="优惠劵名称" align="center">
					<template slot-scope="scope">{{scope.row.name}}</template>
				</el-table-column>
				<el-table-column label="优惠券类型" width="100" align="center">
					<template slot-scope="scope">{{scope.row.type | formatType}}</template>
				</el-table-column>
				<el-table-column label="使用类型" width="100" align="center">
					<template slot-scope="scope">{{scope.row.useType | formatUseType}}</template>
				</el-table-column>
				<el-table-column label="使用门槛" width="140" align="center">
					<template slot-scope="scope">满{{scope.row.minPoint}}元可用</template>
				</el-table-column>
				<el-table-column label="面值" width="100" align="center">
					<template slot-scope="scope">{{scope.row.amount}}元</template>
				</el-table-column>
				<el-table-column label="有效期" width="180" align="center">
					<template slot-scope="scope">{{scope.row.startTime}}至{{scope.row.endTime}}</template>
				</el-table-column>
				<el-table-column label="状态" width="100" align="center">
					<template slot-scope="scope">{{scope.row.endTime | formatStatus}}</template>
				</el-table-column>
				<el-table-column label="操作" width="180" align="center">
					<template slot-scope="scope">
						<el-button size="mini" type="text" @click="handleView(scope.$index, scope.row)">查看</el-button>
						<el-button size="mini" type="text" @click="handleUpdate(scope.$index, scope.row)">
							编辑</el-button>
						<el-button size="mini" type="text" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div class="pagination-container">
			<el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="total, sizes,prev, pager, next,jumper"
			 :current-page.sync="listQuery.pageNum" :page-size="listQuery.pageSize" :page-sizes="[10, 20, 50, 100]" :total="total">
			</el-pagination>
		</div>
	</div>
</template>
<script>
	import {
		fetchList,
		deleteCoupon
	} from '@/api/coupon';
	const defaultListQuery = {
		pageNum: 1,
		pageSize: 10,
		name: null,
		type: null
	};
	export default {
		name: 'couponList',
		data() {
			return {
				listQuery: Object.assign({}, defaultListQuery),
				list: null,
				total: null,
				listLoading: false,
				multipleSelection: []
			}
		},
		created() {
			this.getList();
		},
		filters: {
			formatType(type) {
				if(type == 0){
					return '普通赠券'
				}
				if(type == 1){
					return '会员赠券'
				}
			},
			formatUseType(useType) {
				if (useType === 0) {
					return '全场通用';
				} else if (useType === 1) {
					return '指定分类';
				} else {
					return '指定商品';
				}
			},
			formatStatus(endTime) {
				let now = new Date().getTime();
				let endDate = new Date(endTime).getTime();
				if (endDate > now) {
					return '未过期'
				} else {
					return '已过期';
				}
			}
		},
		methods: {
			handleResetSearch() {
				this.listQuery = Object.assign({}, defaultListQuery);
			},
			handleSearchList() {
				this.listQuery.pageNum = 1;
				this.getList();
			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
			handleSizeChange(val) {
				this.listQuery.pageNum = 1;
				this.listQuery.pageSize = val;
				this.getList();
			},
			handleCurrentChange(val) {
				this.listQuery.pageNum = val;
				this.getList();
			},
			handleAdd() {
				this.$router.push({
					path: '/sms/addCoupon'
				})
			},
			handleView(index, row) {
				this.$router.push({
					path: '/sms/couponHistory',
					query: {
						id: row.id
					}
				})
			},
			handleUpdate(index, row) {
				this.$router.push({
					path: '/sms/updateCoupon',
					query: {
						id: row.id
					}
				})
			},
			handleDelete(index, row) {
				this.$confirm('是否进行删除操作?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					deleteCoupon(row.id).then(response => {
						this.$message({
							type: 'success',
							message: '删除成功!'
						});
						this.getList();
					});
				})
			},
			getList() {
				this.listLoading = true;
				fetchList(this.listQuery).then(response => {
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
