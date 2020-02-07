import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/
export const constantRouterMap = [{
		path: '/login',
		component: () => import('@/views/login/index'),
		hidden: true
	},
	{
		path: '/404',
		component: () => import('@/views/404'),
		hidden: true
	},
	{
		path: '',
		component: Layout,
		redirect: '/home',
		children: [{
			path: 'home',
			name: 'home',
			component: () => import('@/views/home/index'),
			meta: {
				title: '首页',
				icon: 'el-icon-s-home'
			}
		}]
	},
	{
		path: '/index',
		component: Layout,
		redirect: '/index/activity',
		name: 'index',
		meta: {
			title: '首页管理',
			icon: 'el-icon-mobile-phone'
		},
		children: [
			{
				path: 'activity',
				name: 'index_activity',
				component: () => import('@/views/index/activity/index'),
				meta: {
					title: '轮播图管理',
					icon: 'el-icon-picture-outline'
				}
			},
			{
				path: 'activity/add',
				name: 'index_activity_add',
				component: () => import('@/views/index/activity/add'),
				meta: {
					title: '新增轮播图',
					icon: 'el-icon-picture-outline'
				},
				hidden: true
			},
			{
				path: 'activity/edit',
				name: 'index_activity_edit',
				component: () => import('@/views/index/activity/edit'),
				meta: {
					title: '编辑轮播图',
					icon: 'el-icon-picture-outline'
				},
				hidden: true
			},
			{
				path: 'floor',
				name: 'index_floor',
				component: () => import('@/views/index/floor/index'),
				meta: {
					title: '分类管理',
					icon: 'el-icon-menu'
				}
			},
			{
				path: 'floor/add',
				name: 'index_floor_add',
				component: () => import('@/views/index/floor/add'),
				meta: {
					title: '新增分类',
					icon: 'el-icon-picture-outline'
				},
				hidden: true
			},
			{
				path: 'floor/edit',
				name: 'index_floor_edit',
				component: () => import('@/views/index/floor/edit'),
				meta: {
					title: '编辑分类',
					icon: 'el-icon-picture-outline'
				},
				hidden: true
			},
			{
				path: 'floor/product',
				name: 'index_floor_product',
				component: () => import('@/views/index/floor/product'),
				meta: {
					title: '添加商品',
					icon: 'el-icon-picture-outline'
				},
				hidden: true
			},
			{
				path: 'topic',
				name: 'index_topic',
				component: () => import('@/views/index/topic/index'),
				meta: {
					title: '专题管理',
					icon: 'el-icon-notebook-1'
				}
			},
			{
				path: 'topic/add',
				name: 'index_topic_add',
				component: () => import('@/views/index/topic/add'),
				meta: {
					title: '新增专题',
					icon: 'el-icon-picture-outline'
				},
				hidden: true
			},
			{
				path: 'topic/edit',
				name: 'index_topic_edit',
				component: () => import('@/views/index/topic/edit'),
				meta: {
					title: '编辑专题',
					icon: 'el-icon-picture-outline'
				},
				hidden: true
			},
			{
				path: 'topic/product',
				name: 'index_topic_product',
				component: () => import('@/views/index/topic/product'),
				meta: {
					title: '添加商品',
					icon: 'el-icon-picture-outline'
				},
				hidden: true
			},
			{
				path: 'topic/single-product',
				name: 'index_topic_single_product',
				component: () => import('@/views/index/topic/single-product'),
				meta: {
					title: '添加商品',
					icon: 'el-icon-picture-outline'
				},
				hidden: true
			},
		]
	},
	{
		path: '/pms',
		component: Layout,
		redirect: '/pms/product',
		name: 'pms',
		meta: {
			title: '商品',
			icon: 'el-icon-shopping-bag-1'
		},
		children: [{
				path: 'product',
				name: 'product',
				component: () => import('@/views/pms/product/index'),
				meta: {
					title: '商品列表',
					icon: 'el-icon-shopping-bag-1'
				}
			},
			{
				path: 'addProduct',
				name: 'addProduct',
				component: () => import('@/views/pms/product/add'),
				meta: {
					title: '添加商品',
					icon: 'el-icon-sold-out'
				}
			},
			{
				path: 'updateProduct',
				name: 'updateProduct',
				component: () => import('@/views/pms/product/update'),
				meta: {
					title: '修改商品',
					icon: 'product-add'
				},
				hidden: true
			},
			{
				path: 'productRecycle',
				name: 'productRecycle',
				component: () => import('@/views/pms/product/index'),
				meta: {
					title: '商品回收站',
					icon: 'product-recycle'
				},
				hidden: true
			},
			{
				path: 'productComment',
				name: 'productComment',
				component: () => import('@/views/pms/product/index'),
				meta: {
					title: '商品评价',
					icon: 'product-comment'
				},
				hidden: true
			},
			{
				path: 'productCate',
				name: 'productCate',
				component: () => import('@/views/pms/productCate/index'),
				meta: {
					title: '商品分类',
					icon: 'el-icon-s-grid'
				}
			},
			{
				path: 'addProductCate',
				name: 'addProductCate',
				component: () => import('@/views/pms/productCate/add'),
				meta: {
					title: '添加商品分类'
				},
				hidden: true
			},
			{
				path: 'updateProductCate',
				name: 'updateProductCate',
				component: () => import('@/views/pms/productCate/update'),
				meta: {
					title: '修改商品分类'
				},
				hidden: true
			},
			{
				path: 'productAttr',
				name: 'productAttr',
				component: () => import('@/views/pms/productAttr/index'),
				meta: {
					title: '商品类型',
					icon: 'el-icon-box'
				}
			},
			{
				path: 'productAttrList',
				name: 'productAttrList',
				component: () => import('@/views/pms/productAttr/productAttrList'),
				meta: {
					title: '商品属性列表'
				},
				hidden: true
			},
			{
				path: 'addProductAttr',
				name: 'addProductAttr',
				component: () => import('@/views/pms/productAttr/addProductAttr'),
				meta: {
					title: '添加商品属性'
				},
				hidden: true
			},
			{
				path: 'updateProductAttr',
				name: 'updateProductAttr',
				component: () => import('@/views/pms/productAttr/updateProductAttr'),
				meta: {
					title: '修改商品属性'
				},
				hidden: true
			},
			// {
			// 	path: 'brand',
			// 	name: 'brand',
			// 	component: () => import('@/views/pms/brand/index'),
			// 	meta: {
			// 		title: '品牌管理',
			// 		icon: 'product-brand'
			// 	}
			// },
			// {
			// 	path: 'addBrand',
			// 	name: 'addBrand',
			// 	component: () => import('@/views/pms/brand/add'),
			// 	meta: {
			// 		title: '添加品牌'
			// 	},
			// 	hidden: true
			// },
			// {
			// 	path: 'updateBrand',
			// 	name: 'updateBrand',
			// 	component: () => import('@/views/pms/brand/update'),
			// 	meta: {
			// 		title: '编辑品牌'
			// 	},
			// 	hidden: true
			// }
		]
	},
	{
		path: '/oms',
		component: Layout,
		redirect: '/oms/order',
		name: 'oms',
		meta: {
			title: '订单',
			icon: 'el-icon-document-copy'
		},
		children: [{
				path: 'order',
				name: 'order',
				component: () => import('@/views/oms/order/index'),
				meta: {
					title: '订单列表',
					icon: 'el-icon-document'
				}
			},
			{
				path: 'orderDetail',
				name: 'orderDetail',
				component: () => import('@/views/oms/order/orderDetail'),
				meta: {
					title: '订单详情'
				},
				hidden: true
			},
			{
				path: 'deliverOrderList',
				name: 'deliverOrderList',
				component: () => import('@/views/oms/order/deliverOrderList'),
				meta: {
					title: '发货列表'
				},
				hidden: true
			},
			{
				path: 'orderSetting',
				name: 'orderSetting',
				component: () => import('@/views/oms/order/setting'),
				meta: {
					title: '订单设置',
					icon: 'el-icon-s-tools'
				}
			},
			{
				path: 'returnApply',
				name: 'returnApply',
				component: () => import('@/views/oms/apply/index'),
				meta: {
					title: '退货申请处理',
					icon: 'el-icon-document-delete'
				}
			},
			{
				path: 'returnReason',
				name: 'returnReason',
				component: () => import('@/views/oms/apply/reason'),
				meta: {
					title: '退货原因设置',
					icon: 'el-icon-truck'
				}
			},
			{
				path: 'returnApplyDetail',
				name: 'returnApplyDetail',
				component: () => import('@/views/oms/apply/applyDetail'),
				meta: {
					title: '退货原因详情'
				},
				hidden: true
			}
		]
	},
	{
		path: '/sms',
		component: Layout,
		redirect: '/sms/coupon',
		name: 'sms',
		meta: {
			title: '营销',
			icon: 'el-icon-sold-out'
		},
		children: [
			// {
			// 	path: 'flash',
			// 	name: 'flash',
			// 	component: () => import('@/views/sms/flash/index'),
			// 	meta: {
			// 		title: '秒杀活动列表',
			// 		icon: 'sms-flash'
			// 	}
			// },
			// {
			// 	path: 'flashSession',
			// 	name: 'flashSession',
			// 	component: () => import('@/views/sms/flash/sessionList'),
			// 	meta: {
			// 		title: '秒杀时间段列表'
			// 	},
			// 	hidden: true
			// },
			// {
			// 	path: 'selectSession',
			// 	name: 'selectSession',
			// 	component: () => import('@/views/sms/flash/selectSessionList'),
			// 	meta: {
			// 		title: '秒杀时间段选择'
			// 	},
			// 	hidden: true
			// },
			// {
			// 	path: 'flashProductRelation',
			// 	name: 'flashProductRelation',
			// 	component: () => import('@/views/sms/flash/productRelationList'),
			// 	meta: {
			// 		title: '秒杀商品列表'
			// 	},
			// 	hidden: true
			// },
			{
				path: 'coupon',
				name: 'coupon',
				component: () => import('@/views/sms/coupon/index'),
				meta: {
					title: '优惠券列表',
					icon: 'el-icon-discount'
				}
			},
			{
				path: 'addCoupon',
				name: 'addCoupon',
				component: () => import('@/views/sms/coupon/add'),
				meta: {
					title: '添加优惠券'
				},
				hidden: true
			},
			{
				path: 'updateCoupon',
				name: 'updateCoupon',
				component: () => import('@/views/sms/coupon/update'),
				meta: {
					title: '修改优惠券'
				},
				hidden: true
			},
			{
				path: 'couponHistory',
				name: 'couponHistory',
				component: () => import('@/views/sms/coupon/history'),
				meta: {
					title: '优惠券领取详情'
				},
				hidden: true
			},
			// {
			// 	path: 'brand',
			// 	name: 'homeBrand',
			// 	component: () => import('@/views/sms/brand/index'),
			// 	meta: {
			// 		title: '品牌推荐',
			// 		icon: 'product-brand'
			// 	}
			// },
			// {
			// 	path: 'new',
			// 	name: 'homeNew',
			// 	component: () => import('@/views/sms/new/index'),
			// 	meta: {
			// 		title: '新品推荐',
			// 		icon: 'sms-new'
			// 	}
			// },
			// {
			// 	path: 'hot',
			// 	name: 'homeHot',
			// 	component: () => import('@/views/sms/hot/index'),
			// 	meta: {
			// 		title: '人气推荐',
			// 		icon: 'sms-hot'
			// 	}
			// },
			// {
			// 	path: 'subject',
			// 	name: 'homeSubject',
			// 	component: () => import('@/views/sms/subject/index'),
			// 	meta: {
			// 		title: '专题推荐',
			// 		icon: 'sms-subject'
			// 	}
			// },
			// {
			// 	path: 'advertise',
			// 	name: 'homeAdvertise',
			// 	component: () => import('@/views/sms/advertise/index'),
			// 	meta: {
			// 		title: '广告列表',
			// 		icon: 'sms-ad'
			// 	}
			// },
			// {
			// 	path: 'addAdvertise',
			// 	name: 'addHomeAdvertise',
			// 	component: () => import('@/views/sms/advertise/add'),
			// 	meta: {
			// 		title: '添加广告'
			// 	},
			// 	hidden: true
			// },
			// {
			// 	path: 'updateAdvertise',
			// 	name: 'updateHomeAdvertise',
			// 	component: () => import('@/views/sms/advertise/update'),
			// 	meta: {
			// 		title: '编辑广告'
			// 	},
			// 	hidden: true
			// }
		]
	},
	{
		path: '/member',
		component: Layout,
		redirect: '/member/type',
		name: 'member',
		meta: {
			title: '会员设置',
			icon: 'el-icon-trophy'
		},
		children: [
			{
				path: 'type',
				name: 'member_type',
				component: () => import('@/views/member/type'),
				meta: {
					title: '类型管理',
					icon: 'el-icon-medal'
				}
			},
			{
				path: 'list',
				name: 'member_list',
				component: () => import('@/views/member/list'),
				meta: {
					title: '会员列表',
					icon: 'el-icon-notebook-2'
				}
			},
		]
	},
	{
		path: '/system',
		component: Layout,
		redirect: '/system/member',
		name: 'system',
		meta: {
			title: '系统设置',
			icon: 'el-icon-setting'
		},
		children: [
			{
				path: 'member',
				name: 'system_member',
				component: () => import('@/views/system/member/index'),
				meta: {
					title: '会员管理',
					icon: 'el-icon-postcard'
				}
			},
			{
				path: 'deposit',
				name: 'system_deposit',
				component: () => import('@/views/system/deposit/index'),
				meta: {
					title: '消费记录',
					icon: 'el-icon-mobile-phone'
				}
			},
			{
				path: 'setting',
				name: 'system_setting',
				component: () => import('@/views/system/setting/index'),
				meta: {
					title: '系统参数',
					icon: 'el-icon-goods'
				}
			},
			{
				path: 'user',
				name: 'system_user',
				component: () => import('@/views/system/user/index'),
				meta: {
					title: '用户管理',
					icon: 'el-icon-user'
				}
			}
		]
	},
	{
		path: '*',
		redirect: '/404',
		hidden: true
	}
]

export default new Router({
	// mode: 'history', //后端支持可开
	scrollBehavior: () => ({
		y: 0
	}),
	routes: constantRouterMap
})
