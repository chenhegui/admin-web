<template> 
	<div class="app-container">
		<el-card class="operate-container" shadow="never">
			<i class="el-icon-tickets"></i>
			<span>数据列表</span>
			<el-button size="mini" @click="handleAdd" class="btn-add">添加
			</el-button>
		</el-card>
		<div class="table-container">
			<el-table ref="returnReasonTable" :data="list" style="width: 100%;" v-loading="listLoading">
				<el-table-column label="编号" width="80" align="center">
					<template slot-scope="scope">{{scope.row.id}}</template>
				</el-table-column>
				<el-table-column label="原因类型" align="center">
					<template slot-scope="scope">{{scope.row.name}}</template>
				</el-table-column>
				<el-table-column label="排序" width="100" align="center">
					<template slot-scope="scope">{{scope.row.sort }}</template>
				</el-table-column>
				<el-table-column label="是否可用" align="center">
					<template slot-scope="scope">
						<el-switch v-model="scope.row.status" @change="handleStatusChange(scope.$index,scope.row)" :active-value="1"
						 :inactive-value="0">
						</el-switch>
					</template>
				</el-table-column>
				<el-table-column label="添加时间" width="180" align="center">
					<template slot-scope="scope">{{scope.row.createTime}}</template>
				</el-table-column>
				<el-table-column label="操作" width="160" align="center">
					<template slot-scope="scope">
						<el-button size="mini" type="primary" @click="handleUpdate(scope.$index, scope.row)">编辑</el-button>
						<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div class="pagination-container">
			<el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="total, sizes,prev, pager, next,jumper"
			 :current-page.sync="listQuery.pageIndex" :page-size="listQuery.pageSize" :page-sizes="[10, 20, 50, 100]" :total="total">
			</el-pagination>
		</div>
		<el-dialog title="添加退货原因" :visible.sync="dialogVisible" width="30%">
			<el-form :model="returnReason" ref="reasonForm" label-width="150px">
				<el-form-item label="原因类型：">
					<el-input v-model="returnReason.name" class="input-width"></el-input>
				</el-form-item>
				<el-form-item label="排序：">
					<el-input v-model="returnReason.sort" class="input-width"></el-input>
				</el-form-item>
				<el-form-item label="是否启用：">
					<el-switch v-model="returnReason.status" :active-value="1" :inactive-value="0"></el-switch>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="handleConfirm">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<script>
	import {
		fetchList,
		deleteReason,
		updateStatus,
		addReason,
		getReasonDetail,
		updateReason
	} from '@/api/returnReason';
	
	const defaultListQuery = {
		pageIndex: 1,
		pageSize: 10
	};
	
	const defaultReturnReason = {
		name: null,
		sort: 0,
		status: 1,
		createTime: null
	};
	export default {
		name: 'returnReasonList',
		data() {
			return {
				list: null,
				total: null,
				multipleSelection: [],
				listLoading: true,
				listQuery: Object.assign({}, defaultListQuery),
				operateType: null,
				operateOptions: [{
					label: "删除",
					value: 1
				}],
				dialogVisible: false,
				returnReason: Object.assign({}, defaultReturnReason),
				operateReasonId: null
			}
		},
		created() {
			this.getList();
		},
		methods: {
			handleAdd() {
				this.dialogVisible = true;
				this.operateReasonId = null;
				this.returnReason = Object.assign({}, defaultReturnReason);
			},
			handleConfirm() {
				if (this.operateReasonId == null) {
					//添加操作
					addReason(this.returnReason).then(response => {
						this.dialogVisible = false;
						this.operateReasonId = null;
						this.$message({
							message: '添加成功！',
							type: 'success',
							duration: 1000
						});
						this.getList();
					});
				} else {
					//编辑操作
					updateReason(this.operateReasonId, this.returnReason).then(response => {
						this.dialogVisible = false;
						this.operateReasonId = null;
						this.$message({
							message: '修改成功！',
							type: 'success',
							duration: 1000
						});
						this.getList();
					});
				}
			},
			handleUpdate(index, row) {
				this.dialogVisible = true;
				this.operateReasonId = row.id;
				getReasonDetail(row.id).then(response => {
					this.returnReason = response.data;
				});
			},
			handleDelete(index, row) {
				let ids = [];
				ids.push(row.id);
				this.deleteReason(ids);
			},
			handleStatusChange(index, row) {
				let ids = [];
				ids.push(row.id);
				let param = new URLSearchParams();
				param.append("status", row.status);
				param.append("ids", ids);
				updateStatus(param).then(response => {
					this.$message({
						message: '状态修改成功',
						type: 'success'
					});
					this.getList();
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
			getList() {
				this.listLoading = true;
				fetchList(this.listQuery).then(response => {
					this.listLoading = false;
					this.list = response.data.records;
					this.total = response.data.total;
				});
			},
			deleteReason(ids) {
				this.$confirm('是否要进行该删除操作?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let params = new URLSearchParams();
					params.append("ids", ids);
					deleteReason(params).then(response => {
						this.$message({
							message: '删除成功！',
							type: 'success',
							duration: 1000
						});
						this.listQuery.pageIndex = 1;
						this.getList();
					});
				}).catch(() =>{})
			},
		}
	}
</script>
<style scoped>
	.input-width {
		width: 80%;
	}
</style>
