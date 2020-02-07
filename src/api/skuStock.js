import request from '@/utils/request'
export function listSkuStock(pid, params) {
	return request({
		url: '/v1/product/sku/' + pid,
		method: 'get',
		params: params
	})
}

export function updateSkuStock(pid, data) {
	return request({
		url: '/v1/product/sku/update/' + pid,
		method: 'post',
		data: data
	})
}
