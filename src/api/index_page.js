import request from '@/utils/request'

// 获取商品总览数据
export const productView = () => {
	return request({
		url: '/v1/admin/index/product'
	})
}

// 获取用户总览数据
export const userView = () => {
	return request({
		url: '/v1/admin/index/user'
	})
}

//获取待处理事务数据
export const affairs = () => {
	return request({
		url: '/v1/admin/index/wait'
	})
}

// 获取头部信息
export const headInfo = () => {
	return request({
		url: '/v1/admin/index/head'
	})
}

// 订单折线图
export const orderLine = (data) => {
	return request({
		url: '/v1/admin/index/order',
		method: 'get',
		params: data
	})
}
