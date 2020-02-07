import request from '@/utils/request'
/**
 * 商品
 */
// 商品分页
export const pageProduct = (data) => {
	return request({
		url: '/v1/product/page',
		method: 'get',
		params: data
	})
}
export function fetchList(params) {
	return request({
		url: '/v1/product/list',
		method: 'get',
		params: params
	})
}

export function fetchSimpleList(params) {
	return request({
		url: '/v1/product/page',
		method: 'get',
		params: params
	})
}

export function updateDeleteStatus(params) {
	return request({
		url: '/v1/product/update/delete',
		method: 'delete',
		params: params
	})
}

export function updateNewStatus(params) {
	return request({
		url: '/v1/product/update/newStatus',
		method: 'post',
		params: params
	})
}

export function updateRecommendStatus(params) {
	return request({
		url: '/v1/product/update/recommendStatus',
		method: 'post',
		params: params
	})
}

export function updatePublishStatus(params) {
	return request({
		url: '/v1/product/update/publishStatus',
		method: 'post',
		params: params
	})
}

export function createProduct(data) {
	return request({
		url: 'v1/product/create',
		method: 'post',
		data: data
	})
}

export function updateProduct(id, data) {
	return request({
		url: '/v1/product/update/' + id,
		method: 'put',
		data: data
	})
}

export function getProduct(id) {
	return request({
		url: '/v1/product/updateInfo/' + id,
		method: 'get',
	})
}
