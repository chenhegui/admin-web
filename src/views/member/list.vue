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
					<el-form-item label="用户ID：">
						<el-input clearable style="width: 200px" v-model="listQuery.userId" placeholder="请输入用户ID"></el-input>
					</el-form-item>
					<el-form-item label="用户openId：">
						<el-input clearable style="width: 300px" v-model="listQuery.openId" placeholder="请输入用户openId"></el-input>
					</el-form-item>
					<el-form-item label="用户昵称：">
						<el-input clearable style="width: 200px" v-model="listQuery.nickName" placeholder="请输入用户昵称"></el-input>
					</el-form-item>
					<el-form-item label="用户手机号：">
						<el-input clearable style="width: 200px" v-model="listQuery.phone" placeholder="请输入用户手机号"></el-input>
					</el-form-item>
					<el-form-item label="会员卡号：">
						<el-input clearable style="width: 300px" v-model="listQuery.orderId" placeholder="请输入会员卡号"></el-input>
					</el-form-item>
				</el-form>
			</div>
		</el-card>
		<el-card class="operate-container" shadow="never">
			<i class="el-icon-tickets"></i>
			<span>数据列表</span>
		</el-card>
		<div class="table-container">
			<el-table ref="productTable" :data="list" v-loading="listLoading">
				<el-table-column type="expand">
					<template slot-scope="props">
						<el-form label-position="left" inline class="demo-table-expand">
							<el-form-item label="用户openId">
								<span>{{ props.row.openId }}</span>
							</el-form-item>
							<el-form-item label="是否是新用户">
								<span>{{ props.row.isNewUser ? '是' : '否' }}</span>
							</el-form-item>
							<el-form-item label="真实姓名">
								<span>{{ props.row.realName }}</span>
							</el-form-item>
							<el-form-item label="创建时间">
								<span>{{ props.row.createTime }}</span>
							</el-form-item>
							<el-form-item label="用户头像" style="width: 100%;">
								<el-image fit="contain" style="width: 100px; height: 100px" :src="props.row.headUrl" :preview-src-list="[props.row.headUrl]">
								</el-image>
							</el-form-item>
						</el-form>
					</template>
				</el-table-column>
				<el-table-column label="用户ID" prop="id" width="80" align="center">
				</el-table-column>
				<el-table-column label="用户昵称" prop="nickName" align="center">
				</el-table-column>
				<el-table-column label="用户手机号" prop="phone" align="center">
				</el-table-column>
				<el-table-column label="会员卡号" prop="number" width="220" align="center">
				</el-table-column>
				<el-table-column label="余额" prop="balance" width="80" align="center">
				</el-table-column>
				<el-table-column label="已消费" prop="cost" width="80" align="center">
				</el-table-column>
				<el-table-column label="会员类型" prop="memberName" width="80" align="center">
				</el-table-column>
				<el-table-column label="性别" prop="sex" align="center">
					<template slot-scope="scope">
						<div>
							<el-tag type="primary" disable-transitions v-if="scope.row.sex == 1">
								男
							</el-tag>
							<el-tag type="danger" disable-transitions v-if="scope.row.sex == 2">
								女
							</el-tag>
						</div>
					</template>
				</el-table-column>
				<el-table-column label="生日" prop="birthday" width="100" align="center">
				</el-table-column>
				<el-table-column label="会员卡是否启用" prop="use" align="center">
					<template slot-scope="scope">
						<el-switch v-model="scope.row.use" @change="changeUse($event, scope.row)">
						</el-switch>
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
		pageUserCard,
		updateUserCardStates
	} from '@/api/system'

	const defaultListQuery = {
		nickName: '',
		phone: '',
		userId: '',
		openId: '',
		number: '',
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
				if (this.listQuery.nickName) {
					data.nickName = this.listQuery.nickName
				}
				if (this.listQuery.phone) {
					data.phone = this.listQuery.phone
				}
				if (this.listQuery.userId) {
					data.userId = this.listQuery.userId
				}
				if (this.listQuery.openId) {
					data.openId = this.listQuery.openId
				}
				if (this.listQuery.number) {
					data.number = this.listQuery.number
				}
				this.listLoading = true;
				pageUserCard(data).then(res => {
					this.listLoading = false;
					this.list = res.data.records;
					this.total = res.data.total;
				});
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
				this.listQuery = { ...defaultListQuery};
				this.getList()
			},
			changeUse($event, row){
				let data = {
					id: row.id,
					use: $event
				}
				if($event){
					this.$confirm('你确定要启用这个会员卡?', '会员卡启用提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						updateUserCardStates(data).then(res =>{
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
					this.$confirm('你确定要暂不启用这个会员卡?', '会员卡暂不启用提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						updateUserCardStates(data).then(res =>{
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
			}
		}
	}
</script>
<style lang="less" scoped>
	.top-title {
		overflow: hidden;
	}
</style>
