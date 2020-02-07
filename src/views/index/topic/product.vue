<template>
	<div>
		<div class="title">添加分类下的商品</div>
		<div class="container">
			<el-card class="filter-container" shadow="never">
				<div class="top-title">
					<i class="el-icon-circle-check"></i>
					<span>已经添加的商品</span>
				</div>
				<div style="margin-top: 15px">
					<div v-if="list.length > 0">
						<el-tag style="margin: 0 12px 10px 0;" type="primary" v-for="(item, index) in list" :key="index" closable
						 :disable-transitions="false" @close="handleCloseTag(item, index)">
							ID:{{item.id}} ({{item.name}})
						</el-tag>
					</div>
					<div v-else>
						暂无商品
					</div>
				</div>
			</el-card>
			<el-card class="filter-container magin-top-20" shadow="never">
				<div class="top-title">
					<i class="el-icon-finished"></i>
					<span>当前分页选择的商品</span>
				</div>
				<div style="margin-top: 15px">
					<div v-if="multipleSelection.length > 0">
						<el-tag style="margin: 0 12px 10px 0;" type="primary" v-for="(item, index) in multipleSelection" :key="index">
							ID:{{item.id}} ({{item.name}})
						</el-tag>
					</div>
					<div v-else>
						暂未选择商品
					</div>
				</div>
			</el-card>
			<el-card class="filter-container magin-top-20" shadow="never">
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
						<el-form-item label="输入搜索：">
							<el-input clearable style="width: 200px" v-model="listQuery.name" placeholder="请输入商品名称"></el-input>
						</el-form-item>
						<el-form-item label="商品货号：">
							<el-input style="width: 280px" v-model="listQuery.productSn" placeholder="商品货号" clearable></el-input>
						</el-form-item>
						<el-form-item label="商品分类：">
							<el-select v-model="listQuery.productCategoryId" placeholder="请选择" clearable>
								<el-option v-for="item in productCateOptions" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="上架状态：">
							<el-select v-model="listQuery.publishStatus" placeholder="全部" clearable>
								<el-option v-for="item in publishStatusOptions" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</el-form-item>
					</el-form>
				</div>
			</el-card>
			<div>
				<div class="table-container">
					<el-table ref="table" :data="table" style="width: 100%" @selection-change="handleSelectionChange" v-loading="listLoading"
					 current-row-key="id" row-key="id">
						<el-table-column type="selection" width="60" align="center"></el-table-column>
						<el-table-column label="ID" width="80" align="center">
							<template slot-scope="scope">{{scope.row.id}}</template>
						</el-table-column>
						<el-table-column label="商品图片" width="160" align="center">
							<template slot-scope="scope">
								<el-image style="width: 140px;" :src="scope.row.pic" :preview-src-list="[scope.row.pic]">
								</el-image>
							</template>
						</el-table-column>
						<el-table-column label="商品名称" align="center">
							<template slot-scope="scope">
								<p>{{scope.row.name}}</p>
							</template>
						</el-table-column>
						<el-table-column label="价格/货号" width="310" align="center">
							<template slot-scope="scope">
								<p>分类：{{scope.row.productCategoryName}}</p>
								<p>价格：￥{{scope.row.price}}</p>
								<p>货号：{{scope.row.productSn}}</p>
							</template>
						</el-table-column>
						<el-table-column label="标签" width="140" align="center">
							<template slot-scope="scope">
								<p>上架：
									<el-switch disabled :active-value="1" :inactive-value="0" v-model="scope.row.publishStatus">
									</el-switch>
								</p>
								<p>新品：
									<el-switch disabled :active-value="1" :inactive-value="0" v-model="scope.row.newStatus">
									</el-switch>
								</p>
								<p>推荐：
									<el-switch disabled :active-value="1" :inactive-value="0" v-model="scope.row.recommandStatus">
									</el-switch>
								</p>
							</template>
						</el-table-column>
						<el-table-column label="排序" width="80" align="center">
							<template slot-scope="scope">{{scope.row.sort}}</template>
						</el-table-column>
						<el-table-column label="销量" width="80" align="center">
							<template slot-scope="scope">{{scope.row.sale}}</template>
						</el-table-column>
						<el-table-column label="创建时间" width="160" align="center">
							<template slot-scope="scope">{{scope.row.createTime}}</template>
						</el-table-column>
					</el-table>
				</div>
				<div class="batch-operate-container">
					<el-button style="margin-left: 20px" class="search-button" @click="handleSelect" type="primary" size="small">
						确定
					</el-button>
				</div>
				<div class="pagination-container">
					<el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="total, sizes, prev, pager, next, jumper"
					 :page-size="listQuery.pageSize" :page-sizes="[10, 20, 50, 80, 100]" :current-page.sync="listQuery.pageNum" :total="total">
					</el-pagination>
				</div>
				<div class="line"></div>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		topicFindProduct,
		topicSaveProduct,
		topicDeleteProduct,
		topicPageProduct
	} from '@/api/index'
	import {
		listProductCate
	} from '@/api/productCate'
	const defaultListQuery = {
		name: null,
		productSn: null,
		productCategoryId: null,
		publishStatus: null,
		pageIndex: 1,
		pageSize: 10,
	};
	export default {
		data() {
			return {
				list: [],
				listQuery: { ...defaultListQuery},
				table: [],
				total: null,
				listLoading: false,
				multipleSelection: [],
				productCateOptions: [],
				publishStatusOptions: [{
					value: 1,
					label: '上架'
				}, {
					value: 0,
					label: '下架'
				}]
			}
		},
		created() {
			this.getData();
			this.getList();
			this.getProductCateList();
		},
		methods: {
			getData() {
				topicFindProduct(this.$route.query.id).then(res => {
					this.list = res.data;
				})
			},
			getList() {
				let data = {
					pageIndex: this.listQuery.pageIndex,
					pageSize: this.listQuery.pageSize,
				}
				if (this.listQuery.name) {
					data.name = this.listQuery.name
				}
				if (this.listQuery.productSn) {
					data.productSn = this.listQuery.productSn
				}
				if (this.listQuery.productCategoryId) {
					data.productCategoryId = this.listQuery.productCategoryId
				}
				if (this.listQuery.publishStatus !== null && this.listQuery.publishStatus !== '') {
					data.publishStatus = this.listQuery.publishStatus
				}
				this.listLoading = true;
				topicPageProduct(this.$route.query.id, data).then(res => {
					this.listLoading = false;
					this.table = res.data.records;
					this.total = res.data.total;
				});
			},
			getProductCateList() {
				listProductCate().then(response => {
					let list = response.data;
					this.productCateOptions = [];
					list.forEach(item => {
						this.productCateOptions.push({
							label: item.categoryName,
							value: item.id
						});
					})
				});
			},
			handleResetSearch() {
				this.listQuery = { ...defaultListQuery
				};
				this.getList()
			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
			handleSizeChange(val) {
				this.listQuery.pageIndex = 1;
				this.listQuery.pageSize = val;
				this.getList();
			},
			handleCurrentChange(val) {
				this.listQuery.pageIndex = val;
				this.getList();
			},
			handleSelect() {
				if (this.multipleSelection.length == 0) {
					this.$message({
						message: '请先选择要添加的商品',
						type: 'warning'
					});
					return;
				}
				this.$confirm('确定是否要将当前分页选择的商品添加到这个分类下', '添加提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let ids = this.multipleSelection.map(item => item.id);
					topicSaveProduct(this.$route.query.id, ids).then(res => {
						this.$message({
							message: '添加成功',
							type: 'success'
						});
						this.listQuery.pageIndex = 1;
						this.getData();
						this.getList();
					})
				}).catch(() => {});
			},
			handleCloseTag(item, index) {
				this.$confirm('确定要把这个商品从这个分类下删除吗？', '删除提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					topicDeleteProduct(this.$route.query.id, item.id).then(res => {
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.list.splice(index, 1);
						this.listQuery.pageIndex = 1;
						this.getList();
					})
				}).catch(() => {});
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

	.container {
		margin: 0 30px;
	}

	.magin-top-20 {
		margin-top: 20px;
	}

	.line {
		margin-bottom: 60px;
	}
</style>
