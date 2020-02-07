<template>
	<div style="margin-top: 50px">
		<el-form :model="value" ref="productAttrForm" label-width="120px" style="width: 720px" size="small">
			<el-form-item label="属性类型：">
				<el-select v-model="value.productAttributeCategoryId" placeholder="请选择属性类型" @change="handleProductAttrChange">
					<el-option v-for="item in productAttributeCategoryOptions" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="商品规格：">
				<el-card shadow="never" class="cardBg">
					<div v-for="(productAttr, idx) in selectProductAttr" :key="idx">
						{{productAttr.name}}：
						<el-checkbox-group v-if="productAttr.handAddStatus === 0" v-model="selectProductAttr[idx].values">
							<el-checkbox v-for="item in getInputListArr(productAttr.inputList)" :label="item" :key="item" class="littleMarginLeft"></el-checkbox>
						</el-checkbox-group>
						<div v-else>
							<el-checkbox-group v-model="selectProductAttr[idx].values">
								<div v-for="(item,index) in selectProductAttr[idx].options" :key="index" style="display: inline-block" class="littleMarginLeft">
									<el-checkbox :label="item" :key="item"></el-checkbox>
									<el-button type="text" class="littleMarginLeft" @click="handleRemoveProductAttrValue(idx,index)">删除
									</el-button>
								</div>
							</el-checkbox-group>
							<el-input v-model="addProductAttrValue" style="width: 160px;margin-left: 10px" clearable></el-input>
							<el-button class="littleMarginLeft" @click="handleAddProductAttrValue(idx)">增加</el-button>
						</div>
					</div>
				</el-card>
				<el-table style="width: 100%;margin-top: 20px" :data="value.skuStockList" border>
					<el-table-column v-for="(item,index) in selectProductAttr" :label="item.name" :key="item.id" align="center">
						<template slot-scope="scope">
							{{getProductSkuSp(scope.row,index)}}
						</template>
					</el-table-column>
					<el-table-column label="销售价格" min-width="80" align="center">
						<template slot-scope="scope">
							<el-input v-model="scope.row.price"></el-input>
						</template>
					</el-table-column>
					<!-- <el-table-column label="SKU编号" align="center">
						<template slot-scope="scope">
							<el-input v-model="scope.row.skuCode"></el-input>
						</template>
					</el-table-column> -->
					<el-table-column label="操作" min-width="80" align="center">
						<template slot-scope="scope">
							<el-button type="text" @click="handleRemoveProductSku(scope.$index, scope.row)">删除
							</el-button>
						</template>
					</el-table-column>
				</el-table>
				<el-button type="primary" style="margin-top: 20px" @click="handleRefreshProductSkuList">刷新列表
				</el-button>
				<el-button type="primary" style="margin-top: 20px" @click="handleSyncProductSkuPrice">同步价格
				</el-button>
			</el-form-item>
			<el-form-item label="属性图片：" v-if="hasAttrPic">
				<el-card shadow="never" class="cardBg">
					<div v-for="(item, index) in selectProductAttrPics" :key="index">
						<span>{{item.name}}:</span>
						<single-upload v-model="item.pic" style="width: 300px;display: inline-block;margin-left: 10px"></single-upload>
					</div>
				</el-card>
			</el-form-item>
			<el-form-item label="商品参数：">
				<el-card shadow="never" class="cardBg">
					<div v-for="(item, index) in selectProductParam" :key="index" :class="{littleMarginTop:index!==0}">
						<div class="paramInputLabel">{{item.name}}:</div>
						<el-select v-if="item.inputType===1" class="paramInput" v-model="selectProductParam[index].value">
							<el-option v-for="item in getParamInputList(item.inputList)" :key="item" :label="item" :value="item">
							</el-option>
						</el-select>
						<el-input v-else class="paramInput" v-model="selectProductParam[index].value"></el-input>
					</div>
				</el-card>
			</el-form-item>
			<el-form-item label="选择优惠方式：">
				<el-radio-group v-model="value.promotionType" size="small">
					<el-radio-button :label="0">无优惠</el-radio-button>
					<el-radio-button :label="1">特惠促销</el-radio-button>
					<el-radio-button :label="2">会员立减</el-radio-button>
					<el-radio-button :label="3">阶梯价格</el-radio-button>
					<el-radio-button :label="4">满减价格</el-radio-button>
				</el-radio-group>
			</el-form-item>
			<el-form-item v-show="value.promotionType === 1">
				<div style="margin-top: 8px;">
					开始时间：
					<el-date-picker v-model="value.promotionStartTime" value-format="yyyy-MM-dd HH:mm:ss" type="datetime"
					 :picker-options="pickerOptions1" placeholder="选择开始时间">
					</el-date-picker>
				</div>
				<div class="littleMargin" style="margin-top: 8px;">
					结束时间：
					<el-date-picker v-model="value.promotionEndTime" value-format="yyyy-MM-dd HH:mm:ss" type="datetime"
					 :picker-options="pickerOptions1" placeholder="选择结束时间">
					</el-date-picker>
				</div>
				<div class="littleMargin" style="margin-top: 8px;">
					促销立减：
					<el-input style="width: 220px" v-model="value.promotionPrice" placeholder="输入促销立减价格"></el-input>
				</div>
			
			</el-form-item>
			<el-form-item v-show="value.promotionType === 2">
				<div v-for="(item, index) in value.memberPriceList" :key="index" :class="{littleMargin: index !== 0}" style="margin-top: 8px;">
					{{item.memberLevelName}}：
					<el-input v-model="item.memberPrice" style="width: 200px"></el-input>
				</div>
			</el-form-item>
			<el-form-item v-show="value.promotionType === 3">
				<el-table :data="value.productLadderList" style="width: 80%" border>
					<el-table-column label="数量" align="center" width="120">
						<template slot-scope="scope">
							<el-input v-model="scope.row.count"></el-input>
						</template>
					</el-table-column>
					<el-table-column label="折扣" align="center" width="120">
						<template slot-scope="scope">
							<el-input v-model="scope.row.discount"></el-input>
						</template>
					</el-table-column>
					<el-table-column align="center" label="操作">
						<template slot-scope="scope">
							<el-button type="text" @click="handleRemoveProductLadder(scope.$index, scope.row)">删除</el-button>
							<el-button type="text" @click="handleAddProductLadder(scope.$index, scope.row)">添加</el-button>
						</template>
					</el-table-column>
				</el-table>
			</el-form-item>
			<el-form-item v-show="value.promotionType === 4">
				<el-table :data="value.productFullReductionList" style="width: 80%" border>
					<el-table-column label="满" align="center" width="120">
						<template slot-scope="scope">
							<el-input v-model="scope.row.fullPrice"></el-input>
						</template>
					</el-table-column>
					<el-table-column label="立减" align="center" width="120">
						<template slot-scope="scope">
							<el-input v-model="scope.row.reducePrice"></el-input>
						</template>
					</el-table-column>
					<el-table-column align="center" label="操作">
						<template slot-scope="scope">
							<el-button type="text" @click="handleRemoveFullReduction(scope.$index, scope.row)">删除</el-button>
							<el-button type="text" @click="handleAddFullReduction(scope.$index, scope.row)">添加</el-button>
						</template>
					</el-table-column>
				</el-table>
			</el-form-item>
			<el-form-item label="商品相册：">
				<multi-upload v-model="selectProductPics"></multi-upload>
			</el-form-item>
			<el-form-item label="规格参数：">
				<el-tabs v-model="activeHtmlName" type="card">
					<el-tab-pane label="商品详情" name="mobile">
						<tinymce :width="595" :height="300" v-model="value.detailHtml"></tinymce>
					</el-tab-pane>
				</el-tabs>
			</el-form-item>
			<el-form-item style="text-align: center">
				<el-button size="medium" @click="handlePrev">上一步，填写商品促销</el-button>
				<el-button type="primary" size="medium" @click="handleFinishCommit">完成，提交商品</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	import {
		listProductAttrCate
	} from '@/api/productAttrCate'
	import {
		listProductAttr
	} from '@/api/productAttr'
	import {
		listMember
	} from '@/api/memberLevel'
	
	import SingleUpload from '@/components/Upload/singleUpload'
	import MultiUpload from '@/components/Upload/multiUpload'
	import Tinymce from '@/components/Tinymce'

	export default {
		name: "ProductAttrDetail",
		components: {
			SingleUpload,
			MultiUpload,
			Tinymce
		},
		props: {
			value: Object,
			isEdit: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				//编辑模式时是否初始化成功
				hasEditCreated: false,
				//商品属性分类下拉选项
				productAttributeCategoryOptions: [],
				//选中的商品属性
				selectProductAttr: [],
				//选中的商品参数
				selectProductParam: [],
				//选中的商品属性图片
				selectProductAttrPics: [],
				//可手动添加的商品属性
				addProductAttrValue: '',
				//商品富文本详情激活类型
				activeHtmlName: 'mobile',
				//日期选择器配置
				pickerOptions1: {
					disabledDate(time) {
						return time.getTime() < Date.now();
					}
				}
			}
		},
		computed: {
			//是否有商品属性图片
			hasAttrPic() {
				if (this.selectProductAttrPics.length < 1) {
					return false;
				}
				return true;
			},
			//商品的编号
			productId() {
				return this.value.id;
			},
			promotionType(){
				return this.value.promotionType;
			},
			//商品的主图和画册图片
			selectProductPics: {
				get: function() {
					let pics = [];
					if (this.value.pic === undefined || this.value.pic == null || this.value.pic === '') {
						return pics;
					}
					pics.push(this.value.pic);
					if (this.value.albumPics === undefined || this.value.albumPics == null || this.value.albumPics === '') {
						return pics;
					}
					this.value.albumPics.split(',').forEach(item =>{
						pics.push(item);
					})
					return pics;
				},
				set: function(newValue) {
					if (newValue == null || newValue.length === 0) {
						this.value.pic = null;
						this.value.albumPics = null;
					} else {
						this.value.pic = newValue[0];
						this.value.albumPics = '';
						if (newValue.length > 1) {
							for (let i = 1; i < newValue.length; i++) {
								this.value.albumPics += newValue[i];
								if (i !== newValue.length - 1) {
									this.value.albumPics += ',';
								}
							}
						}
					}
				}
			}
		},
		mounted() {
			this.getProductAttrCateList();
			if(!this.isEdit){
				this.getMemberList()
			}
		},
		watch: {
			promotionType(newVal, oldVal){
				if(this.isEdit){
					if(this.value.promotionType == 2){
						this.checkMemberList()
					}
				}
			},
			productId(newValue) {
				if (!this.isEdit) return;
				if (this.hasEditCreated) return;
				if (newValue === undefined || newValue == null || newValue === 0) return;
				this.handleEditCreated();
			}
		},
		methods: {
			checkMemberList(){
				listMember().then(response => {
					let memberPriceList = [];
					response.data.forEach(item =>{
						let data = {}
						this.value.memberPriceList.forEach(ele =>{
							if(ele.memberLevelId == item.id){
								data = {
									memberLevelId: ele.memberLevelId,
									memberLevelName: item.name,
									memberPrice: ele.memberPrice
								}
							}
						})
						if(data.memberLevelId == null || data.memberLevelId == undefined){
							data = {
								memberLevelId: item.id,
								memberLevelName: item.name,
								memberPrice: 0
							}
						}
						memberPriceList.push(data)
					})
					this.value.memberPriceList = memberPriceList;
				});
			},
			getMemberList(){
				listMember().then(response => {
					let memberPriceList = [];
					response.data.forEach(item =>{
						let data = {
							memberLevelId: item.id,
							memberLevelName: item.name,
							memberPrice: 0
						}
						memberPriceList.push(data)
					})
					this.value.memberPriceList = memberPriceList;
				});
			},
			handleRemoveProductLadder(index, row) {
				let productLadderList = this.value.productLadderList;
				if (productLadderList.length === 1) {
					productLadderList.pop();
					productLadderList.push({
						count: 0,
						discount: 0
					})
				} else {
					productLadderList.splice(index, 1);
				}
			},
			handleAddProductLadder(index, row) {
				let productLadderList = this.value.productLadderList;
				if (productLadderList.length < 3) {
					productLadderList.push({
						count: 0,
						discount: 0
					})
				} else {
					this.$message({
						message: '最多只能添加三条',
						type: 'warning'
					});
				}
			},
			handleRemoveFullReduction(index, row) {
				let fullReductionList = this.value.productFullReductionList;
				if (fullReductionList.length === 1) {
					fullReductionList.pop();
					fullReductionList.push({
						fullPrice: 0,
						reducePrice: 0
					});
				} else {
					fullReductionList.splice(index, 1);
				}
			},
			handleAddFullReduction(index, row) {
				let fullReductionList = this.value.productFullReductionList;
				if (fullReductionList.length < 3) {
					fullReductionList.push({
						fullPrice: 0,
						reducePrice: 0
					});
				} else {
					this.$message({
						message: '最多只能添加三条',
						type: 'warning'
					});
				}
			},
			handleFinishCommit() {
				// 校验数据
				// 获取sku中的最低价格
				let arr = this.value.skuStockList.map(item => item.price);
				let min = Math.min(...arr);
				
				if(this.value.promotionType == 1){
					if(!this.value.promotionStartTime){
						this.$message({
							message: '选择特惠促销后，请填写开始时间',
							type: 'warning'
						});
						return;
					}
					if(!this.value.promotionEndTime){
						this.$message({
							message: '选择特惠促销后，请填写结束时间',
							type: 'warning'
						});
						return;
					}
					if(!this.value.promotionPrice){
						this.$message({
							message: '选择特惠促销后，请填写促销价格',
							type: 'warning'
						});
						return;
					}
					if(this.value.promotionPrice > min){
						this.$message({
							message: '选择特惠促销后，促销价格不能大于最小的商品SKU单价',
							type: 'warning'
						});
						return;
					}
				}
				if(this.value.promotionType == 2){
					let i = 0;
					this.value.memberPriceList.forEach(item =>{
						if(item.memberPrice > min){
							i++;
						}
					})
					if(i > 0){
						this.$message({
							message: '选择会员立减后，立减价格不能大于最小的商品SKU单价',
							type: 'warning'
						});
						return;
					}
				}
				this.mergeProductAttrValue();
				this.mergeProductAttrPics();
				this.$emit('finishCommit', this.isEdit);
			},
			handleEditCreated() {
				//根据商品属性分类id获取属性和参数
				if (this.value.productAttributeCategoryId != null) {
					this.handleProductAttrChange(this.value.productAttributeCategoryId);
				}
				this.hasEditCreated = true;
			},
			getProductAttrCateList() {
				listProductAttrCate().then(response => {
					this.productAttributeCategoryOptions = [];
					response.data.forEach(item => {
						this.productAttributeCategoryOptions.push({
							label: item.name,
							value: item.id
						});
					})
				});
			},
			getProductAttrList(type, cid) {
				listProductAttr(cid, {
					type: type
				}).then(response => {
					let list = response.data;
					if (type === 0) {
						this.selectProductAttr = [];
						list.forEach((item, index) => {
							let options = [];
							let values = [];
							if (this.isEdit) {
								if (item.handAddStatus === 1) {
									//编辑状态下获取手动添加编辑属性
									options = this.getEditAttrOptions(item.id);
								}
								//编辑状态下获取选中属性
								values = this.getEditAttrValues(index);
							} else {
								if (item.handAddStatus === 1) {
									if (item.inputList) {
										options = item.inputList.split(",");
									}
								}
							}
							this.selectProductAttr.push({
								id: item.id,
								name: item.name,
								handAddStatus: item.handAddStatus,
								inputList: item.inputList,
								isColor: item.isColor,
								values: values,
								options: options
							});
						})
						if (this.isEdit) {
							//编辑模式下刷新商品属性图片
							this.refreshProductAttrPics();
						}
					} else {
						this.selectProductParam = [];
						list.forEach(item => {
							let value = null;
							if (this.isEdit) {
								//编辑模式下获取参数属性
								value = this.getEditParamValue(item.id);
							}
							this.selectProductParam.push({
								id: item.id,
								name: item.name,
								value: value,
								inputType: item.inputType,
								inputList: item.inputList
							});
						})
					}
				});
			},
			//获取设置的可手动添加属性值
			getEditAttrOptions(id) {
				let options = [];
				this.value.productAttributeValueList.forEach(item =>{
					if (item.productAttributeId === id) {
						item.value.split(',').forEach(ele =>{
							options.push(ele);
						})
						return;
					}
				})
				return options;
			},
			//获取选中的属性值
			getEditAttrValues(index) {
				let values = new Set();
				this.value.skuStockList.forEach(item =>{
					if(item.sp){
						let arr = item.sp.split(',');
						arr.forEach((ele, eleIndex) =>{
							item['sp' + (eleIndex+1)] = ele;
						})
						values.add(arr[index]);
					}
				})
				return [...values];
			},
			//获取属性的值
			getEditParamValue(id) {
				let value = null;
				this.value.productAttributeValueList.forEach(item =>{
					if (id === item.productAttributeId) {
						value = item.value;
					}
				})
				return value;
			},
			handleProductAttrChange(value) {
				this.getProductAttrList(0, value);
				this.getProductAttrList(1, value);
			},
			getInputListArr(inputList) {
				return inputList.split(',');
			},
			handleAddProductAttrValue(idx) {
				let options = this.selectProductAttr[idx].options;
				if (this.addProductAttrValue == null || this.addProductAttrValue == '') {
					this.$message({
						message: '属性值不能为空',
						type: 'warning',
						duration: 1000
					});
					return
				}
				if (options.indexOf(this.addProductAttrValue) !== -1) {
					this.$message({
						message: '属性值不能重复',
						type: 'warning',
						duration: 1000
					});
					return;
				}
				this.selectProductAttr[idx].options.push(this.addProductAttrValue);
				this.addProductAttrValue = null;
			},
			handleRemoveProductAttrValue(idx, index) {
				this.selectProductAttr[idx].options.splice(index, 1);
			},
			getProductSkuSp(row, index) {
        console.log(row);
				return row['sp' + (index+1)];
			},
			handleRefreshProductSkuList() {
				this.$confirm('刷新列表将导致sku信息重新生成，是否要刷新', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.refreshProductAttrPics();
					this.refreshProductSkuList();
				}).catch(() => {});
			},
			handleSyncProductSkuPrice() {
				this.$confirm('将同步第一个sku的价格到所有sku,是否继续', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					if (this.value.skuStockList !== null && this.value.skuStockList.length > 0) {
						let price = this.value.skuStockList[0].price;
						this.value.skuStockList.forEach(item =>{
							this.$set(item, 'price', price)
						})
					}
				}).catch(() => {});
			},
			refreshProductSkuList() {
				this.value.skuStockList = [];
				let colorIndex = this.selectProductAttr.map(item => item.isColor).indexOf(1);
        console.log('这里');
				this.value.skuStockList = doExchange(this.selectProductAttr.map(item => item.values)).map(item =>{
					let data = {};
					item.forEach((ele, index) =>{
						data['sp'+ (index+1)] = ele;
						if(colorIndex > -1 && colorIndex == index){
							data.colorSp = ele;
						}
					})
					data.sp = item.join();
					return data;
				})
				/*返回组合的数组*/
				function doExchange(arr) {
					let len = arr.length;
					// 当数组大于等于2个的时候
					if (len >= 2) {
						// 第一个数组的长度
						let len1 = arr[0].length;
						// 第二个数组的长度
						let len2 = arr[1].length;
						// 2个数组产生的组合数
						let lenBoth = len1 * len2;
						//  申明一个新数组
						let items = new Array(lenBoth);
						// 申明新数组的索引
						let index = 0;
						for (let i = 0; i < len1; i++) {
							for (let j = 0; j < len2; j++) {
								if (arr[0][i] instanceof Array) {
									items[index] = arr[0][i].concat(arr[1][j]);
								} else {
									items[index] = [arr[0][i]].concat(arr[1][j]);
								}
								index++;
							}
						}
						let newArr = new Array(len - 1);
						for (let i = 2; i < arr.length; i++) {
							newArr[i - 1] = arr[i];
						}
						newArr[0] = items;
						return doExchange(newArr);
					} else {
						return arr[0];
					}
				}
			},
			refreshProductAttrPics() {
				this.selectProductAttrPics = [];
				if (this.selectProductAttr.length > 0) {
					this.selectProductAttr.forEach(item => {
						if (item.isColor == 1) {
							let values = item.values;
							values.forEach(ele => {
								let pic = null;
								if (this.isEdit) {
									//编辑状态下获取图片
									pic = this.getProductSkuPic(ele);
								}
								this.selectProductAttrPics.push({
									name: ele,
									pic: pic
								})
							})
						}
					})

				}
			},
			//获取商品相关属性的图片
			getProductSkuPic(name) {
				for (let i = 0; i < this.value.skuStockList.length; i++) {
					if (name === this.value.skuStockList[i].colorSp) {
						return this.value.skuStockList[i].pic;
					}
				}
				return null;
			},
			//合并商品属性
			mergeProductAttrValue() {
				this.value.productAttributeValueList = [];
				for (let i = 0; i < this.selectProductAttr.length; i++) {
					let attr = this.selectProductAttr[i];
					if (attr.handAddStatus === 1 && attr.options != null && attr.options.length > 0) {
						this.value.productAttributeValueList.push({
							productAttributeId: attr.id,
							value: this.getOptionStr(attr.options)
						});
					}
				}
				for (let i = 0; i < this.selectProductParam.length; i++) {
					let param = this.selectProductParam[i];
					this.value.productAttributeValueList.push({
						productAttributeId: param.id,
						value: param.value
					});
				}
			},
			//合并商品属性图片
			mergeProductAttrPics() {
				for (let i = 0; i < this.selectProductAttrPics.length; i++) {
					for (let j = 0; j < this.value.skuStockList.length; j++) {
						if (this.value.skuStockList[j].colorSp === this.selectProductAttrPics[i].name) {
							this.value.skuStockList[j].pic = this.selectProductAttrPics[i].pic;
						}
					}
				}
			},
			getOptionStr(arr) {
				let str = '';
				for (let i = 0; i < arr.length; i++) {
					str += arr[i];
					if (i != arr.length - 1) {
						str += ',';
					}
				}
				return str;
			},
			handleRemoveProductSku(index, row) {
				let list = this.value.skuStockList;
				if (list.length === 1) {
					list.pop();
				} else {
					list.splice(index, 1);
				}
			},
			getParamInputList(inputList) {
				return inputList.split(',');
			},
			handlePrev() {
				this.$emit('prevStep')
			}
		}
	}
</script>

<style scoped>
	.littleMarginLeft {
		margin-left: 10px;
	}

	.littleMarginTop {
		margin-top: 10px;
	}

	.paramInput {
		width: 250px;
	}

	.paramInputLabel {
		display: inline-block;
		width: 100px;
		text-align: right;
		padding-right: 10px
	}

	.cardBg {
		background: #F8F9FC;
	}
</style>
