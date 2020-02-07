import request from '@/utils/request'

/**
 * 会员类型管理
 */
// 添加会员类型
export const createMember = (data) => {
	return request({
		url: '/v1/admin/member/create',
		method: 'post',
		data: data
	})
}

// 修改会员类型
export const updateMember = (data) => {
	return request({
		url: '/v1/admin/member/update',
		method: 'put',
		data: data
	})
}

// 查询会员类型详情
export const detailMember = (id) => {
	return request({
		url: '/v1/admin/member/detail/' + id,
		method: 'get'
	})
}

// 查询会员类型
export const listMember = (data) => {
	return request({
		url: '/v1/admin/member/list',
		method: 'get'
	})
}

// 删除会员类型
export const deleteMember = (id) => {
	return request({
		url: '/v1/admin/member/delete/' + id,
		method: 'delete'
	})
}

/**
 * 会员信息
 */

// 会员信息分页
export const pageUserCard = (data) => {
	return request({
		url: '/v1/userCard/page',
		method: 'get',
		params: data
	})
}

// 修改会员状态
export const updateUserCardStates = (data) => {
	return request({
		url: '/v1/userCard/update',
		method: 'put',
		params: data
	})
}

/**
 * 消费记录
 */
// 删除会员类型
export const pageDepositLog = (data) => {
	return request({
		url: '/v1/userCard/admin/depositLog',
		method: 'get',
		params: data
	})
}

/**
 * 系统参数设置
 */
// 获取系统参数
export const listSystemSetting = () => {
	return request({
		url: '/v1/systemSetting/list',
		method: 'get'
	})
}
// 修改系统参数
export const updateSystemSetting = (data) => {
	return request({
		url: '/v1/systemSetting/update',
		method: 'put',
		data: data
	})
}

/**
 * 用户管理
 */
export const pageUser = (data) => {
	return request({
		url: '/v1/user/page',
		method: 'get',
		params: data
	})
}
// 启用用户
export const openUser = (id) => {
	return request({
		url: '/v1/user/open/' + id,
		method: 'get'
	})
}
// 禁用用户
export const disableUser = (id) => {
	return request({
		url: '/v1/user/disable/' + id,
		method: 'get'
	})
}
// 删除用户
export const deleteUser = (id) => {
	return request({
		url: '/v1/user/delete/' + id,
		method: 'delete'
	})
}