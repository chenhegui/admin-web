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
						<el-input clearable style="width: 200px" v-model="listQuery.userId" placeholder="请输入用户ID"></el-input>
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
					<el-form-item label="商品消费订单号：">
						<el-input clearable style="width: 300px" v-model="listQuery.orderId" placeholder="请输入商品消费订单号"></el-input>
					</el-form-item>
					<el-form-item label="消费类型：">
						<el-select clearable style="width: 200px" v-model="listQuery.type" placeholder="请选择消费类型">
							<el-option label="会员充值" :value="1"> </el-option>
							<el-option label="会员消费" :value="2"> </el-option>
							<el-option label="微信消费" :value="3"> </el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="支付状态：">
						<el-select clearable style="width: 200px" v-model="listQuery.payType" placeholder="请选择消费类型">
							<el-option label="未支付" :value="1"> </el-option>
							<el-option label="支付成功" :value="2"> </el-option>
							<el-option label="支付失败" :value="3"> </el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="创建时间：">
						<el-date-picker clearable @change="getCreateTime" v-model="createTime" value-format="yyyy-MM-dd" type="daterange"
						 range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
						</el-date-picker>
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
							<div v-if="props.row.type == 2">
								<el-form-item label="实际消费金额">
									<span>{{ props.row.changeMoney }}</span>
								</el-form-item>
								<el-form-item label="消费前的金额">
									<span>{{ props.row.before }}</span>
								</el-form-item>
								<el-form-item label="消费后的金额">
									<span>{{ props.row.after }}</span>
								</el-form-item>
							</div>
							<div v-if="props.row.type == 1">
								<el-form-item label="商品支付订单号">
									<span>{{ props.row.orderId }}</span>
								</el-form-item>
								<el-form-item label="实际充值金额">
									<span>{{ props.row.changeMoney }}</span>
								</el-form-item>
								<el-form-item label="充值前的金额">
									<span>{{ props.row.before }}</span>
								</el-form-item>
								<el-form-item label="充值后的金额">
									<span>{{ props.row.after }}</span>
								</el-form-item>
								<el-form-item label="用户openId">
									<span>{{ props.row.openId }}</span>
								</el-form-item>
								<el-form-item label="微信预付款订单号">
									<span>{{ props.row.prepayId }}</span>
								</el-form-item>
								<el-form-item label="微信预付款随机字符串">
									<span>{{ props.row.nonceStr }}</span>
								</el-form-item>
								<el-form-item label="微信预付款签名">
									<span>{{ props.row.sign }}</span>
								</el-form-item>
								<el-form-item label="微信预付款时间戳">
									<span>{{ props.row.timeStamp }}</span>
								</el-form-item>
							</div>
							<div v-if="props.row.type == 3">
								<el-form-item label="商品支付订单号">
									<span>{{ props.row.orderId }}</span>
								</el-form-item>
								<el-form-item label="实际消费金额">
									<span>{{ props.row.changeMoney }}</span>
								</el-form-item>
								<el-form-item label="用户openId">
									<span>{{ props.row.openId }}</span>
								</el-form-item>
								<el-form-item label="微信预付款订单号">
									<span>{{ props.row.prepayId }}</span>
								</el-form-item>
								<el-form-item label="微信预付款随机字符串">
									<span>{{ props.row.nonceStr }}</span>
								</el-form-item>
								<el-form-item label="微信预付款签名">
									<span>{{ props.row.sign }}</span>
								</el-form-item>
								<el-form-item label="微信预付款时间戳">
									<span>{{ props.row.timeStamp }}</span>
								</el-form-item>
							</div>
						</el-form>
					</template>
				</el-table-column>
				<el-table-column label="ID" width="80" align="center" prop="id"></el-table-column>
				<el-table-column label="用户ID" prop="userId"  width="80" align="center">
				</el-table-column>
				<el-table-column label="用户昵称" prop="nickName" align="center">
				</el-table-column>
				<el-table-column label="用户手机号" prop="phone" align="center">
				</el-table-column>
				<el-table-column label="微信订单号" prop="wxOrderId" width="300" align="center">
				</el-table-column>
				<el-table-column label="消费类型" prop="type" align="center">
					<template slot-scope="scope">
						<div>
							<el-tag type="primary" disable-transitions v-if="scope.row.type == 1">
								会员充值
							</el-tag>
							<el-tag type="primary" disable-transitions v-if="scope.row.type == 2">
								会员消费
							</el-tag>
							<el-tag type="primary" disable-transitions v-if="scope.row.type == 3">
								微信消费
							</el-tag>
						</div>
					</template>
				</el-table-column>
				<el-table-column label="充值状态" prop="payType" align="center">
					<template slot-scope="scope">
						<div v-if="scope.row.type != 2">
							<el-tag type="primary" disable-transitions v-if="scope.row.payType == 1">
								未支付
							</el-tag>
							<el-tag type="success" disable-transitions v-if="scope.row.payType == 2">
								支付成功
							</el-tag>
							<el-tag type="danger" disable-transitions v-if="scope.row.payType == 3">
								支付失败
							</el-tag>
						</div>
						<div v-else>
							<el-tag type="success" disable-transitions>
								支付成功
							</el-tag>
						</div>
					</template>
				</el-table-column>
				<el-table-column label="消费金额(元)" prop="money" width="100" align="center">
					<template slot-scope="scope">
						{{scope.row.money}}
					</template>align="center"
				</el-table-column>
				<el-table-column label="创建时间" prop="createTime" width="160" align="center">
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
		pageDepositLog
	} from '@/api/system'

	const defaultListQuery = {
		nickName: '',
		phone: '',
		userId: '',
		openId: '',
		orderId: '',
		type: null,
		payType: null,
		createTimeStart: '',
		createTimeEnd: '',
		pageIndex: 1,
		pageSize: 10,
	};
	export default {
		name: "productList",
		data() {
			return {
				listQuery: { ...defaultListQuery},
				list: null,
				total: null,
				listLoading: false,
				createTime: ''
			}
		},
		created() {
			this.getList();
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
				if (this.listQuery.userId) {
					data.userId = this.listQuery.userId
				}
				if (this.listQuery.openId) {
					data.openId = this.listQuery.openId
				}
				if (this.listQuery.orderId) {
					data.orderId = this.listQuery.orderId
				}
				if (this.listQuery.type) {
					data.type = this.listQuery.type
				}
				if (this.listQuery.payType) {
					data.payType = this.listQuery.payType
				}
				if (this.listQuery.createTimeStart !== '' && this.listQuery.createTimeEnd !== '') {
					data.createTimeStart = this.listQuery.createTimeStart
					data.createTimeEnd = this.listQuery.createTimeEnd
				}
				this.listLoading = true;
				pageDepositLog(data).then(res => {
					this.listLoading = false;
					this.list = res.data.records;
					this.total = res.data.total;
				});
			},
			getCreateTime(val) {
				if (val) {
					this.listQuery.createTimeStart = val[0]
					this.listQuery.createTimeEnd = val[1]
				} else {
					this.listQuery.createTimeStart = ''
					this.listQuery.createTimeEnd = ''
				}
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
				this.listQuery = {...defaultListQuery};
				this.getList()
			}
		}
	}
</script>
<style lang="less" scoped>
	.top-title {
		overflow: hidden;
	}
</style>