import request from '@/utils/request'
export function fetchList(id,params) {
  return request({
    url:'/v1/admin/coupon/history/'+id,
    method:'get',
    params:params
  })
}
