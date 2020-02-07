<template> 
	<el-card class="form-container" shadow="never">
		<el-form :model="coupon" :rules="rules" ref="couponFrom" label-width="160px" size="small">
			<el-form-item label="优惠券类型：">
				<el-select v-model="coupon.type">
					<el-option label="普通增券" :value="0"></el-option>
					<el-option label="会员赠券" :value="1"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="选择可领的会员类型：" v-if="coupon.type == 1">
				<el-checkbox-group v-model="memberListIds">
					<el-checkbox v-for="(item, index) in memberList" :key="index" :label="item.id">{{item.name}}</el-checkbox>
				</el-checkbox-group>
			</el-form-item>
			<el-form-item label="优惠券名称：" prop="name">
				<el-input v-model="coupon.name" class="input-width"></el-input>
			</el-form-item>
			<el-form-item label="总发行量：" prop="publishCount">
				<el-input v-model.number="coupon.publishCount" placeholder="只能输入正整数" class="input-width"></el-input>
			</el-form-item>
			<el-form-item label="面额：" prop="amount">
				<el-input v-model.number="coupon.amount" placeholder="面值只能是数值，限2位小数" class="input-width">
					<template slot="append">元</template>
				</el-input>
			</el-form-item>
			<el-form-item label="每人限领：">
				<el-input v-model="coupon.perLimit" placeholder="只能输入正整数" class="input-width">
					<template slot="append">张</template>
				</el-input>
			</el-form-item>
			<el-form-item label="使用门槛：" prop="minPoint">
				<el-input v-model.number="coupon.minPoint" placeholder="只能输入正整数" class="input-width">
					<template slot="prepend">满</template>
					<template slot="append">元可用</template>
				</el-input>
			</el-form-item>
			<el-form-item label="有效期：">
				<el-date-picker type="datetime" placeholder="选择日期" v-model="coupon.startTime" style="width: 150px"></el-date-picker>
				<span style="margin-left: 20px;margin-right: 20px">至</span>
				<el-date-picker type="datetime" placeholder="选择日期" v-model="coupon.endTime" style="width: 150px"></el-date-picker>
			</el-form-item>
			<el-form-item label="可使用商品：">
				<el-radio-group v-model="coupon.useType">
					<el-radio-button :label="0">全场通用</el-radio-button>
					<el-radio-button :label="1">指定分类</el-radio-button>
					<el-radio-button :label="2">指定商品</el-radio-button>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="指定分类：" v-if="coupon.useType == 1">
				<el-select v-model="coupon.productCategoryId" placeholder="请选择分类名称">
					<el-option v-for="item in productCateOptions" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="指定商品：" v-if="coupon.useType == 2">
				<el-select v-model="coupon.productId" filterable remote reserve-keyword placeholder="商品名称" :remote-method="searchProductMethod"
				 :loading="selectProductLoading">
					<el-option v-for="item in selectProductOptions" :key="item.productId" :label="item.productName" :value="item.productId">
						<span style="float: left">{{ item.productName }}</span>
						<span style="float: right; color: #8492a6; font-size: 13px; margin-left: 10px;">NO.{{ item.productSn }}</span>
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="备注：">
				<el-input class="input-width" type="textarea" :rows="5" placeholder="请输入内容" v-model="coupon.note">
				</el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSubmit('couponFrom')">提交</el-button>
				<el-button v-if="!isEdit" @click="resetForm('couponFrom')">重置</el-button>
			</el-form-item>
		</el-form>
	</el-card>
</template>
<script>
	import {
		createCoupon,
		getCoupon,
		updateCoupon
	} from '@/api/coupon';
	import {
		fetchSimpleList as fetchProductList
	} from '@/api/product';
	import {
		listProductCate as fetchListWithChildren
	} from '@/api/productCate'
	import {
		listMember
	} from '@/api/system'
	const defaultCoupon = {
		type: 0,
		name: null,
		amount: null,
		perLimit: 1,
		minPoint: null,
		startTime: null,
		endTime: null,
		useType: 0,
		note: null,
		publishCount: null,
		memberListIds: null,
		productId: null,
		productCategoryId: null
		
	};
	export default {
		name: 'CouponDetail',
		props: {
			isEdit: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				coupon: Object.assign({}, defaultCoupon),
				rules: {
					name: [{
							required: true,
							message: '请输入优惠券名称',
							trigger: 'blur'
						},
						{
							min: 2,
							max: 140,
							message: '长度在 2 到 140 个字符',
							trigger: 'blur'
						}
					],
					publishCount: [{
						type: 'number',
						required: true,
						message: '只能输入正整数',
						trigger: 'blur'
					}],
					amount: [{
						type: 'number',
						required: true,
						message: '面值只能是数值，0.01-10000，限2位小数',
						trigger: 'blur'
					}],
					minPoint: [{
						type: 'number',
						required: true,
						message: '只能输入正整数',
						trigger: 'blur'
					}]
				},
				selectProductLoading: false,
				selectProductOptions: [],
				selectProductCate: null,
				productCateOptions: [],
				memberList: []
			}
		},
		created() {
			if (this.isEdit) {
				getCoupon(this.$route.query.id).then(response => {
					this.coupon = response.data;
					if(this.coupon.useType == 2){
						this.selectProductOptions.push({
							productId: this.coupon.product.id,
							productName: this.coupon.product.name,
							productSn: this.coupon.product.productSn
						})
					}
				});
			}
			this.getProductCateList();
			this.getMemberList();
		},
		computed: {
			memberListIds: {
				get() {
					let list = [];
					if (this.coupon.memberListIds === undefined || this.coupon.memberListIds == null || this.coupon.memberListIds ===
						'') return list;
					let ids = this.coupon.memberListIds.split(',').forEach(item => {
						list.push(Number(item));
					})
					return list;
				},
				set(newValue) {
					let memberListIds = '';
					if (newValue != null && newValue.length > 0) {
						newValue.forEach(item => {
							memberListIds += item + ',';
						})
						if (memberListIds.endsWith(',')) {
							memberListIds = memberListIds.substr(0, memberListIds.length - 1)
						}
						this.coupon.memberListIds = memberListIds;
					} else {
						this.coupon.memberListIds = null;
					}
				}
			}
		},
		methods: {
			onSubmit(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.$confirm('是否提交数据', '提示', {
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							type: 'warning'
						}).then(() => {
							if (this.isEdit) {
								updateCoupon(this.$route.query.id, this.coupon).then(response => {
									this.$refs[formName].resetFields();
									this.$message({
										message: '修改成功',
										type: 'success',
										duration: 1000
									});
									this.$router.back();
								});
							} else {
								createCoupon(this.coupon).then(response => {
									this.$refs[formName].resetFields();
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
							message: '验证失败',
							type: 'error',
							duration: 1000
						});
						return false;
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
				this.coupon = Object.assign({}, defaultCoupon);
			},
			searchProductMethod(query) {
				if (query !== '') {
					this.selectProductLoading = true;
					fetchProductList({
						keyword: query
					}).then(response => {
						this.selectProductLoading = false;
						let productList = response.data.records;
						this.selectProductOptions = [];
						for (let i = 0; i < productList.length; i++) {
							let item = productList[i];
							this.selectProductOptions.push({
								productId: item.id,
								productName: item.name,
								productSn: item.productSn
							});
						}
					});
				} else {
					this.selectProductOptions = [];
				}
			},
			getProductCateList() {
				fetchListWithChildren().then(response => {
					let list = response.data;
					this.productCateOptions = [];
					for (let i = 0; i < list.length; i++) {
						this.productCateOptions.push({
							label: list[i].categoryName,
							value: list[i].id
						});
					}
				});
			},
			getMemberList() {
				listMember().then(res => {
					this.memberList = res.data;
				})
			}
		}
	}
</script>
<style scoped>
	.input-width {
		width: 60%;
	}
</style>
