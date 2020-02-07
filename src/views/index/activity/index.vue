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
						<el-input clearable style="width: 200px" v-model="listQuery.name" placeholder="请输入轮播图名称"></el-input>
					</el-form-item>
					<el-form-item label="轮播类型：">
						<el-select clearable style="width: 200px" v-model="listQuery.type" placeholder="请选择轮播类型">
							<el-option label="商品" :value="1"> </el-option>
							<el-option label="分类" :value="2"> </el-option>
							<el-option label="专题" :value="3"> </el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="关联ID：">
						<el-input clearable style="width: 200px" v-model="listQuery.relId" placeholder="请输入关联ID"></el-input>
					</el-form-item>
					<el-form-item label="启用状态：">
						<el-select clearable style="width: 200px" v-model="listQuery.use" placeholder="请选择启用状态">
							<el-option label="启用" :value="true"> </el-option>
							<el-option label="未启用" :value="false"> </el-option>
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
				<el-table-column label="封面图片" width="120" align="center">
					<template slot-scope="scope">
						<el-image style="width: 100px; height: 80px;" :src="scope.row.banner" :preview-src-list="[scope.row.banner]">
						</el-image>
					</template>
				</el-table-column>
				<el-table-column label="轮播图名称">
					<template slot-scope="scope">
						<div>{{scope.row.name}}</div>
					</template>
				</el-table-column>
				<el-table-column label="是否显示名称" width="170" align="center">
					<template slot-scope="scope">
						<el-switch v-model="scope.row.showName" @change="changeShowName($event, scope.row)" active-text="显示" inactive-text="暂不显示">
						</el-switch>
					</template>
				</el-table-column>
				<el-table-column label="类型" align="center" prop="type">
					<template slot-scope="scope">
						<div v-if="scope.row.type == 1">商品</div>
						<div v-if="scope.row.type == 2">分类</div>
						<div v-if="scope.row.type == 3">专题</div>
					</template>
				</el-table-column>
				<el-table-column label="关联ID" align="center" prop="relId"></el-table-column>
				<el-table-column label="排序" align="center" prop="seq"></el-table-column>
				<el-table-column label="创建时间" align="center" prop="createTime" width="160"></el-table-column>
				<el-table-column label="是否启用" width="170" align="center">
					<template slot-scope="scope">
						<el-switch v-model="scope.row.use" @change="changeUse($event, scope.row)" active-text="启用" inactive-text="暂不启用">
						</el-switch>
					</template>
				</el-table-column>
				<el-table-column label="操作" width="160" align="center">
					<template slot-scope="scope">
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
		pageActivity,
		updateActivity,
		deleteActivity
	} from '@/api/index'

	const defaultListQuery = {
		name: '',
		type: null,
		relId: '',
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
				if (this.listQuery.type != null && this.listQuery.type !== '') {
					data.type = this.listQuery.type
				}
				if (this.listQuery.relId) {
					data.relId = this.listQuery.relId
				}
				if (this.listQuery.use != null && this.listQuery.use !== '') {
					data.use = this.listQuery.use
				}
				this.listLoading = true;
				pageActivity(data).then(res => {
					this.listLoading = false;
					this.list = res.data.records;
					this.total = res.data.total;
				});
			},
			handleAddActivity() {
				this.$router.push({
					name: 'index_activity_add'
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
			changeShowName($event, row){
				let data = {
					id: row.id,
					showName: $event
				}
				if($event){
					this.$confirm('你确定要显示这个轮播图的名称?', '轮播图名称显示提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						updateActivity(row).then(res =>{
							this.$message({
								message: '显示成功',
								type: 'success'
							});
							this.getList();
						})
					}).catch(() => {
						row.showName = !$event;
					})
				}else{
					this.$confirm('你确定要暂不显示这个轮播图的名称?', '轮播图名称暂不显示提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						updateActivity(row).then(res =>{
							this.$message({
								message: '暂不显示成功',
								type: 'success'
							});
							this.getList();
						})
					}).catch(() => {
						row.showName = !$event;
					})
				}
			},
			changeUse($event, row){
				let data = {
					id: row.id,
					use: $event
				}
				if($event){
					this.$confirm('你确定要启用这个轮播图?', '轮播图启用提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						updateActivity(row).then(res =>{
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
					this.$confirm('你确定要暂不启用这个轮播图?', '轮播图暂不启用提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						updateActivity(row).then(res =>{
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
					name: 'index_activity_edit',
					query:{
						id: row.id
					}
				})
			},
			handleDelete(row) {
				this.$confirm('你确定要删除这个轮播图?', '删除提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					deleteActivity(row.id).then(res =>{
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getList();
					})
				}).catch(() => {})
			}
		}
	}
</script>
<style lang="less" scoped>
	.top-title {
		overflow: hidden;
	}
</style>
