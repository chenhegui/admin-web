<template>
	<div>
		<div class="title">编辑分类</div>
		<el-row :gutter="20">
			<el-col :span="14" :offset="4">
				<div class="box">
					<el-form :model="floor" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
						<el-form-item label="分类名称" prop="name" required>
							<el-input v-model="floor.name"></el-input>
						</el-form-item>
						<el-form-item label="副标题" prop="title">
							<el-input v-model="floor.title"></el-input>
							<div style="color: #aaa;">注意：如果不填写副标题，在首页上不会显示副标题</div>
						</el-form-item>
						<el-form-item label="more的文字" prop="moreText" required>
							<el-input v-model="floor.moreText"></el-input>
						</el-form-item>
						<el-form-item label="排序" prop="seq" required>
							<el-input-number v-model="floor.seq" :min="0" :max="10" label="请输入排序"></el-input-number>
							<span style="margin-left: 15px; color: #aaa;">注意：数字越大，则显示越靠后</span>
						</el-form-item>
						<el-form-item label="是否启用" prop="use" required>
							<el-switch v-model="floor.use" active-text="启用" inactive-text="暂不启用">
							</el-switch>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="submitForm">确定</el-button>
						</el-form-item>
					</el-form>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import {
		updateFloor,
		detailFloor
	} from '@/api/index'
	export default {
		data() {
			return {
				floor: {},
				rules: {
					name: [{
						required: true,
						message: '请输入分类名称',
						trigger: 'blur'
					}],
					moreText: [{
						required: true,
						message: '请输入more的文字',
						trigger: 'blur'
					}],
					seq: [{
						required: true,
						message: '请输入排序',
						trigger: 'blur'
					}],
					use: [{
						required: true,
						message: '请选择是否启用',
						trigger: 'blur'
					}]
				}
			}
		},
		created(){
			this.getData();
		},
		methods: {
			getData(){
				detailFloor(this.$route.query.id).then(res =>{
					this.floor = res.data;
				})
			},
			submitForm() {
				this.$refs['ruleForm'].validate((valid) => {
					if (valid) {
						updateFloor(this.floor).then(res =>{
							this.$message({
								message: '编辑成功',
								type: 'success'
							});
							this.$router.push({
								name: 'index_floor'
							})
						})
					} else {
						this.$message({
							message: '请按照要求填写表单',
							type: 'warning'
						});
						return false;
					}
				});
			}
		}
	}
</script>

<style lang="less" scoped>
	.title {
		line-height: 60px;
		font-size: 26px;
		margin-left: 30px;
	}

	.box {
		margin-top: 40px;
	}
</style>
