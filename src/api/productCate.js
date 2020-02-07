import request from '@/utils/request'

export function fetchList(params) {
	return request({
		url: '/v1/category/page',
		method: 'get',
		params: params
	})
}

export function listProductCate() {
	return request({
		url: '/v1/category/list',
		method: 'get'
	})
}

export function deleteProductCate(id) {
	return request({
		url: '/v1/category/delete/' + id,
		method: 'delete'
	})
}

export function createProductCate(data) {
	return request({
		url: '/v1/category/create',
		method: 'post',
		data: data
	})
}

export function updateProductCate(data) {
	return request({
		url: '/v1/category/update',
		method: 'put',
		data: data
	})
}

export function getProductCate(id) {
	return request({
		url: '/v1/category/detail/' + id,
		method: 'get',
	})
}

export function updateShowStatus(data) {
	return request({
		url: '/productCategory/update/showStatus',
		method: 'post',
		data: data
	})
}

export function updateNavStatus(data) {
	return request({
		url: '/productCategory/update/navStatus',
		method: 'post',
		data: data
	})
}
