<template>
	<div class="upload-container">
		<el-button icon='el-icon-upload' size="mini" :style="{background:color,borderColor:color}" @click=" dialogVisible=true"
		 type="primary">上传图片
		</el-button>
		<el-dialog append-to-body :visible.sync="dialogVisible">
			<el-upload class="editor-slide-upload" action="/api/v1/img/save" :data="dataObj" :multiple="true" :file-list="fileList"
			 :show-file-list="true" list-type="picture-card" :on-remove="handleRemove" :on-success="handleSuccess"
			 :before-upload="beforeUpload">
				<el-button size="small" type="primary">点击上传</el-button>
			</el-upload>
			<el-button style="margin-top: 20px;" @click="dialogVisible = false">取 消</el-button>
			<el-button type="primary" @click="handleSubmit">确 定</el-button>
		</el-dialog>
	</div>
</template>

<script>
	import {
		policy
	} from '@/api/oss'

	export default {
		name: 'editorSlideUpload',
		props: {
			color: {
				type: String,
				default: '#1890ff'
			}
		},
		data() {
			return {
				dialogVisible: false,
				// listObj: {},
				listObj: [],
				fileList: [],
				dataObj: {
					policy: '',
					signature: '',
					key: '',
					ossaccessKeyId: '',
					dir: '',
					host: ''
				}
			}
		},
		methods: {
			checkAllSuccess() {
				return Object.keys(this.listObj).every(item => this.listObj[item].hasSuccess)
			},
			handleSubmit() {
				if (!this.checkAllSuccess()) {
					this.$message('请等待所有图片上传成功 或 出现了网络问题，请刷新页面重新上传！')
					return
				}
				this.$emit('successCBK', this.listObj);
				this.listObj = [];
				this.fileList = [];
				this.dialogVisible = false;
			},
			handleSuccess(response, file) {
				const uid = file.uid;
				let temp = {}
				if(response.success){
					temp = {
						url: this.$baseImageUrl + response.data,
						hasSuccess: true,
						uid: uid
					}
				}
				this.listObj.push(temp);
			},
			handleRemove(file) {
				const uid = file.uid;
				for (let i = 0, len = this.listObj.length; i < len; i++) {
					if (this.listObj[i].uid === uid) {
						delete this.listObj[i];
						return
					}
				}
			},
			beforeUpload(file) {
				const isImage = (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png');
				const isLt2M = file.size / 1024 / 1024 < 2;
				
				if (!isImage) {
					this.$message.error('上传的图片只支持jpg/jpeg/png的格式!');
				}
				if (!isLt2M) {
					this.$message.error('上传的图片大小不能超过 2MB!');
				}
				return isImage && isLt2M;
			}
		}
	}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	.upload-container .editor-slide-upload {
		margin-bottom: 20px;
	}
</style>
