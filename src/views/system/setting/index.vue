<template>
	<div class="member">
		<div>
			<div class="top">

			</div>
			<el-table :data="tableData" style="width: 100%">
				<el-table-column label="ID" prop="id">
				</el-table-column>
				<el-table-column label="键中文名称" prop="keyCn">
				</el-table-column>
				<el-table-column label="键英文名称" prop="key">
				</el-table-column>
				<el-table-column label="值" prop="value">
				</el-table-column>
				</el-table-column>
				<el-table-column label="操作" prop="action">
					<template slot-scope="scope">
						<el-button size="mini" type="primary" @click="getEdit(scope.row)">编辑</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<el-dialog title="编辑设置" :visible.sync="dialogFormVisible">
			<div>
				<el-row :gutter="20">
					<el-col :span="20" :offset="2">
						<div>
							<el-form ref="form" :model="form" :rules="rules" label-width="160px">
								<el-form-item label="键中文名称" prop="keyCn">
									<el-input v-model="form.keyCn" placeholder="请输入键中文名称"></el-input>
								</el-form-item>
								<el-form-item label="键英文名称" prop="key">
									<el-input v-model="form.key" disabled></el-input>
								</el-form-item>
								<el-form-item label="值" prop="value">
									<el-input v-model="form.value" placeholder="请输入值"></el-input>
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
		listSystemSetting,
		updateSystemSetting
	} from '@/api/system'

	export default {
		name: 'system_setting',
		data() {
			return {
				tableData: [],
				dialogFormVisible: false,
				form: {},
				rules: {
					keyCn: [{
						required: true,
						message: '中文名称不能为空',
						trigger: 'blur'
					}],
					value: [{
						required: true,
						message: '值不能为空',
						trigger: 'blur'
					}]
				}
			}
		},
		methods: {
			getList() {
				listSystemSetting().then(res => {
					this.tableData = res.data
				})
			},
			save() {
				this.$refs['form'].validate((valid) => {
					if (valid) {
						updateSystemSetting(this.form).then(res => {
							this.$message({
								message: '修改成功',
								type: 'success'
							})
							this.dialogFormVisible = false
							this.getList()
						})
					} else {
						this.$message({
							message: '请按要求填写表单',
							type: 'warning'
						})
					}
				})
			},
			getEdit(item) {
				this.form = item;
				if (this.$refs['form'] !== undefined) {
					this.$refs['form'].resetFields()
				}
				this.dialogFormVisible = true
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
