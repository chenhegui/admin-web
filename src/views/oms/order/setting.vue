<template> 
	<el-card class="form-container" shadow="never">
		<el-form :model="orderSetting" ref="orderSettingForm" :rules="rules" label-width="150px">
			<el-form-item label="正常订单超过：" prop="ORDER_CANCEL_TIME_OUT">
				<el-input v-model="orderSetting.ORDER_CANCEL_TIME_OUT" class="input-width">
					<template slot="append">分</template>
				</el-input>
				<span class="note-margin">未付款，订单自动关闭</span>
			</el-form-item>
			<el-form-item label="发货超过：" prop="ORDER_TAKE">
				<el-input v-model="orderSetting.ORDER_TAKE" class="input-width">
					<template slot="append">天</template>
				</el-input>
				<span class="note-margin">未收货，订单自动完成</span>
			</el-form-item>
			<el-form-item>
				<el-button @click="confirm('orderSettingForm')" type="primary">提交</el-button>
			</el-form-item>
		</el-form>
	</el-card>
</template>
<script>
	import {
		getOrderSetting,
		updateOrderSetting
	} from '@/api/orderSetting';
	const defaultOrderSetting = {
		id: null,
		ORDER_CANCEL_TIME_OUT: null,
		ORDER_TAKE: 0
	};
	const checkTime = (rule, value, callback) => {
		if (!value) {
			return callback(new Error('时间不能为空'));
		}
		let intValue = parseInt(value);
		if (!Number.isInteger(intValue)) {
			return callback(new Error('请输入数字值'));
		}
		callback();
	};
	export default {
		name: 'orderSetting',
		data() {
			return {
				orderSetting: Object.assign({}, defaultOrderSetting),
				rules: {
					ORDER_CANCEL_TIME_OUT: {
						validator: checkTime,
						trigger: 'blur'
					},
					ORDER_TAKE: {
						validator: checkTime,
						trigger: 'blur'
					}
				}
			}
		},
		created() {
			this.getDetail();
		},
		methods: {
			confirm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.$confirm('是否要提交修改?', '提示', {
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							type: 'warning'
						}).then(() => {
							let data = {
								ORDER_CANCEL_TIME_OUT: Number(this.orderSetting.ORDER_CANCEL_TIME_OUT),
								ORDER_TAKE: Number(this.orderSetting.ORDER_TAKE)
							}
							updateOrderSetting(data).then(response => {
								this.getDetail()
								this.$message({
									type: 'success',
									message: '提交成功!',
									duration: 1000
								});
							})
						}).catch(() =>{})
					} else {
						this.$message({
							message: '提交参数不合法',
							type: 'warning'
						});
						return false;
					}
				});
			},
			getDetail() {
				getOrderSetting().then(response => {
					this.orderSetting = response.data;
				})
			}
		}
	}
</script>
<style scoped>
	.input-width {
		width: 50%;
	}

	.note-margin {
		margin-left: 15px;
	}
</style>
