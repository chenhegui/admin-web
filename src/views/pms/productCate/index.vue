<template>
	<div class="app-container">
		<el-card class="operate-container" shadow="never">
			<i class="el-icon-tickets" style="margin-top: 5px"></i>
			<span style="margin-top: 5px">数据列表</span>
			<el-button class="btn-add" @click="handleAddProductCate()" size="mini">
				添加
			</el-button>
		</el-card>
		<div class="table-container">
			<el-table ref="productCateTable" style="width: 100%" :data="list" v-loading="listLoading" border>
				<el-table-column label="编号" width="100" align="center">
					<template slot-scope="scope">{{scope.row.id}}</template>
				</el-table-column>
				<el-table-column label="分类名称" align="center">
					<template slot-scope="scope">{{scope.row.categoryName}}</template>
				</el-table-column>
				<el-table-column label="是否启用" width="100" align="center">
					<template slot-scope="scope">
						<el-switch @change="handleUsedChange($event, scope.row)" v-model="scope.row.used">
						</el-switch>
					</template>
				</el-table-column>
				<el-table-column label="排序" width="100" align="center">
					<template slot-scope="scope">{{scope.row.seq }}</template>
				</el-table-column>
				
				<el-table-column label="创建时间" width="160" align="center">
					<template slot-scope="scope">{{scope.row.createTime }}</template>
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
		deleteProductCate,
		updateProductCate
	} from '@/api/productCate'

	export default {
		name: "productCateList",
		data() {
			return {
				list: null,
				total: null,
				listLoading: true,
				listQuery: {
					pageIndex: 1,
					pageSize: 10
				}
			}
		},
		created() {
			this.getList();
		},
		methods: {
			handleAddProductCate() {
				this.$router.push('/pms/addProductCate');
			},
			getList() {
				this.listLoading = true;
				let query = {
					pageIndex: this.listQuery.pageIndex,
					pageSize: this.listQuery.pageSize
				};
				fetchList(query).then(response => {
					this.listLoading = false;
					this.list = response.data.records;
					this.total = response.data.total;
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
			handleUsedChange($event, row) {
				let data = {
					id: row.id,
					used: $event
				}
				if($event){
					this.$confirm('你确定要启用这个分类?', '启用提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning',
						closeOnPressEscape: false,
						closeOnClickModal: false
					}).then(() => {
						updateProductCate(data).then(res =>{
							this.$message({
								message: '启用成功',
								type: 'success'
							});
							this.getList();
						})
					}).catch(() => {
						row.used = !$event;
					})
				}else{
					this.$confirm('你确定要暂不启用这个分类?', '暂不启用提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning',
						closeOnPressEscape: false,
						closeOnClickModal: false
					}).then(() => {
						updateProductCate(data).then(res =>{
							this.$message({
								message: '暂不启用成功',
								type: 'success'
							});
							this.getList();
						})
					}).catch(() => {
						row.used = !$event;
					})
				}
			},
			handleUpdate(index, row) {
				this.$router.push({
					path: '/pms/updateProductCate',
					query: {
						id: row.id
					}
				});
			},
			handleDelete(index, row) {
				this.$confirm('是否要删除该分类', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					deleteProductCate(row.id).then(response => {
						this.$message({
							message: '删除成功',
							type: 'success',
							duration: 1000
						});
						this.getList();
					});
				});
			}
		}
	}
</script>

<style scoped>

</style>
