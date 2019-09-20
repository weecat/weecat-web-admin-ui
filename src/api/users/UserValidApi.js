import request from '@/utils/request'

/**
 * 用户实名认证
 */
export default {
  list: function(data) {
    return request({
      url: '/api/v1/userValid/list',
      method: 'post',
      data
    })
  },
  details: function(id) {
    return request({
      url: '/api/v1/userValid/details/' + id,
      method: 'get'
    })
  },
  approve: function(id, data) {
    return request({
      url: '/api/v1/userValid/approve/' + id,
      method: 'post',
      data
    })
  }
}
