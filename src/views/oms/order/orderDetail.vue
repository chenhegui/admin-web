<template> 
	<div class="detail-container">
		<div>
			<el-steps :active="formatStepStatus(order.status)" finish-status="success" align-center>
				<el-step title="提交订单" :description="formatTime(order.createTime)"></el-step>
				<el-step title="支付订单" :description="formatTime(order.paymentTime)"></el-step>
				<el-step title="平台发货" :description="formatTime(order.deliveryTime)"></el-step>
				<el-step title="确认收货" :description="formatTime(order.receiveTime)"></el-step>
				<el-step title="完成评价" :description="formatTime(order.commentTime)"></el-step>
			</el-steps>
		</div>
		<el-card shadow="never" style="margin-top: 15px">
			<div class="operate-container">
				<i class="el-icon-warning color-danger" style="margin-left: 20px"></i>
				<span class="color-danger">当前订单状态：{{order.status | formatStatus}}</span>
				<div class="operate-button-container" v-show="order.status === 0">
					<el-button size="mini" @click="showUpdateReceiverDialog">修改收货人信息</el-button>
					<el-button size="mini" @click="showCloseOrderDialog">关闭订单</el-button>
					<el-button size="mini" @click="showMarkOrderDialog">备注订单</el-button>
				</div>
				<div class="operate-button-container" v-show="order.status === 1">
					<el-button size="mini" @click="showUpdateReceiverDialog">修改收货人信息</el-button>
					<el-button size="mini" @click="showMarkOrderDialog">备注订单</el-button>
				</div>
				<div class="operate-button-container" v-show="order.status === 2 || order.status === 3">
					<!-- <el-button size="mini" @click="showLogisticsDialog">订单跟踪</el-button> -->
					<el-button size="mini" @click="showMarkOrderDialog">备注订单</el-button>
				</div>
				<div class="operate-button-container" v-show="order.status === 4">
					<el-button size="mini" @click="handleDeleteOrder">删除订单</el-button>
					<el-button size="mini" @click="showMarkOrderDialog">备注订单</el-button>
				</div>
			</div>
			<div style="margin-top: 20px">
				<svg-icon icon-class="marker" style="color: #606266"></svg-icon>
				<span class="font-small">基本信息</span>
			</div>
			<div class="table-layout">
				<el-row>
					<el-col :span="6" class="table-cell-title">订单编号</el-col>
					<el-col :span="6" class="table-cell-title">创建用户</el-col>
					<el-col :span="6" class="table-cell-title">创建时间</el-col>
					<el-col :span="6" class="table-cell-title">支付方式</el-col>
				</el-row>
				<el-row>
					<el-col :span="6" class="table-cell">{{order.orderSn}}</el-col>
					<el-col :span="6" class="table-cell">{{order.memberUsername}}</el-col>
					<el-col :span="6" class="table-cell">{{order.createTime}}</el-col>
					<el-col :span="6" class="table-cell">{{order.payType | formatPayType}}</el-col>
				</el-row>
				<el-row>
					<el-col :span="6" class="table-cell-title">支付时间</el-col>
					<el-col :span="6" class="table-cell-title">发货时间</el-col>
					<el-col :span="6" class="table-cell-title">确认收货时间</el-col>
					<el-col :span="6" class="table-cell-title">收货状态</el-col>
				</el-row>
				<el-row>
					<el-col :span="6" class="table-cell">{{order.paymentTime | formatTime}}</el-col>
					<el-col :span="6" class="table-cell">{{order.deliveryTime | formatTime}}</el-col>
					<el-col :span="6" class="table-cell">{{order.receiveTime | formatTime}}</el-col>
					<el-col :span="6" class="table-cell">{{order.confirmStatus | formatConfirmStatus(order)}}</el-col>
				</el-row>
				<el-row>
					<el-col :span="24" class="table-cell-title">订单备注</el-col>
				</el-row>
				<el-row>
					<el-col :span="24" class="table-cell">{{order.note | formatNote}}</el-col>
				</el-row>
			</div>
			<div style="margin-top: 20px">
				<svg-icon icon-class="marker" style="color: #606266"></svg-icon>
				<span class="font-small">收货人信息</span>
			</div>
			<div class="table-layout">
				<el-row>
					<el-col :span="24" class="table-cell-title">提货方式</el-col>
				</el-row>
				<el-row>
					<el-col :span="24" class="table-cell">{{order.receiveType | formatReceiveType}}</el-col>
				</el-row>
        <el-row>
        	<el-col :span="12" class="table-cell-title">配送方式</el-col>
        	<el-col :span="12" class="table-cell-title">配送单号</el-col>
        </el-row>
        <el-row>
        	<el-col :span="12" class="table-cell">{{order.deliveryCompany}}</el-col>
        	<el-col :span="12" class="table-cell">{{order.deliverySn}}</el-col>
        </el-row>
				<div v-if="order.receiveType == 0">
					<el-row>
						<el-col :span="6" class="table-cell-title">收货人</el-col>
						<el-col :span="6" class="table-cell-title">手机号码</el-col>
						<el-col :span="6" class="table-cell-title">邮政编码</el-col>
						<el-col :span="6" class="table-cell-title">省/市/区</el-col>
					</el-row>
					<el-row>
						<el-col :span="6" class="table-cell">{{order.receiverName}}</el-col>
						<el-col :span="6" class="table-cell">{{order.receiverPhone}}</el-col>
						<el-col :span="6" class="table-cell">{{order.receiverPostCode}}</el-col>
						<el-col :span="6" class="table-cell">{{order.receiverRegion}}</el-col>
					</el-row>
					<el-row>
						<el-col :span="24" class="table-cell-title">详细地址</el-col>
					</el-row>
					<el-row>
						<el-col :span="24" class="table-cell">{{order.receiverDetailAddress}}</el-col>
					</el-row>
				</div>
				<div v-else>
					<el-row>
						<el-col :span="8" class="table-cell-title">收货人</el-col>
						<el-col :span="8" class="table-cell-title">手机号码</el-col>
						<el-col :span="8" class="table-cell-title">到店提货时间</el-col>
					</el-row>
					<el-row>
						<el-col :span="6" class="table-cell">{{order.receiverName}}</el-col>
						<el-col :span="6" class="table-cell">{{order.receiverPhone}}</el-col>
						<el-col :span="6" class="table-cell">{{order.receiverTime}}</el-col>
					</el-row>
				</div>

			</div>
			<div style="margin-top: 20px">
				<svg-icon icon-class="marker" style="color: #606266"></svg-icon>
				<span class="font-small">商品信息</span>
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
									<img style="width: 120px; height: 100px" :src="item.productPic" :preview-src-list="[item.productPic]">
									</img>
								</div>
								<div v-else>
									<img style="width: 120px; height: 100px" :src="scope.row.pic" :preview-src-list="[scope.row.pic]">
									</img>
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
			<div style="margin-top: 60px">
				<svg-icon icon-class="marker" style="color: #606266"></svg-icon>
				<span class="font-small">费用信息</span>
			</div>
			<div class="table-layout">
				<el-row>
					<el-col :span="6" class="table-cell-title">商品合计</el-col>
					<el-col :span="6" class="table-cell-title">运费</el-col>
					<el-col :span="6" class="table-cell-title">通用优惠券</el-col>
					<el-col :span="6" class="table-cell-title">是否是生日优惠</el-col>
				</el-row>
				<el-row>
					<el-col :span="6" class="table-cell">￥{{order.totalAmount | priceFormat}}</el-col>
					<el-col :span="6" class="table-cell">货到付款</el-col>
					<el-col :span="6" class="table-cell">-￥{{order.couponAmount | priceFormat}}</el-col>
					<el-col :span="6" class="table-cell">{{order.isBirthday ? '是' : '否'}}</el-col>
				</el-row>
				<el-row>
					<el-col :span="6" class="table-cell-title">是否是会员优惠</el-col>
					<el-col :span="6" class="table-cell-title">优惠价格</el-col>
					<el-col :span="6" class="table-cell-title">订单总金额</el-col>
					<el-col :span="6" class="table-cell-title">应付款金额</el-col>
				</el-row>
				<el-row>
					<el-col :span="6" class="table-cell">{{order.isMember ? '是' : '否'}}</el-col>
					<el-col :span="6" class="table-cell">-￥{{order.discountAmount | priceFormat}}</el-col>
					<el-col :span="6" class="table-cell">
						<span class="color-danger">￥{{order.totalAmount | priceFormat}}</span>
					</el-col>
					<el-col :span="6" class="table-cell">
						<span class="color-danger">￥{{order.payAmount | priceFormat}}</span>
					</el-col>
				</el-row>
			</div>
			<div style="margin-top: 20px">
				<svg-icon icon-class="marker" style="color: #606266"></svg-icon>
				<span class="font-small">操作信息</span>
			</div>
			<el-table style="margin-top: 20px;width: 100%" ref="orderHistoryTable" :data="historyList" border>
				<el-table-column label="操作者" width="120" align="center">
					<template slot-scope="scope">
						{{scope.row.operateMan}}
					</template>
				</el-table-column>
				<el-table-column label="操作时间" width="160" align="center">
					<template slot-scope="scope">
						{{scope.row.createTime}}
					</template>
				</el-table-column>
				<el-table-column label="订单状态" width="120" align="center">
					<template slot-scope="scope">
						{{scope.row.orderStatus | formatStatus}}
					</template>
				</el-table-column>
				<el-table-column label="备注" align="center">
					<template slot-scope="scope">
						{{scope.row.note}}
					</template>
				</el-table-column>
			</el-table>
		</el-card>
		<el-dialog title="修改收货人信息" :visible.sync="receiverDialogVisible" width="40%">
			<el-form :model="receiverInfo" ref="receiverInfoForm" label-width="150px">
				<el-form-item label="收货人姓名：">
					<el-input v-model="receiverInfo.receiverName" style="width: 200px"></el-input>
				</el-form-item>
				<el-form-item label="手机号码：">
					<el-input v-model="receiverInfo.receiverPhone" style="width: 200px">
					</el-input>
				</el-form-item>
				<el-form-item label="邮政编码：">
					<el-input v-model="receiverInfo.receiverPostCode" style="width: 200px">
					</el-input>
				</el-form-item>
				<el-form-item label="所在区域：">
					<v-distpicker :province="receiverInfo.receiverProvince" :city="receiverInfo.receiverCity" :area="receiverInfo.receiverRegion"
					 @selected="onSelectRegion"></v-distpicker>
				</el-form-item>
				<el-form-item label="详细地址：">
					<el-input v-model="receiverInfo.receiverDetailAddress" type="textarea" rows="3">
					</el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="receiverDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="handleUpdateReceiverInfo">确 定</el-button>
			</span>
		</el-dialog>
		<el-dialog title="关闭订单" :visible.sync="closeDialogVisible" width="40%">
			<el-form :model="closeInfo" label-width="150px">
				<el-form-item label="操作备注：">
					<el-input v-model="closeInfo.note" type="textarea" rows="3">
					</el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="closeDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="handleCloseOrder">确 定</el-button>
			</span>
		</el-dialog>
		<el-dialog title="备注订单" :visible.sync="markOrderDialogVisible" width="40%">
			<el-form :model="markInfo" label-width="150px">
				<el-form-item label="操作备注：">
					<el-input v-model="markInfo.note" type="textarea" rows="3">
					</el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="markOrderDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="handleMarkOrder">确 定</el-button>
			</span>
		</el-dialog>
		<logistics-dialog v-model="logisticsDialogVisible"></logistics-dialog>
	</div>
</template>
<script>
	import {
		getOrderDetail,
		getOrderOperateHistory,
		updateReceiverInfo,
		updateMoneyInfo,
		closeOrder,
		updateOrderNote,
		deleteOrder
	} from '@/api/order';
	import LogisticsDialog from '@/views/oms/order/components/logisticsDialog';
	import {
		priceFormat,
		formatDate
	} from '@/utils/date';
	import VDistpicker from 'v-distpicker';
	const defaultReceiverInfo = {
		orderId: null,
		receiverName: null,
		receiverPhone: null,
		receiverPostCode: null,
		receiverDetailAddress: null,
		receiverProvince: null,
		receiverCity: null,
		receiverRegion: null,
		status: null
	};
	export default {
		name: 'orderDetail',
		components: {
			VDistpicker,
			LogisticsDialog
		},
		data() {
			return {
				id: null,
				order: {},
				historyList: [],
				receiverDialogVisible: false,
				receiverInfo: Object.assign({}, defaultReceiverInfo),
				closeDialogVisible: false,
				closeInfo: {
					note: null,
					id: null
				},
				markOrderDialogVisible: false,
				markInfo: {
					note: null
				},
				logisticsDialogVisible: false
			}
		},
		created() {
			this.id = this.$route.query.id;
			this.init();
		},
		filters: {
			priceFormat(value) {
				return priceFormat(value);
			},
			formatNull(value) {
				if (value === undefined || value === null || value === '') {
					return '暂无';
				} else {
					return value;
				}
			},
			formatLongText(value) {
				if (value === undefined || value === null || value === '') {
					return '暂无';
				} else if (value.length > 8) {
					return value.substr(0, 8) + '...';
				} else {
					return value;
				}
			},
			formatPayType(value) {
				if (value === 1) {
					return '会员卡支付';
				} else if (value === 2) {
					return '微信支付';
				}
			},
			formatReceiveType(value) {
				if (value === 0) {
					return '商家配送';
				} else {
					return '到店自提';
				}
			},
			formatTime(value) {
				if (value == null || value == undefined) {
					return '暂无'
				} else {
					return value;
				}
			},
			formatNote(value) {
				if (value == null || value == undefined) {
					return '暂无备注'
				} else {
					return value;
				}
			},
			formatConfirmStatus(value, order) {
				if (order.status === 2 && value === 0) {
					return '未确认';
				} else if (order.status === 3 && value === 1) {
					return '已收货';
				} else {
					return '暂无'
				}
			},
			formatStatus(value) {
				if (value === 0) {
					return '待付款';
				} else if (value === 1) {
					return '待发货';
				} else if (value === 2) {
					return '已发货';
				} else if (value === 3) {
					return '已完成';
				} else if (value === 4) {
					return '已关闭';
				} else if (value === 5) {
					return '无效订单';
				} else if(value === 6) {
					return '订单删除';
				}
			},
			formatPayStatus(value) {
				if (value === 0) {
					return '未支付';
				} else if (value === 4) {
					return '已退款';
				} else {
					return '已支付';
				}
			},
			formatDeliverStatus(value) {
				if (value === 0 || value === 1) {
					return '未发货';
				} else {
					return '已发货';
				}
			}
		},
		methods: {
			init(){
				getOrderDetail(this.id).then(response => {
					this.order = response.data;
				});
				getOrderOperateHistory(this.id).then(response =>{
					this.historyList = response.data;
				})
			},
			onSelectRegion(data) {
				this.receiverInfo.receiverProvince = data.province.value;
				this.receiverInfo.receiverCity = data.city.value;
				this.receiverInfo.receiverRegion = data.area.value;
			},
			formatTime(time) {
				if (time == null || time === '') {
					return '';
				}
				let date = new Date(time);
				return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
			},
			formatStepStatus(value) {
				if (value === 1) {
					//待发货
					return 2;
				} else if (value === 2) {
					//已发货
					return 3;
				} else if (value === 3) {
					//已完成
					return 4;
				} else {
					//待付款、已关闭、无限订单
					return 1;
				}
			},
			showUpdateReceiverDialog() {
				this.receiverDialogVisible = true;
				this.receiverInfo = {
					orderId: this.order.id,
					receiverName: this.order.receiverName,
					receiverPhone: this.order.receiverPhone,
					receiverPostCode: this.order.receiverPostCode,
					receiverDetailAddress: this.order.receiverDetailAddress,
					receiverProvince: this.order.receiverProvince,
					receiverCity: this.order.receiverCity,
					receiverRegion: this.order.receiverRegion.replace(this.order.receiverProvince
					+ "-" + this.order.receiverCity + "-", ""),
					status: this.order.status
				}
			},
			handleUpdateReceiverInfo() {
				this.$confirm('是否要修改收货信息?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					updateReceiverInfo(this.receiverInfo).then(response => {
						this.receiverDialogVisible = false;
						this.$message({
							type: 'success',
							message: '修改成功!'
						});
						this.init()
					});
				});
			},
			showCloseOrderDialog() {
				this.closeDialogVisible = true;
				this.closeInfo.note = null;
				this.closeInfo.id = this.id;
			},
			handleCloseOrder() {
				this.$confirm('是否要关闭?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let params = new URLSearchParams();
					params.append("ids", [this.closeInfo.id]);
					params.append("note", this.closeInfo.note);
					closeOrder(params).then(response => {
						this.closeDialogVisible = false;
						this.$message({
							type: 'success',
							message: '订单关闭成功!'
						});
						this.init()
					});
				});
			},
			showMarkOrderDialog() {
				this.markOrderDialogVisible = true;
				this.markInfo.id = this.id;
				this.closeOrder.note = null;
			},
			handleMarkOrder() {
				this.$confirm('是否要备注订单?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let params = new URLSearchParams();
					params.append("id", this.markInfo.id);
					params.append("note", this.markInfo.note);
					params.append("status", this.order.status);
					updateOrderNote(params).then(response => {
						this.markOrderDialogVisible = false;
						this.$message({
							type: 'success',
							message: '订单备注成功!'
						});
						this.init()
					});
				});
			},
			handleDeleteOrder() {
				this.$confirm('是否要进行该删除操作?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let params = new URLSearchParams();
					params.append("ids", [this.id]);
					deleteOrder(params).then(response => {
						this.$message({
							message: '删除成功！',
							type: 'success',
							duration: 1000
						});
						this.$router.back();
					});
				})
			},
			showLogisticsDialog() {
				this.logisticsDialogVisible = true;
			}
		}
	}
</script>
<style lang="less" scoped>
	.detail-container {
		width: 80%;
		padding: 20px 20px 20px 20px;
		margin: 20px auto;
	}

	.operate-container {
		background: #F2F6FC;
		height: 80px;
		margin: -20px -20px 0;
		line-height: 80px;
	}

	.operate-button-container {
		float: right;
		margin-right: 20px
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
