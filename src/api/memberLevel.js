import request from '@/utils/request'

export function listMember(params) {
	return request({
		url: '/v1/admin/member/list',
		method: 'get'
	})
}
