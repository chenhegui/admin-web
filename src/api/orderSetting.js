import request from '@/utils/request'

export function getOrderSetting() {
	return request({
		url: '/v1/admin/order/orderSetting',
		method: 'get',
	})
}

export function updateOrderSetting(data) {
	return request({
		url: '/v1/admin/order/updateOrderSetting',
		method: 'post',
		data: data
	})
}
