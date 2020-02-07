<template>
	<el-card class="form-container" shadow="never">
		<el-form :model="productCate" :rules="rules" ref="productCateFrom" label-width="150px">
			<el-form-item label="分类名称：" prop="categoryName">
				<el-input v-model="productCate.categoryName"></el-input>
			</el-form-item>
			<el-form-item label="排序：" prop="seq">
				<el-input-number :min="0" v-model="productCate.seq"></el-input-number>
			</el-form-item>
			<el-form-item label="是否启用：" prop="used">
				<el-radio-group v-model="productCate.used">
					<el-radio :label="true">是</el-radio>
					<el-radio :label="false">否</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSubmit('productCateFrom')">提交</el-button>
				<el-button v-if="!isEdit" @click="resetForm('productCateFrom')">重置</el-button>
				<el-button @click="back()">返回</el-button>
			</el-form-item>
		</el-form>
	</el-card>
</template>

<script>
	import {
		createProductCate,
		updateProductCate,
		getProductCate
	} from '@/api/productCate';

	const defaultProductCate = {
		categoryName: '',
		seq: 0,
		used: false
	};
	export default {
		name: "ProductCateDetail",
		props: {
			isEdit: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				productCate: {...defaultProductCate},
				rules: {
					categoryName: [{
							required: true,
							message: '请输入品牌名称',
							trigger: 'blur'
						},
						{
							min: 2,
							max: 140,
							message: '长度在 2 到 140 个字符',
							trigger: 'blur'
						}
					],
					seq: [{
						required: true,
						message: '请输入顺序',
						trigger: 'blur'
					}],
					used: [{
						required: true,
						message: '请输入选择是否显示',
						trigger: 'blur'
					}]
				}
			}
		},
		created() {
			if (this.isEdit) {
				getProductCate(this.$route.query.id).then(response => {
					this.productCate = response.data;
				});
			} else {
				this.productCate = {...defaultProductCate};
			}
		},
		methods: {
			back() {
				this.$router.back();
			},
			onSubmit(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.$confirm('是否提交数据', '提示', {
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							type: 'warning'
						}).then(() => {
							if (this.isEdit) {
								updateProductCate(this.productCate).then(response => {
									this.$message({
										message: '修改成功',
										type: 'success',
										duration: 1000
									});
									this.$router.back();
								});
							} else {
								createProductCate(this.productCate).then(response => {
									this.$message({
										message: '提交成功',
										type: 'success',
										duration: 1000
									});
									this.$router.back();
								});
							}
						});

					} else {
						this.$message({
							message: '请按要求填写表单',
							type: 'warning'
						});
						return false;
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
				this.productCate = {...defaultProductCate};
			}
		}
	}
</script>

<style scoped>

</style>
