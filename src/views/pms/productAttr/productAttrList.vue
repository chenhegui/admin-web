<template> 
	<div class="app-container">
		<el-card class="operate-container" shadow="never">

			<i class="el-icon-tickets" style="margin-top: 5px"></i>
			<span style="margin-top: 5px">数据列表</span>
			<el-button class="btn-add" @click="addProductAttr()" size="mini">
				添加
			</el-button>
		</el-card>
		<div class="table-container">
			<el-table ref="productAttrTable" :data="list" style="width: 100%" v-loading="listLoading" border>
				<el-table-column label="ID" width="100" align="center">
					<template slot-scope="scope">{{scope.row.id}}</template>
				</el-table-column>
				<el-table-column label="属性名称" width="140" align="center">
					<template slot-scope="scope">{{scope.row.name}}</template>
				</el-table-column>
				<el-table-column label="商品类型" width="140" align="center">
					<template slot-scope="scope">{{$route.query.cname}}</template>
				</el-table-column>
				<el-table-column label="属性是否可选" width="120" align="center">
					<template slot-scope="scope">{{scope.row.selectType | selectTypeFilter}}</template>
				</el-table-column>
				<el-table-column label="属性值的录入方式" width="150" align="center">
					<template slot-scope="scope">{{scope.row.inputType | inputTypeFilter}}</template>
				</el-table-column>
				<el-table-column label="可选值列表" align="center">
					<template slot-scope="scope">{{scope.row.inputList}}</template>
				</el-table-column>
				<el-table-column label="排序" width="100" align="center">
					<template slot-scope="scope">{{scope.row.sort}}</template>
				</el-table-column>
				<el-table-column label="操作" width="200" align="center">
					<template slot-scope="scope">
						<el-button size="mini" @click="handleUpdate(scope.$index, scope.row)">编辑
						</el-button>
						<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除
						</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div class="pagination-container">
			<el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="total, sizes,prev, pager, next,jumper"
			 :page-size="listQuery.pageSize" :page-sizes="[10, 20, 50, 100]" :current-page.sync="listQuery.pageIndex" :total="total">
			</el-pagination>
		</div>
	</div>
</template>
<script>
	import {
		fetchList,
		deleteProductAttr
	} from '@/api/productAttr'

	export default {
		name: 'productAttrList',
		data() {
			return {
				list: null,
				total: null,
				listLoading: true,
				listQuery: {
					pageIndex: 1,
					pageSize: 10,
					type: this.$route.query.type
				},
				operateType: null,
				multipleSelection: [],
				operates: [{
					label: "删除",
					value: "deleteProductAttr"
				}]
			}
		},
		created() {
			this.getList();
		},
		methods: {
			getList() {
				this.listLoading = true;
				fetchList(this.$route.query.cid, this.listQuery).then(response => {
					this.listLoading = false;
					this.list = response.data.records;
					this.total = response.data.total;
				});
			},
			addProductAttr() {
				this.$router.push({
					path: '/pms/addProductAttr',
					query: {
						cid: this.$route.query.cid,
						type: this.$route.query.type
					}
				});
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
			handleUpdate(index, row) {
				this.$router.push({
					path: '/pms/updateProductAttr',
					query: {
						id: row.id,
						cid: this.$route.query.cid,
						type: this.$route.query.type
					}
				});
			},
			handleDelete(index, row) {
				this.$confirm('是否要删除该属性?', '删除提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					deleteProductAttr(row.id).then(response => {
						this.$message({
							message: '删除成功',
							type: 'success',
							duration: 1000
						});
						this.getList();
					});
				});
			},
		},
		filters: {
			inputTypeFilter(value) {
				if (value === 1) {
					return '从列表中选取';
				} else {
					return '手工录入'
				}
			},
			selectTypeFilter(value) {
				if (value === 1) {
					return '单选';
				} else if (value === 2) {
					return '多选';
				} else {
					return '唯一'
				}
			},
		}
	}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
