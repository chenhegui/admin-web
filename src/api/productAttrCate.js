import request from '@/utils/request'

export function fetchList(params) {
	return request({
		url: '/productAttribute/category/page',
		method: 'get',
		params: params
	})
}

export function createProductAttrCate(data) {
	return request({
		url: '/productAttribute/category/create',
		method: 'post',
		params: {
			name: data
		}
	})
}

export function deleteProductAttrCate(id) {
	return request({
		url: '/productAttribute/category/delete/' + id,
		method: 'get'
	})
}

export function updateProductAttrCate(id, data) {
	return request({
		url: '/productAttribute/category/update/' + id,
		method: 'put',
		params: {
			name: data
		}
	})
}

export function detailProductAttrCate(id) {
	return request({
		url: '/productAttribute/category/' + id,
		method: 'get'
	})
}

export function listProductAttrCate() {
	return request({
		url: '/productAttribute/category/list',
		method: 'get'
	})
}
