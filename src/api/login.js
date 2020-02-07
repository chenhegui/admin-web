import request from '@/utils/request'

export function login(username, password) {
	return request({
		url: '/login',
		method: 'post',
		params: {
			username: username,
			password: password
		}
	})
}

export function getInfo() {
	return request({
		url: '/v1/user/detail',
		method: 'get',
	})
}

export function logout() {
	return request({
		url: '/admin/logout',
		method: 'post'
	})
}
