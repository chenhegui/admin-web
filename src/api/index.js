import request from '@/utils/request'

/**
 * 轮播图
 */
// 添加轮播图
export const createActivity = (data) => {
	return request({
		url: '/v1/activity/create',
		method: 'post',
		data: data
	})
}

// 修改轮播图
export const updateActivity = (data) => {
	return request({
		url: '/v1/activity/update',
		method: 'put',
		data: data
	})
}

// 查询轮播图
export const detailActivity = (id) => {
	return request({
		url: '/v1/activity/detail/' + id,
		method: 'get'
	})
}

// 删除轮播图
export const deleteActivity = (id) => {
	return request({
		url: '/v1/activity/delete/' + id,
		method: 'delete'
	})
}

// 查询轮播图的分页
export const pageActivity = (data) => {
	return request({
		url: '/v1/activity/page',
		method: 'get',
		params: data
	})
}

/**
 * 分类
 */
// 添加分类
export const createFloor = (data) => {
	return request({
		url: '/v1/floor/create',
		method: 'post',
		data: data
	})
}

// 修改分类
export const updateFloor = (data) => {
	return request({
		url: '/v1/floor/update',
		method: 'put',
		data: data
	})
}

// 查询分类
export const detailFloor = (id) => {
	return request({
		url: '/v1/floor/detail/' + id,
		method: 'get'
	})
}

// 删除分类
export const deleteFloor = (id) => {
	return request({
		url: '/v1/floor/delete/' + id,
		method: 'delete'
	})
}

// 查询分类的分页
export const pageFloor = (data) => {
	return request({
		url: '/v1/floor/page',
		method: 'get',
		params: data
	})
}

// 查询分类下的商品信息
export const floorFindProduct = (id) => {
	return request({
		url: '/v1/floor/findProduct/' + id,
		method: 'get'
	})
}

// 删除分类下的商品信息
export const floorDeleteProduct = (id, pid) => {
	return request({
		url: '/v1/floor/deleteProduct/' + id,
		method: 'delete',
		params: {
			pid: pid
		}
	})
}

// 分页查询分类下的商品信息
export const floorPageProduct = (id, data) => {
	return request({
		url: '/v1/floor/pageProduct/' + id,
		method: 'get',
		params: data
	})
}

// 修改分类下的商品信息
export const floorSaveProduct = (id, data) => {
	return request({
		url: '/v1/floor/saveProduct/' + id,
		method: 'post',
		data: data
	})
}

/**
 * 专题
 */
// 添加专题
export const createTopic = (data) => {
	return request({
		url: '/v1/topic/create',
		method: 'post',
		data: data
	})
}

// 修改专题
export const updateTopic = (data) => {
	return request({
		url: '/v1/topic/update',
		method: 'put',
		data: data
	})
}

// 查询专题
export const detailTopic = (id) => {
	return request({
		url: '/v1/topic/detail/' + id,
		method: 'get'
	})
}

// 删除专题
export const deleteTopic = (id) => {
	return request({
		url: '/v1/topic/delete/' + id,
		method: 'delete'
	})
}

// 查询专题的分页
export const pageTopic = (data) => {
	return request({
		url: '/v1/topic/page',
		method: 'get',
		params: data
	})
}

// 查询专题下的商品信息
export const topicFindProduct = (id) => {
	return request({
		url: '/v1/topic/findProduct/' + id,
		method: 'get'
	})
}

// 修改专题下的商品信息
export const topicSaveProduct = (id, data) => {
	return request({
		url: '/v1/topic/saveProduct/' + id,
		method: 'post',
		data: data
	})
}

// 分页查询专题下的商品信息
export const topicPageProduct = (id, data) => {
	return request({
		url: '/v1/topic/pageProduct/' + id,
		method: 'get',
		params: data
	})
}

// 删除专题下的商品信息
export const topicDeleteProduct = (id, pid) => {
	return request({
		url: '/v1/topic/deleteProduct/' + id,
		method: 'delete',
		params: {
			pid: pid
		}
	})
}