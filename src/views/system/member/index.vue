<template>
	<div class="member">
		<div>
			<div class="top">
				<el-button class="filter-item" size="mini" type="primary" icon="el-icon-plus" @click="add">新增</el-button>
			</div>
			<el-table :data="tableData" style="width: 100%">
				<el-table-column label="ID" prop="id" width="60">
				</el-table-column>
				<el-table-column label="会员名称" prop="name">
				</el-table-column>
				<el-table-column label="升级条件金额(元)" prop="standardMoney" min-width="130">
				</el-table-column>
				<el-table-column label="是否有免邮特权" prop="priviledgeFreeFreight" min-width="120">
					<template slot-scope="scope">
						<div v-if="scope.row.priviledgeFreeFreight == true">是</div>
						<div v-if="scope.row.priviledgeFreeFreight == false">否</div>
					</template>
				</el-table-column>
				<el-table-column label="免运费标准(元)" prop="freeFreightPoint" min-width="130">
					<template slot-scope="scope">
						<div v-if="scope.row.priviledgeFreeFreight == true">{{scope.row.freeFreightPoint}}</div>
						<div v-if="scope.row.priviledgeFreeFreight == false">暂无</div>
					</template>
				</el-table-column>
				<el-table-column label="是否有会员价格特权" prop="priviledgeMemberPrice" min-width="146">
					<template slot-scope="scope">
						<div v-if="scope.row.priviledgeMemberPrice == true">是</div>
						<div v-if="scope.row.priviledgeMemberPrice == false">否</div>
					</template>
				</el-table-column>
				<el-table-column label="会员特权折扣" prop="memberDiscount" min-width="130">
					<template slot-scope="scope">
						<div v-if="scope.row.priviledgeMemberPrice == true">{{scope.row.memberDiscount}}折</div>
						<div v-if="scope.row.priviledgeMemberPrice == false">暂无</div>
					</template>
				</el-table-column>
				<el-table-column label="是否有生日特权" prop="priviledgeBirthday" min-width="120">
					<template slot-scope="scope">
						<div v-if="scope.row.priviledgeBirthday == true">是</div>
						<div v-if="scope.row.priviledgeBirthday == false">否</div>
					</template>
				</el-table-column>
				<el-table-column label="生日特权折扣" prop="birthdayDiscount" min-width="130">
					<template slot-scope="scope">
						<div v-if="scope.row.priviledgeBirthday == true">{{scope.row.birthdayDiscount}}折</div>
						<div v-if="scope.row.priviledgeBirthday == false">暂无</div>
					</template>
				</el-table-column>
				<el-table-column label="创建时间" prop="createTime" width="156">
				</el-table-column>
				</el-table-column>
				<el-table-column label="操作" prop="action" width="146">
					<template slot-scope="scope">
						<el-button size="mini" type="primary" @click="getEdit(scope.row)">编辑</el-button>
						<el-button size="mini" type="danger" @click="deleteMember(scope.row.id)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<el-dialog :title="title" :visible.sync="dialogFormVisible">
			<div>
				<el-row :gutter="20">
					<el-col :span="20" :offset="2">
						<div>
							<el-form ref="form" :model="form" :rules="rules" label-width="160px">
								<el-form-item label="会员名称" prop="name">
									<el-input v-model="form.name" placeholder="请输入会员的名称"></el-input>
								</el-form-item>
								<el-form-item label="升级条件金额" prop="standardMoney">
									<el-input v-model="form.standardMoney" placeholder="温馨提示：单价为元"></el-input>
								</el-form-item>
								<el-form-item label="是否有免邮特权" prop="priviledgeFreeFreight">
									<el-switch v-model="form.priviledgeFreeFreight" active-text="是" inactive-text="否">
									</el-switch>
								</el-form-item>
								<el-form-item v-if="form.priviledgeFreeFreight" label="免运费标准" prop="freeFreightPoint" required>
									<el-input v-model="form.freeFreightPoint" placeholder="温馨提示：单价为元"></el-input>
								</el-form-item>
								<el-form-item label="是否有会员价格特权" prop="priviledgeMemberPrice">
									<el-switch v-model="form.priviledgeMemberPrice" active-text="是" inactive-text="否">
									</el-switch>
								</el-form-item>
								<el-form-item v-if="form.priviledgeMemberPrice" label="会员特权折扣" prop="memberDiscount" required>
									<el-input v-model="form.memberDiscount" placeholder="温馨提示：两位小数"></el-input>
								</el-form-item>
								<el-form-item label="是否有生日特权" prop="priviledgeBirthday">
									<el-switch v-model="form.priviledgeBirthday" active-text="是" inactive-text="否">
									</el-switch>
								</el-form-item>
								<el-form-item v-if="form.priviledgeBirthday" label="生日特权折扣" prop="birthdayDiscount" required>
									<el-input v-model="form.birthdayDiscount" placeholder="温馨提示：两位小数"></el-input>
								</el-form-item>
								<el-form-item label="备注" prop="note">
									<el-input type="textarea" rows="4" v-model="form.note" placeholder="请输入备注"></el-input>
								</el-form-item>
							</el-form>
						</div>
					</el-col>
				</el-row>
			</div>

			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="save">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import {
		createMember,
		updateMember,
		detailMember,
		listMember,
		deleteMember
	} from '@/api/system'

	export default {
		name: 'system_member',
		data() {
			let checkFreeFreightPoint = (rule, value, callback) => {
				if (this.form.priviledgeFreeFreight) {
					if (!value) {
						return callback(new Error('免运费标准不能为空'));
					}
				}
				return callback();
			}
			let checkMemberDiscount = (rule, value, callback) => {
				if (this.form.priviledgeMemberPrice) {
					if (!value) {
						return callback(new Error('会员特权折扣不能为空'));
					}
				}
				return callback();
			}
			let checkBirthdayDiscount = (rule, value, callback) => {
				if (this.form.priviledgeBirthday) {
					if (!value) {
						return callback(new Error('生日特权折扣不能为空'));
					}
				}
				return callback();
			}
			return {
				tableData: [],
				dialogFormVisible: false,
				form: {
					name: '',
					standardMoney: '',
					priviledgeFreeFreight: false,
					freeFreightPoint: '',
					priviledgeMemberPrice: false,
					memberDiscount: '',
					priviledgeBirthday: false,
					birthdayDiscount: '',
					note: ''
				},
				rules: {
					name: [{
						required: true,
						message: '会员名称不能为空',
						trigger: 'blur'
					}],
					standardMoney: [{
						required: true,
						message: '升级条件金额不能为空',
						trigger: 'blur'
					}],
					priviledgeFreeFreight: [{
						type: 'boolean',
						required: true,
						message: '是否有免邮特权不能为空',
						trigger: 'change'
					}],
					freeFreightPoint: [{
						validator: checkFreeFreightPoint,
						trigger: 'blur'
					}],
					priviledgeMemberPrice: [{
						type: 'boolean',
						required: true,
						message: '是否有会员价格特权不能为空',
						trigger: 'change'
					}],
					memberDiscount: [{
						validator: checkMemberDiscount,
						trigger: 'blur'
					}],
					priviledgeBirthday: [{
						type: 'boolean',
						required: true,
						message: '是否有生日特权不能为空',
						trigger: 'change'
					}],
					birthdayDiscount: [{
						validator: checkBirthdayDiscount,
						trigger: 'blur'
					}]
				},
				title: '新增会员类型',
				type: 'add'
			}
		},
		methods: {
			getList() {
				listMember().then(res => {
					this.tableData = res.data
				})
			},
			clearData() {
				this.form = {
					name: '',
					standardMoney: '',
					priviledgeFreeFreight: false,
					freeFreightPoint: '',
					priviledgeMemberPrice: false,
					memberDiscount: '',
					priviledgeBirthday: false,
					birthdayDiscount: '',
					note: ''
				}
				if (this.$refs['form'] !== undefined) {
					this.$refs['form'].resetFields()
				}
			},
			add() {
				this.clearData()
				this.dialogFormVisible = true
				this.title = '新增会员类型'
				this.type = 'add'
			},
			save() {
				this.$refs['form'].validate((valid) => {
					if (valid) {
						if (this.type == 'add') {
							createMember(this.form).then(res => {
								this.$message({
									message: '新增成功',
									type: 'success'
								})
								this.dialogFormVisible = false
								this.getList()
							})
						} else {
							updateMember(this.form).then(res => {
								this.$message({
									message: '修改成功',
									type: 'success'
								})
								this.dialogFormVisible = false
								this.getList()
							})
						}
					} else {
						this.$message({
							message: '请按要求填写表单',
							type: 'warning'
						})
					}
				})
			},
			getEdit(item) {
				console.log(item)
				this.form = item;
				if (this.$refs['form'] !== undefined) {
					this.$refs['form'].resetFields()
				}
				this.dialogFormVisible = true
				this.title = '编辑会员类型'
				this.type = 'edit'
			},
			deleteMember(id) {
				this.$confirm('此操作将删除这个会员类型, 是否继续?', '删除提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					deleteMember(id).then(res => {
						this.$message({
							message: '删除成功',
							type: 'success'
						})
						this.getList()
					})
				}).catch(() => {})
			}
		},
		mounted() {
			this.getList()
		}
	}
</script>

<style lang="less" scoped>
	.member {
		margin: 15px 20px;
	}

	.demo-table-expand {
		font-size: 0;
	}

	.demo-table-expand label {
		width: 90px;
		color: #99a9bf;
	}

	.demo-table-expand .el-form-item {
		margin-right: 0;
		margin-bottom: 0;
		width: 50%;
	}

	.top {
		height: 60px;
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}
</style>
