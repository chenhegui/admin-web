<template>
	<div style="margin-top: 50px">
		<el-form :model="value" :rules="rules" ref="productInfoForm" label-width="120px" style="width: 600px" size="small">
			<el-form-item label="商品分类：" prop="productCategoryId">
				<el-select v-model="value.productCategoryId" placeholder="请选择商品分类" @change="getProductCategoryName">
					<el-option v-for="item in productCateOptions" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="商品名称：" prop="name">
				<el-input v-model="value.name"></el-input>
			</el-form-item>
			<el-form-item label="副标题：" prop="subTitle">
				<el-input v-model="value.subTitle"></el-input>
			</el-form-item>
			<el-form-item label="商品介绍：">
				<el-input :autosize="{ minRows: 4}" v-model="value.description" type="textarea" placeholder="请输入内容"></el-input>
			</el-form-item>
			<el-form-item label="商品售价：">
				<el-input v-model="value.price"></el-input>
			</el-form-item>
			<el-form-item label="市场价：">
				<el-input v-model="value.originalPrice"></el-input>
			</el-form-item>
			<el-form-item label="排序">
				<el-input v-model="value.sort"></el-input>
			</el-form-item>
			<el-form-item style="text-align: center">
				<el-button type="primary" size="medium" @click="handleNext('productInfoForm')">下一步，填写商品促销</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	import {
		listProductCate
	} from '@/api/productCate'

	export default {
		name: "ProductInfoDetail",
		props: {
			value: Object,
			isEdit: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				productCateOptions: [],
				rules: {
					name: [{
							required: true,
							message: '请输入商品名称',
							trigger: 'blur'
						},
						{
							min: 2,
							max: 140,
							message: '长度在 2 到 140 个字符',
							trigger: 'blur'
						}
					],
					subTitle: [{
						required: true,
						message: '请输入商品副标题',
						trigger: 'blur'
					}],
					productCategoryId: [{
						required: true,
						message: '请选择商品分类',
						trigger: 'blur'
					}],
					description: [{
						required: true,
						message: '请输入商品介绍',
						trigger: 'blur'
					}]
				}
			};
		},
		created() {
			this.getProductCateList();
		},
		methods: {
			getProductCateList() {
				listProductCate().then(response => {
					this.productCateOptions = [];
					response.data.forEach(item =>{
						this.productCateOptions.push({
							label: item.categoryName,
							value: item.id
						});
					})
				});
			},
			handleNext(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.$emit('nextStep');
					} else {
						this.$message({
							message: '请按要求填写表单',
							type: 'warning'
						});
						return false;
					}
				});
			},
			getProductCategoryName(val){
				this.productCateOptions.forEach(item =>{
					if(item.value == val){
						this.value.productCategoryName = item.label;
					}
				});
			}
		}
	}
</script>

<style scoped>
</style>
