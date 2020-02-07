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
						<el-input clearable style="width: 200px" v-model="listQuery.id" placeholder="请输入用户ID"></el-input>
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
					<el-form-item label="性别：">
						<el-select clearable style="width: 200px" v-model="listQuery.sex" placeholder="请选择消费类型">
							<el-option label="男" :value="1"> </el-option>
							<el-option label="女" :value="2"> </el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="是否是新用户：">
						<el-select clearable style="width: 200px" v-model="listQuery.isNewUser" placeholder="请选择消费类型">
							<el-option label="是" :value="true"> </el-option>
							<el-option label="否" :value="false"> </el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="会员卡号：">
						<el-input clearable style="width: 200px" v-model="listQuery.number" placeholder="请输入会员卡号"></el-input>
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
							<el-form-item label="头像">
								<div>
									<el-image fit="cover" style="width: 100px; height: 100px" :src="props.row.headUrl" :preview-src-list="[props.row.headUrl]">
									</el-image>
								</div>
							</el-form-item>
							<el-form-item label="用户openId">
								<span>{{ props.row.openId }}</span>
							</el-form-item>
							<el-form-item label="会员卡号">
								<span>{{ props.row.userCard.number }}</span>
							</el-form-item>
							<el-form-item label="会员卡余额">
								<span>￥{{ props.row.userCard.balance | priceFormat}}</span>
							</el-form-item>
							<el-form-item label="会员卡是否可用">
								<span>{{ props.row.userCard.use ? '是' : '否'}}</span>
							</el-form-item>
							<el-form-item label="满足会员升级条件金额">
								<span>￥{{ props.row.member.standardMoney | priceFormat}}</span>
							</el-form-item>
							<el-form-item label="是否有免邮特权">
								<span>{{ props.row.member.priviledgeFreeFreight ? '是' : '否'}}</span>
							</el-form-item>
							<el-form-item label="免运费标准" v-if="props.row.member.priviledgeFreeFreight">
								<span>￥{{ props.row.member.freeFreightPoint | priceFormat}}</span>
							</el-form-item>
							<el-form-item label="是否有会员价格特权">
								<span>{{ props.row.member.priviledgeMemberPrice ? '是' : '否'}}</span>
							</el-form-item>
							<el-form-item label="会员特权折扣" v-if="props.row.member.priviledgeMemberPrice">
								<span>{{ props.row.member.memberDiscount}}折</span>
							</el-form-item>
							<el-form-item label="是否有生日特权">
								<span>{{ props.row.member.priviledgeBirthday ? '是' : '否'}}</span>
							</el-form-item>
							<el-form-item label="生日特权折扣" v-if="props.row.member.priviledgeBirthday">
								<span>{{ props.row.member.birthdayDiscount}}折</span>
							</el-form-item>

						</el-form>
					</template>
				</el-table-column>
				<el-table-column label="用户ID" width="80" align="center" prop="id"></el-table-column>
				<el-table-column label="用户昵称" prop="nickName" align="center">
				</el-table-column>
				<el-table-column label="用户手机号" prop="phone" align="center">
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
				<el-table-column label="是否是新用户" prop="phone" align="center">
					<template slot-scope="scope">
						{{scope.row.isNewUser ? '是' : '否'}}
					</template>
				</el-table-column>
				<el-table-column label="用户状态" prop="status" align="center">
					<template slot-scope="scope">
						<div>
							<el-tag type="primary" disable-transitions v-if="scope.row.status == 0">
								正常
							</el-tag>
							<el-tag type="danger" disable-transitions v-if="scope.row.status == 1">
								禁用
							</el-tag>
						</div>
					</template>
				</el-table-column>
				<el-table-column label="真实姓名" prop="phone" align="center">
					<template slot-scope="scope">
						{{scope.row.realName ? scope.row.realName : '暂无'}}
					</template>
				</el-table-column>
				<el-table-column label="生日" prop="phone" align="center">
					<template slot-scope="scope">
						{{scope.row.birthday ? scope.row.birthday : '暂无'}}
					</template>
				</el-table-column>
				<el-table-column label="会员类型" prop="userType" align="center">
					<template slot-scope="scope">
						<div>
							<el-tag type="primary" disable-transitions>
								{{scope.row.member.name}}
							</el-tag>
						</div>
					</template>
				</el-table-column>
				<el-table-column label="消费金额(元)" prop="cost" align="right">
					<template slot-scope="scope">
						￥{{scope.row.cost | priceFormat}}
					</template>
				</el-table-column>
				<el-table-column label="创建时间" prop="createTime" width="160" align="center">
				</el-table-column>
				<el-table-column label="操作" width="160" align="center">
					<template slot-scope="scope">
						<el-button v-if="scope.row.status == 1" size="mini" type="primary" @click="handleOpen(scope.row)">启用
						</el-button>
						<el-button v-if="scope.row.status == 0" size="mini" type="warning" @click="handleDisable(scope.row)">禁用
						</el-button>
						<el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除
						</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div class="pagination-container" style="margin-bottom: 30px;">
			<el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="total, sizes,prev, pager, next,jumper"
			 :page-size="listQuery.pageSize" :page-sizes="[10, 20, 50, 80, 100]" :current-page.sync="listQuery.pageNum" :total="total">
			</el-pagination>
		</div>
	</div>
</template>
<script>
	import {
		pageUser,
		openUser,
		disableUser,
		deleteUser
	} from '@/api/system'

	import {
		priceFormat
	} from '@/utils/date'

	const defaultListQuery = {
		nickName: '',
		phone: '',
		sex: null,
		isNewUser: null,
		id: null,
		openId: '',
		number: '',
		pageIndex: 1,
		pageSize: 10,
	};
	export default {
		name: "productList",
		data() {
			return {
				listQuery: { ...defaultListQuery
				},
				list: null,
				total: null,
				listLoading: false,
				createTime: ''
			}
		},
		created() {
			this.getList();
		},
		filters: {
			priceFormat(value) {
				return priceFormat(value)
			}
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
				if (this.listQuery.id) {
					data.id = this.listQuery.id
				}
				if (this.listQuery.openId) {
					data.openId = this.listQuery.openId
				}
				if (this.listQuery.number) {
					data.number = this.listQuery.number
				}
				if (this.listQuery.sex != null && this.listQuery.sex != '') {
					data.sex = this.listQuery.sex
				}
				if (this.listQuery.isNewUser != null && this.listQuery.isNewUser != '') {
					data.isNewUser = this.listQuery.isNewUser
				}
				this.listLoading = true;
				pageUser(data).then(res => {
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
				this.listQuery = { ...defaultListQuery
				};
				this.getList()
			},
			handleOpen(row) {
				this.$confirm('是否要启用这个用户?', '启用提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					openUser(row.id).then(res => {
						this.$message({
							message: '启用成功',
							type: 'success',
							duration: 1000
						});
						this.getList();
					})
				}).catch(() => {})
			},
			handleDisable(row) {
				this.$confirm('是否要禁用这个用户?', '禁用提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					disableUser(row.id).then(res => {
						this.$message({
							message: '禁用成功',
							type: 'success',
							duration: 1000
						});
						this.getList();
					})
				}).catch(() => {})
			},
			handleDelete(row) {
				this.$confirm('是否要删除这个用户?', '删除提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					deleteUser(row.id).then(res => {
						this.$message({
							message: '删除成功',
							type: 'success',
							duration: 1000
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

	.demo-table-expand .el-form-item {
		margin-right: 0;
		margin-bottom: 0;
		width: 49%;
	}
</style>
