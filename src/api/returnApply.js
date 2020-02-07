import request from '@/utils/request'

export function fetchList(params) {
	return request({
		url: '/v1/returnApply/page',
		method: 'get',
		params: params
	})
}

export function deleteApply(params) {
	return request({
		url: '/returnApply/delete',
		method: 'post',
		params: params
	})
}
export function updateApplyStatus(id, data) {
	return request({
		url: '/v1/returnApply/update/status/' + id,
		method: 'post',
		data: data
	})
}

export function getApplyDetail(id) {
	return request({
		url: '/v1/returnApply/' + id,
		method: 'get'
	})
}
