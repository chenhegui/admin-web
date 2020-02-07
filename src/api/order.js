import request from '@/utils/request'

/**
 * 订单
 */
// 分页查询订单信息
export function pageOrder(params) {
	return request({
		url: '/v1/admin/order/page',
		method: 'get',
		params: params
	})
}

export function closeOrder(params) {
	return request({
		url:'/v1/admin/order/update/close',
		method: 'post',
		params: params
	})
}

export function deleteOrder(params) {
	return request({
		url: '/v1/admin/order/delete',
		method: 'delete',
		params: params
	})
}

export function deliveryOrder(data) {
	return request({
		url: '/v1/admin/order/update/delivery',
		method: 'post',
		data: data
	});
}

export function getOrderDetail(id) {
	return request({
		url: '/v1/admin/order/' + id,
		method: 'get'
	});
}

export function updateReceiverInfo(data) {
	return request({
		url:'/v1/admin/order/update/receiverInfo',
		method: 'post',
		data: data
	});
}

export function updateMoneyInfo(data) {
	return request({
		// url: '/order/update/moneyInfo',
    url:'/v1/admin/order/update/moneyInfo',
		method: 'post',
		data: data
	});
}

export function updateOrderNote(params) {
	return request({
		url:'/v1/admin/order/update/note',
		method: 'post',
		params: params
	})
}

/**
 * 根据id查询订单操作信息
 * @param {Object} id
 */
export function getOrderOperateHistory(id) {
	return request({
		url:'/v1/admin/order/orderOperateHistory/' + id,
		method: 'get'
	})
}