import request from '@/utils/request'

export function fetchList(params) {
	return request({
		url: '/v1/admin/coupon/list',
		method: 'get',
		params: params
	})
}

export function createCoupon(data) {
	return request({
		url: '/v1/admin/coupon/create',
		method: 'post',
		data: data
	})
}

export function getCoupon(id) {
	return request({
		url: '/v1/admin/coupon/' + id,
		method: 'get',
	})
}

export function updateCoupon(id, data) {
	return request({
		url: '/v1/admin/coupon/update/' + id,
		method: 'post',
		data: data
	})
}

export function deleteCoupon(id) {
	return request({
		url: '/coupon/delete/' + id,
		method: 'post',
	})
}
