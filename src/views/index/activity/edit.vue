<template>
	<div>
		<div class="title">编辑轮播图</div>
		<el-row :gutter="20">
			<el-col :span="14" :offset="4">
				<div class="box">
					<el-form :model="activity" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
						<el-form-item label="轮播图名称" prop="name" required>
							<el-input v-model="activity.name"></el-input>
						</el-form-item>
						<el-form-item label="是否显示名称" prop="showName" required>
							<el-switch v-model="activity.showName" active-text="显示" inactive-text="暂不显示">
							</el-switch>
						</el-form-item>
						<el-form-item label="轮播图类型" prop="type" required>
							<el-select v-model="activity.type" placeholder="请选择轮播图类型">
								<el-option label="商品" :value="1"></el-option>
								<el-option label="分类" :value="2"></el-option>
								<el-option label="专题" :value="3"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="封面图片" prop="banner" required>
							<el-upload class="avatar-uploader" action="/api/v1/img/save" :show-file-list="false" :on-success="handleAvatarSuccess"
							 :before-upload="beforeAvatarUpload">
								<i v-if="!activity.banner" class="el-icon-plus avatar-uploader-icon"></i>
								<div v-if="activity.banner" class="el-upload-list--picture-card image-box">
									<img style="object-fit: contain;" class="el-upload-list__item-thumbnail" :src="activity.banner" alt="">
									<span class="el-upload-list__item-actions" @click.stop="">
										<span class="el-upload-list__item-preview" @click.stop="handleBannerPreview">
											<i class="el-icon-zoom-in"></i>
										</span>
										<span class="el-upload-list__item-delete" @click.stop="handleBannerDelete">
											<i class="el-icon-delete"></i>
										</span>
									</span>
								</div>
								<div class="el-upload__tip" slot="tip">只能上传jpg/jpeg/png文件，且不超过2M</div>
							</el-upload>
							<el-dialog :visible.sync="dialogVisibleImage">
								<el-image style="width: 100%;" :src="activity.banner" :preview-src-list="[activity.banner]">
								</el-image>
							</el-dialog>
						</el-form-item>
						<el-form-item label="关联ID" prop="relId" required>
							<span style="margin-right: 5px; color: #aaa;">当前选择关联ID为:</span>
							<span style="margin-right: 15px; ">{{activity.relId}}</span>
							<el-button type="primary" size="mini" @click="openDialog">选择</el-button>
						</el-form-item>
						<el-form-item label="排序" prop="seq" required>
							<el-input-number v-model="activity.seq" :min="0" :max="10" label="请输入排序"></el-input-number>
							<span style="margin-left: 15px; color: #aaa;">注意：数字越大，则显示越靠后</span>
						</el-form-item>
						<el-form-item label="是否启用" prop="use" required>
							<el-switch v-model="activity.use" active-text="启用" inactive-text="暂不启用">
							</el-switch>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="submitForm">确定</el-button>
						</el-form-item>
					</el-form>
				</div>
			</el-col>
		</el-row>
		<el-dialog title="选择关联ID" :visible.sync="dialogTableVisible" width="70%">
			<div>
				<div v-if="activity.type == 1">
					<div>
						<el-input style="width: 200px" class="margin-right-15" v-model="search.product.keyword" placeholder="请输入商品名称"></el-input>
						<el-button @click="searchFloor" type="primary" size="small">
							查询结果
						</el-button>
					</div>
					<div class="top-15">
						<el-table ref="singleTableProduct" :data="table.product" v-loading="listLoading" highlight-current-row @current-change="handleTableProductChange">
							<el-table-column prop="id" label="ID" min-width="80"></el-table-column>
							<el-table-column prop="name" label="名称" min-width="150"></el-table-column>
							<el-table-column prop="price" label="价格" min-width="200"></el-table-column>
							<el-table-column prop="productCategoryName" label="商品分类" min-width="150"></el-table-column>
							<el-table-column prop="sort" label="排序"></el-table-column>
							<el-table-column prop="createTime" label="创建时间" min-width="150"></el-table-column>
						</el-table>
						<div class="page">
							<el-pagination background @current-change="handleCurrentChange" layout="total, prev, pager, next, jumper"
							 :page-size="search.pageSize" :current-page.sync="search.pageIndex" :total="table.total">
							</el-pagination>
						</div>
					</div>
				</div>
				<div v-if="activity.type == 2">
					<div>
						<el-input style="width: 200px" class="margin-right-15" v-model="search.floor.name" placeholder="请输入分类名称"></el-input>
						<el-input style="width: 200px" class="margin-right-15" v-model="search.floor.title" placeholder="请输入分类标题"></el-input>
						<el-button @click="searchFloor" type="primary" size="small">
							查询结果
						</el-button>
					</div>
					<div class="top-15">
						<el-table ref="singleTableFloor" :data="table.floor" v-loading="listLoading" highlight-current-row @current-change="handleTableFloorChange">
							<el-table-column prop="id" label="ID" min-width="80"></el-table-column>
							<el-table-column prop="name" label="名称" min-width="150"></el-table-column>
							<el-table-column prop="title" label="副标题" min-width="200"></el-table-column>
							<el-table-column prop="moreText" label="更多的文字" min-width="150"></el-table-column>
							<el-table-column prop="seq" label="排序"></el-table-column>
							<el-table-column prop="createTime" label="创建时间" min-width="150"></el-table-column>
						</el-table>
						<div class="page">
							<el-pagination background @current-change="handleCurrentChange" layout="total, prev, pager, next, jumper"
							 :page-size="search.pageSize" :current-page.sync="search.pageIndex" :total="table.total">
							</el-pagination>
						</div>
					</div>
				</div>
				<div v-if="activity.type == 3">
					<div>
						<el-input style="width: 200px" class="margin-right-15" v-model="search.topic.name" placeholder="请输入专题名称"></el-input>
						<el-select clearable class="margin-right-15" style="width: 200px" v-model="search.topic.type" placeholder="请选择专题类型">
							<el-option label="一对一" :value="1"> </el-option>
							<el-option label="一对多" :value="2"> </el-option>
						</el-select>
						<el-button @click="searchTopic" type="primary" size="small">
							查询结果
						</el-button>
					</div>
					<div class="top-15">
						<el-table ref="singleTableTopic" :data="table.topic" v-loading="listLoading" highlight-current-row @current-change="handleTableTopicChange">
							<el-table-column prop="id" label="ID" min-width="80"></el-table-column>
							<el-table-column prop="name" label="名称" min-width="150"></el-table-column>
							<el-table-column label="封面图片" width="120" align="center">
								<template slot-scope="scope">
									<el-image style="width: 80px; height: 60px;" :src="scope.row.image" :preview-src-list="[scope.row.image]">
									</el-image>
								</template>
							</el-table-column>
							<el-table-column label="类型" align="center" prop="type">
								<template slot-scope="scope">
									<div v-if="scope.row.type == 1">一对一</div>
									<div v-if="scope.row.type == 2">一对多</div>
								</template>
							</el-table-column>
							<el-table-column prop="seq" label="排序"></el-table-column>
							<el-table-column prop="createTime" label="创建时间" min-width="150"></el-table-column>
						</el-table>
						<div class="page">
							<el-pagination background @current-change="handleCurrentChange" layout="total, prev, pager, next, jumper"
							 :page-size="search.pageSize" :current-page.sync="search.pageIndex" :total="table.total">
							</el-pagination>
						</div>
					</div>
				</div>
			</div>
			<div slot="footer" class="dialog-footer">
				<div class="foot-left">
					<span style="margin-right: 5px; color: #aaa;">你选择的关联ID为:</span>
					<span v-if="currentRow.id">{{currentRow.id}} ({{currentRow.name}})</span>
				</div>
				<el-button type="danger" @click="setCurrent">清除选择</el-button>
				<el-button @click="cancle">取消</el-button>
				<el-button type="primary" @click="handleChoose">确定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import {
		updateActivity,
		detailActivity,
		pageFloor
	} from '@/api/index'
	import{
		pageProduct
	} from '@/api/product'
	export default {
		data() {
			return {
				dialogVisibleImage: false,
				dialogTableVisible: false,
				activity: {},
				rules: {
					name: [{
						required: true,
						message: '请输入活动名称',
						trigger: 'blur'
					}],
					showName: [{
						required: true,
						message: '请选择是否显示名称',
						trigger: 'blur'
					}],
					type: [{
						required: true,
						message: '请选择轮播图类型',
						trigger: 'change'
					}],
					banner: [{
						required: true,
						message: '请选择封面图片',
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
				},
				search: {
					pageIndex: 1,
					pageSize: 10,
					product: {
						keyword: ''
					},
					floor: {
						name: '',
						title: ''
					},
					topic: {
						name: '',
						type: ''
					}
				},
				listLoading: false,
				row:{
					id: null,
					name: null
				},
				currentRow: {
					id: null,
					name: null
				},
				table: {
					total: 0,
					product: [],
					floor: [],
					topic: []
				}
			}
		},
		created(){
			this.getData();
		},
		methods: {
			getData(){
				detailActivity(this.$route.query.id).then(res =>{
					this.activity = res.data;
					this.row.id = this.activity.relId;
					this.row.name = this.activity.relName;
					this.currentRow.id = this.activity.relId;
					this.currentRow.name = this.activity.relName;
				})
			},
			submitForm() {
				this.$refs['ruleForm'].validate((valid) => {
					if (valid) {
						updateActivity(this.activity).then(res =>{
							this.$message({
								message: '编辑成功',
								type: 'success'
							});
							this.$router.push({
								name: 'index_activity'
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
			},
			handleAvatarSuccess(res, file) {
				if (res.success) {
					this.activity.banner = this.$baseImageUrl + res.data;
				}
			},
			beforeAvatarUpload(file) {
				const isImage = (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png');
				const isLt2M = file.size / 1024 / 1024 < 2;

				if (!isImage) {
					this.$message.error('上传的图片只支持jpg/jpeg/png的格式!');
				}
				if (!isLt2M) {
					this.$message.error('上传的图片大小不能超过 2MB!');
				}
				return isImage && isLt2M;
			},
			handleBannerPreview() {
				this.dialogVisibleImage = true;
			},
			handleBannerDelete() {
				this.activity.banner = null;
			},
			openDialog() {
				if(!this.activity.type){
					this.$message({
						message: '请先选择轮播图的类型',
						type: 'warning'
					});
					return;
				}
				this.dialogTableVisible = true;
				if(this.activity.type == 1){
					this.searchProduct();
				}
				if(this.activity.type == 2){
					this.searchFloor();
				}
				if(this.activity.type == 3){
					this.searchTopic();
				}
			},
			handleChoose() {
				this.activity.relId = this.currentRow.id;
				this.row.id = this.currentRow.id;
				this.row.name = this.currentRow.name;
				this.dialogTableVisible = false;
			},
			cancle(){
				this.dialogTableVisible = false;
				this.currentRow.id = this.row.id;
				this.currentRow.name = this.row.name;
			},
			setCurrent(){
				if(this.activity.type == 1){
					this.$refs.singleTableProduct.setCurrentRow(null);
				}
				if(this.activity.type == 2){
					this.$refs.singleTableFloor.setCurrentRow(null);
				}
				if(this.activity.type == 3){
					this.$refs.singleTableTopic.setCurrentRow(null);
				}
			},
			handleCurrentChange(val) {
				this.search.pageNum = val;
				if (this.activity.type == 1) {
					this.searchProduct();
				}
				if (this.activity.type == 2) {
					this.searchFloor();
				}
				if (this.activity.type == 3) {
					this.searchTopic();
				}
			},
			searchProduct() {
				let data = {
					pageIndex: this.search.pageIndex,
					pageSize: this.search.pageSize,
				}
				if (this.search.product.keyword) {
					data.keyword = this.search.product.keyword
				}
				this.listLoading = true;
				pageProduct(data).then(res => {
					this.listLoading = false;
					this.table.product = res.data.records;
					this.table.total = res.data.total;
				});
			},
			searchFloor() {
				let data = {
					pageIndex: this.search.pageIndex,
					pageSize: this.search.pageSize,
					use: true
				}
				if (this.search.floor.name) {
					data.name = this.search.floor.name
				}
				if (this.search.floor.title) {
					data.title = this.search.floor.title
				}
				this.listLoading = true;
				pageFloor(data).then(res => {
					this.listLoading = false;
					this.table.floor = res.data.records;
					this.table.total = res.data.total;
				});
			},
			searchTopic() {
				let data = {
					pageIndex: this.search.pageIndex,
					pageSize: this.search.pageSize,
					use: true
				}
				if (this.search.topic.name) {
					data.name = this.search.topic.name
				}
				if (this.search.topic.type) {
					data.type = this.search.topic.type
				}
				this.listLoading = true;
				pageTopic(data).then(res => {
					this.listLoading = false;
					this.table.topic = res.data.records;
					this.table.total = res.data.total;
				});
			},
			handleTableProductChange(val){
				if(val){
					this.currentRow.id = val.id,
					this.currentRow.name = val.name;
				}
			},
			handleTableFloorChange(val){
				if(val){
					this.currentRow.id = val.id,
					this.currentRow.name = val.name;
				}
			},
			handleTableTopicChange(val){
				if(val){
					this.currentRow.id = val.id,
					this.currentRow.name = val.name;
				}
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

	/deep/ .avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}

	/deep/ .avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}

	/deep/ .avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 178px;
		height: 178px;
		line-height: 178px;
		text-align: center;
	}

	/deep/ .avatar {
		width: 178px;
		height: 178px;
		display: block;
	}

	/deep/ .image-box {
		width: 500px;
		height: 350px;
		display: inline-block;
	}

	.margin-15 {
		margin-right: 15px;
	}

	.top-15 {
		margin-top: 15px;
	}

	.page {
		margin-top: 15px;
	}

	.foot-left {
		float: left;
		line-height: 40px;
	}
</style>
