<template>
	<div class="detail-container">
		<el-card shadow="never">
			<div style="margin-top: 20px">
				<span class="font-small">退货商品</span>
			</div>
			<div class="product">
				<div class="item" v-for="(item, index) in order.orderProductList" :key="index">
					<div class="table-layout">
						<el-row>
							<el-col :span="8" class="table-cell-title">商品名称</el-col>
							<el-col :span="16" class="table-cell-title">商品副标题</el-col>
						</el-row>
						<el-row>
							<el-col :span="8" class="table-cell">{{item.productName}}</el-col>
							<el-col :span="16" class="table-cell">{{item.subTitle}}</el-col>
						</el-row>
						<el-row>
							<el-col :span="6" class="table-cell-title">优惠卷金额</el-col>
							<el-col :span="6" class="table-cell-title">商品自带优惠金额</el-col>
							<el-col :span="6" class="table-cell-title">商品总价</el-col>
							<el-col :span="6" class="table-cell-title">实际支付金额</el-col>
						</el-row>
						<el-row>
							<el-col :span="6" class="table-cell">-￥{{item.couponAmount | priceFormat}}</el-col>
							<el-col :span="6" class="table-cell">-￥{{item.promotionPrice | priceFormat}}</el-col>
							<el-col :span="6" class="table-cell">￥{{item.productPrice | priceFormat}}</el-col>
							<el-col :span="6" class="table-cell">￥{{item.payPrice | priceFormat}}</el-col>
						</el-row>
						<el-row>
							<el-col :span="24" class="table-cell-title">SUK 信息</el-col>
						</el-row>
					</div>
					<el-table :data="item.orderSkuList" style="width: 100%;margin-top: 0px; border-top: none;" border>
						<el-table-column label="商品图片" align="center">
							<template slot-scope="scope">
								<div v-if="scope.row.pic == null">
									<el-image style="width: 120px; height: 100px" :src="item.productPic" :preview-src-list="[item.productPic]">
									</el-image>
								</div>
								<div v-else>
									<el-image style="width: 120px; height: 100px" :src="scope.row.pic" :preview-src-list="[scope.row.pic]">
									</el-image>
								</div>
							</template>
						</el-table-column>
						<el-table-column label="商品SKUCODE" align="center">
							<template slot-scope="scope">
								<div>{{scope.row.productSkuCode}}</div>
							</template>
						</el-table-column>
						<el-table-column label="价格" width="120" align="center">
							<template slot-scope="scope">
								<p>￥{{scope.row.price | priceFormat}}</p>
							</template>
						</el-table-column>
						<el-table-column label="属性" width="120" align="center">
							<template slot-scope="scope">
								<div style="margin-bottom: 8px;" v-for="(ele, eleIndex) in scope.row.sp.split(',')" :key="eleIndex">
									<el-tag>{{ele}}</el-tag>
								</div>
							</template>
						</el-table-column>
						<el-table-column label="数量" width="120" align="center">
							<template slot-scope="scope">
								{{scope.row.quantity}}
							</template>
						</el-table-column>
					</el-table>
				</div>
			</div>
			<div style="float: right;margin: 20px">
				合计：
				<span>
					商品总价：<span class="color-danger">￥{{order.totalAmount | priceFormat}}</span>
				</span>
				<span style="margin-left: 15px;">
					实际支付金额：<span class="color-danger">￥{{order.payAmount | priceFormat}}</span>
				</span>
			</div>
		</el-card>
		<el-card shadow="never" class="standard-margin">
			<span class="font-title-medium">服务单信息</span>
			<div class="form-container-border">
				<el-row>
					<el-col :span="6" class="form-border form-left-bg font-small">服务单号</el-col>
					<el-col class="form-border font-small" :span="18">{{orderReturnApply.id}}</el-col>
				</el-row>
				<el-row>
					<el-col class="form-border form-left-bg font-small" :span="6">申请状态</el-col>
					<el-col class="form-border font-small" :span="18">{{orderReturnApply.status | formatStatus}}</el-col>
				</el-row>
				<el-row>
					<el-col :span="6" class="form-border form-left-bg font-small" style="height:50px;line-height:30px">订单编号
					</el-col>
					<el-col class="form-border font-small" :span="18" style="height:50px">
						{{orderReturnApply.orderSn}}
						<el-button type="text" size="small" @click="handleViewOrder">查看</el-button>
					</el-col>
				</el-row>
				<el-row>
					<el-col class="form-border form-left-bg font-small" :span="6">申请时间</el-col>
					<el-col class="form-border font-small" :span="18">{{orderReturnApply.createTime | formatTime}}</el-col>
				</el-row>
				<el-row>
					<el-col class="form-border form-left-bg font-small" :span="6">用户昵称</el-col>
					<el-col class="form-border font-small" :span="18">{{orderReturnApply.memberUsername}}</el-col>
				</el-row>
				<el-row>
					<el-col class="form-border form-left-bg font-small" :span="6">联系人</el-col>
					<el-col class="form-border font-small" :span="18">{{orderReturnApply.returnName}}</el-col>
				</el-row>
				<el-row>
					<el-col class="form-border form-left-bg font-small" :span="6">联系电话</el-col>
					<el-col class="form-border font-small" :span="18">{{orderReturnApply.returnPhone}}</el-col>
				</el-row>
				<el-row>
					<el-col class="form-border form-left-bg font-small" :span="6">退款方式</el-col>
					<el-col class="form-border font-small" :span="18">{{orderReturnApply.type | returnType}}</el-col>
				</el-row>
				<el-row>
					<el-col class="form-border form-left-bg font-small" :span="6">退款备注</el-col>
					<el-col class="form-border font-small" :span="18">{{orderReturnApply.note}}</el-col>
				</el-row>
				<el-row>
					<el-col class="form-border form-left-bg font-small" :span="6">退货原因</el-col>
					<el-col class="form-border font-small" :span="18">{{orderReturnApply.reason}}</el-col>
				</el-row>
				<el-row>
					<el-col class="form-border form-left-bg font-small" :span="6">问题描述</el-col>
					<el-col class="form-border font-small" :span="18">{{orderReturnApply.description}}</el-col>
				</el-row>
				<el-row>
					<el-col class="form-border form-left-bg font-small" :span="6" style="height:100px;line-height:80px">凭证图片
					</el-col>
					<el-col class="form-border font-small" :span="18" style="height:100px">
						<img v-if="item != ''" v-for="(item, index) in proofPics" :key="index" style="width:80px;height:80px" :src="item">
					</el-col>
				</el-row>
			</div>
			<div class="form-container-border">
				<el-row>
					<el-col class="form-border form-left-bg font-small" :span="6">订单金额</el-col>
					<el-col class="form-border font-small" :span="18">￥{{totalAmount | priceFormat}}</el-col>
				</el-row>
				<el-row>
					<el-col class="form-border form-left-bg font-small" :span="6" style="height:52px;line-height:32px">确认退款金额
					</el-col>
					<el-col class="form-border font-small" style="height:52px" :span="18">
						￥
						<el-input size="small" v-model="updateStatusParam.returnAmount" :disabled="orderReturnApply.status!==0" style="width:200px;margin-left: 10px"></el-input>
					</el-col>
				</el-row>
			</div>
			<div class="form-container-border" v-show="orderReturnApply.status !== 0">
				<el-row>
					<el-col class="form-border form-left-bg font-small" :span="6">处理人员</el-col>
					<el-col class="form-border font-small" :span="18">{{orderReturnApply.handleMan}}</el-col>
				</el-row>
				<el-row>
					<el-col class="form-border form-left-bg font-small" :span="6">处理时间</el-col>
					<el-col class="form-border font-small" :span="18">{{orderReturnApply.handleTime | formatTime}}</el-col>
				</el-row>
				<el-row>
					<el-col class="form-border form-left-bg font-small" :span="6">处理备注</el-col>
					<el-col class="form-border font-small" :span="18">{{orderReturnApply.handleNote}}</el-col>
				</el-row>
			</div>
			<div class="form-container-border" v-show="orderReturnApply.status === 0">
				<el-row>
					<el-col class="form-border form-left-bg font-small" :span="6" style="height:52px;line-height:32px">选择退款方式</el-col>
					<el-col class="form-border font-small" :span="18">
						<el-select v-if="order.payType == 1" v-model="returnType" placeholder="请选择退款方式" style="margin-left: 15px;">
							<el-option label="退款到会员卡" :value="1"> </el-option>
						</el-select>
            <el-select  v-else v-model="returnType" placeholder="请选择退款方式" style="margin-left: 15px;">
            	<el-option label="退款到会员卡" :value="1"> </el-option>
            	<el-option label="退款到微信" :value="2"> </el-option>
            </el-select>
					</el-col>
				</el-row>
				<el-row v-if="returnType == 2">
					<el-col class="form-border form-left-bg font-small" :span="6" style="height:169px;display: flex; align-items: center;">退款到微信的支付截图</el-col>
					<el-col class="form-border font-small" :span="18">
						<el-upload style="margin-left: 15px;" action="/api/v1/img/save" :limit="3" list-type="picture-card" :on-preview="handlePictureCardPreview"
						 :on-remove="handleRemove" :on-exceed="handleExceed">
							<i class="el-icon-plus"></i>
						</el-upload>
					</el-col>
				</el-row>
				<el-row>
					<el-col class="form-border form-left-bg font-small" :span="6" style="height: 109px; display: flex; align-items: center;">处理备注</el-col>
					<el-col class="form-border font-small" :span="18">
						<el-input size="small" type="textarea" :autosize="{ minRows: 4, maxRows: 4}" v-model="updateStatusParam.handleNote"
						 style="padding: 0 15px;"></el-input>
					</el-col>
				</el-row>
			</div>
			<div style="margin-top:15px;text-align: center" v-show="orderReturnApply.status===0">
				<el-button type="primary" size="small" @click="handleReturn(2)">确认退款</el-button>
				<el-button type="danger" size="small" @click="handleReturn(3)">拒绝退款</el-button>
			</div>
		</el-card>
		<el-dialog :visible.sync="dialogVisible">
			<img width="100%" :src="dialogImageUrl" alt="">
		</el-dialog>
	</div>
</template>
<script>
	import {
		getApplyDetail,
		updateApplyStatus
	} from '@/api/returnApply';
	import {
		fetchList
	} from '@/api/companyAddress';
	import {
		priceFormat,
		formatDate
	} from '@/utils/date';

	const defaultUpdateStatusParam = {
		companyAddressId: null,
		handleMan: 'admin',
		handleNote: null,
		receiveMan: 'admin',
		receiveNote: null,
		returnAmount: 0,
		status: 0
	};
	export default {
		name: 'returnApplyDetail',
		data() {
			return {
				id: null,
				orderReturnApply: {},
				order: {},
				productList: null,
				proofPics: null,
				updateStatusParam: Object.assign({}, defaultUpdateStatusParam),
				companyAddressList: null,
				dialogImageUrl: '',
				dialogVisible: false,
				returnType: null
			}
		},
		created() {
			this.id = this.$route.query.id;
			this.getDetail();
		},
		computed: {
			totalAmount() {
				if (this.orderReturnApply != null) {
					return this.orderReturnApply.payAmount;
				} else {
					return 0;
				}
			},
			currentAddress() {
				console.log("currentAddress()");
				let id = this.updateStatusParam.companyAddressId;
				if (this.companyAddressList == null) return {};
				for (let i = 0; i < this.companyAddressList.length; i++) {
					let address = this.companyAddressList[i];
					if (address.id === id) {
						return address;
					}
				}
				return null;
			}
		},
		filters: {
			returnType(type) {
				if (type == 1) {
					return '退款到会员卡'
				} else if (type == 2) {
					return '退款到微信'
				}
			},
			formatStatus(status) {
				if (status === 0) {
					return "待处理";
				} else if (status === 1) {
					return "退货中";
				} else if (status === 2) {
					return "已完成";
				} else {
					return "已拒绝";
				}
			},
			formatTime(time) {
				if (time == null || time === '') {
					return 'N/A';
				}
				let date = new Date(time);
				return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
			},
			formatRegion(address) {
				let str = address.province;
				if (address.city != null) {
					str += "  " + address.city;
				}
				str += "  " + address.region;
				return str;
			},
			priceFormat(value) {
				return priceFormat(value);
			}
		},
		methods: {
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			handlePictureCardPreview(file) {
				this.dialogImageUrl = file.url;
				this.dialogVisible = true;
			},
			handleExceed(files) {
				this.$message({
					type: 'warning',
					message: '最多只能上传3张截图',
					duration: 2000
				});
			},
			handleViewOrder() {
				this.$router.push({
					path: '/oms/orderDetail',
					query: {
						id: this.orderReturnApply.orderId
					}
				});
			},
			getDetail() {
				getApplyDetail(this.id).then(response => {
					console.log("getDetail")
					this.orderReturnApply = response.data;
					this.order = response.data.orderProductVO;
					// this.productList = [];
					// this.productList.push(this.orderReturnApply);
					if (this.orderReturnApply.proofPics != null) {
						this.proofPics = this.orderReturnApply.proofPics.split(",")
					}
					// //退货中和完成
					// if (this.orderReturnApply.status === 1 || this.orderReturnApply.status === 2) {
					// 	this.updateStatusParam.returnAmount = this.orderReturnApply.returnAmount;
					// 	this.updateStatusParam.companyAddressId = this.orderReturnApply.companyAddressId;
					// }
					// this.getCompanyAddressList();
				});
			},
			getCompanyAddressList() {
				fetchList().then(response => {
					console.log("getCompanyAddressList()")
					this.companyAddressList = response.data;
					for (let i = 0; i < this.companyAddressList.length; i++) {
						if (this.companyAddressList[i].receiveStatus === 1 && this.orderReturnApply.status === 0) {
							this.updateStatusParam.companyAddressId = this.companyAddressList[i].id;
						}
					}
				});
			},
			handleReturn(status) {
        if(status == 2){
          if(this.updateStatusParam.returnAmount == 0 || this.updateStatusParam.returnAmount == ''){
            this.$message.error('退款金额不能为空!');
            return ;
          }
        }
        if(this.returnType == null){
          this.$message.error('退款方式不能为空!');
          return ;
        }
				this.updateStatusParam.status = status;
        this.updateStatusParam.type = this.returnType;
				this.$confirm('是否要进行此操作?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					updateApplyStatus(this.id, this.updateStatusParam).then(response => {
						this.$message({
							type: 'success',
							message: '操作成功!',
							duration: 1000
						});
						this.$router.back();
					});
				});
			}
		}
	}
</script>
<style lang="less" scoped>
	.detail-container {
		position: absolute;
		left: 0;
		right: 0;
		width: 1080px;
		padding: 35px 35px 15px 35px;
		margin: 20px auto;
	}

	.standard-margin {
		margin-top: 15px;
	}

	.form-border {
		border-right: 1px solid #DCDFE6;
		border-bottom: 1px solid #DCDFE6;
		padding: 10px;
	}

	.form-container-border {
		border-left: 1px solid #DCDFE6;
		border-top: 1px solid #DCDFE6;
		margin-top: 15px;
	}

	.form-left-bg {
		background: #F2F6FC;
	}

	.table-layout {
		margin-top: 20px;
		border-left: 1px solid #DCDFE6;
		border-top: 1px solid #DCDFE6;
	}

	.table-cell {
		height: 60px;
		line-height: 40px;
		border-right: 1px solid #DCDFE6;
		border-bottom: 1px solid #DCDFE6;
		padding: 10px;
		font-size: 14px;
		color: #606266;
		text-align: center;
		overflow: hidden;
	}

	.table-cell-title {
		border-right: 1px solid #DCDFE6;
		border-bottom: 1px solid #DCDFE6;
		padding: 10px;
		background: #F2F6FC;
		text-align: center;
		font-size: 14px;
		color: #303133;
	}


	.product {
		.item {
			margin-bottom: 20px;

			&:last-child {
				margin-bottom: 0;
			}
		}
	}
</style>
