<template>
	<div>
		<div class="title">添加专题</div>
		<el-row :gutter="20">
			<el-col :span="14" :offset="4">
				<div class="box">
					<el-form :model="topic" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
						<el-form-item label="专题名称" prop="name" required>
							<el-input v-model="topic.name"></el-input>
						</el-form-item>
						<el-form-item label="是否显示名称" prop="showName" required>
							<el-switch v-model="topic.showName" active-text="显示" inactive-text="暂不显示">
							</el-switch>
						</el-form-item>
						<el-form-item label="专题类型" prop="type" required>
							<el-select v-model="topic.type" placeholder="请选择专题类型">
								<el-option label="一对一" :value="1"></el-option>
								<el-option label="一对多" :value="2"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="封面图片" prop="image" required>
							<el-upload class="avatar-uploader" action="/api/v1/img/save" :show-file-list="false" :on-success="handleAvatarSuccess"
							 :before-upload="beforeAvatarUpload">
								<i v-if="!topic.image" class="el-icon-plus avatar-uploader-icon"></i>
								<div v-if="topic.image" class="el-upload-list--picture-card image-box">
									<img style="object-fit: contain;" class="el-upload-list__item-thumbnail" :src="topic.iamge" alt="">
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
								<el-image style="width: 100%;" :src="topic.image" :preview-src-list="[topic.image]">
								</el-image>
							</el-dialog>
						</el-form-item>
						<el-form-item label="排序" prop="seq" required>
							<el-input-number v-model="topic.seq" :min="0" :max="10" label="请输入排序"></el-input-number>
							<span style="margin-left: 15px; color: #aaa;">注意：数字越大，则显示越靠后</span>
						</el-form-item>
						<el-form-item label="是否启用" prop="use" required>
							<el-switch v-model="topic.use" active-text="启用" inactive-text="暂不启用">
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
		createTopic
	} from '@/api/index'
	export default {
		data() {
			return {
				dialogVisibleImage: false,
				topic: {
					name: '',
					showName: false,
					type: null,
					image: null,
					seq: 0,
					use: false
				},
				rules: {
					name: [{
						required: true,
						message: '请输入专题名称',
						trigger: 'blur'
					}],
					showName: [{
						required: true,
						message: '请选择是否显示名称',
						trigger: 'blur'
					}],
					type: [{
						required: true,
						message: '请选择专题类型',
						trigger: 'change'
					}],
					image: [{
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
				}
			}
		},
		methods: {
			submitForm() {
				this.$refs['ruleForm'].validate((valid) => {
					if (valid) {
						createTopic(this.topic).then(res =>{
							this.$message({
								message: '新增成功',
								type: 'success'
							});
							this.$router.push({
								name: 'index_topic'
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
					this.topic.image = this.$baseImageUrl + res.data;
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
				this.topic.image = null;
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
