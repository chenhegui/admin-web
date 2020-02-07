<template> 
	<div class="app-container">
		<el-card class="filter-container" shadow="never">
			<div class="top-title">
				<i class="el-icon-search"></i>
				<span>筛选搜索</span>
				<el-button style="float: right" @click="getList" type="primary" size="small">
					查询结果
				</el-button>
				<el-button style="float: right;margin-right: 15px" @click="handleResetSearch" size="small">
					重置
				</el-button>
			</div>
			<div style="margin-top: 15px">
				<el-form :inline="true" :model="listQuery" size="small" label-width="140px">
					<el-form-item label="输入搜索：">
						<el-input clearable style="width: 200px" v-model="listQuery.name" placeholder="请输入分类名称"></el-input>
					</el-form-item>
					<el-form-item label="分类标题：">
						<el-input clearable style="width: 200px" v-model="listQuery.relId" placeholder="请输入分类的标题"></el-input>
					</el-form-item>
					<el-form-item label="启用状态：">
						<el-select clearable style="width: 200px" v-model="listQuery.use" placeholder="请选择启用状态">
							<el-option label="启用" :value="true"> </el-option>
							<el-option label="暂未启用" :value="false"> </el-option>
						</el-select>
					</el-form-item>
				</el-form>
			</div>
		</el-card>
		<el-card class="operate-container" shadow="never">
			<i class="el-icon-tickets"></i>
			<span>数据列表</span>
			<el-button class="btn-add" type="primary" size="mini" icon="el-icon-plus" @click="handleAddActivity">
				添加
			</el-button>
		</el-card>
		<div class="table-container">
			<el-table ref="productTable" :data="list" v-loading="listLoading">
				<el-table-column label="ID" width="100" align="center" prop="id"></el-table-column>
				<el-table-column label="分类名称" prop="name"></el-table-column>
				<el-table-column label="副标题" prop="title"></el-table-column>
				<el-table-column label="more的文字" prop="moreText"></el-table-column>
				<el-table-column label="排序" align="center" prop="seq"></el-table-column>
				<el-table-column label="创建时间" align="center" prop="createTime" width="160"></el-table-column>
				<el-table-column label="是否启用" width="170" align="center">
					<template slot-scope="scope">
						<el-switch v-model="scope.row.use" @change="changeUse($event, scope.row)" active-text="启用" inactive-text="暂不启用">
						</el-switch>
					</template>
				</el-table-column>
				<el-table-column label="操作" width="240" align="center">
					<template slot-scope="scope">
						<el-button size="mini" type="success" @click="handleUpdateProduct(scope.row)">添加商品
						</el-button>
						<el-button size="mini" type="primary" @click="handleUpdate(scope.row)">编辑
						</el-button>
						<el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除
						</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div class="pagination-container">
			<el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="total, sizes,prev, pager, next,jumper"
			 :page-size="listQuery.pageSize" :page-sizes="[10, 20, 50, 80, 100]" :current-page.sync="listQuery.pageNum" :total="total">
			</el-pagination>
		</div>
	</div>
</template>
<script>
	import {
		pageFloor,
		updateFloor,
		deleteFloor
	} from '@/api/index'

	const defaultListQuery = {
		name: '',
		title: '',
		use: null,
		pageIndex: 1,
		pageSize: 10,
	};
	export default {
		name: "productList",
		data() {
			return {
				listQuery: { ...defaultListQuery},
				list: null,
				total: null,
				listLoading: false
			}
		},
		created() {
			this.getList();
		},
		methods: {
			getList() {
				let data = {
					pageIndex: this.listQuery.pageIndex,
					pageSize: this.listQuery.pageSize
				}
				if (this.listQuery.name) {
					data.name = this.listQuery.name
				}
				if (this.listQuery.title) {
					data.title = this.listQuery.title
				}
				if (this.listQuery.use != null && this.listQuery.use !== '') {
					data.use = this.listQuery.use
				}
				this.listLoading = true;
				pageFloor(data).then(res => {
					this.listLoading = false;
					this.list = res.data.records;
					this.total = res.data.total;
				});
			},
			handleAddActivity() {
				this.$router.push({
					name: 'index_floor_add'
				})
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
			handleResetSearch() {
				this.listQuery = {...defaultListQuery};
				this.getList()
			},
			changeUse($event, row){
				let data = {
					id: row.id,
					use: $event
				}
				if($event){
					this.$confirm('你确定要启用这个分类?', '轮播图启用提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						updateFloor(data).then(res =>{
							this.$message({
								message: '启用成功',
								type: 'success'
							});
							this.getList();
						})
					}).catch(() => {
						row.use = !$event;
					})
				}else{
					this.$confirm('你确定要暂不启用这个分类?', '轮播图暂不启用提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						updateFloor(data).then(res =>{
							this.$message({
								message: '暂不启用成功',
								type: 'success'
							});
							this.getList();
						})
					}).catch(() => {
						row.use = !$event;
					})
				}
			},
			handleUpdate(row){
				this.$router.push({
					name: 'index_floor_edit',
					query:{
						id: row.id
					}
				})
			},
			handleDelete(row) {
				this.$confirm('你确定要删除这个分类?', '删除提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					deleteFloor(row.id).then(res =>{
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getList();
					})
				}).catch(() => {})
			},
			handleUpdateProduct(row){
				this.$router.push({
					name: 'index_floor_product',
					query:{
						id: row.id
					}
				})
			}
		}
	}
</script>
<style lang="less" scoped>
	.top-title {
		overflow: hidden;
	}
</style>
