import request from '@/utils/request'

export default {
  list: function(data) {
    return request({
      url: '/api/v1/user/list',
      method: 'post',
      data
    })
  },
  autoComplete: function(data) {
    return request({
      url: '/api/v1/user/autoComplete',
      method: 'post',
      data
    })
  },
  exist: function(username) {
    return request({
      url: '/api/v1/user/exist/' + username,
      method: 'get'
    })
  },
  create: function(data) {
    return request({
      url: '/api/v1/user/create',
      method: 'post',
      data
    })
  },
  details: function(id) {
    return request({
      url: '/api/v1/user/details/' + id,
      method: 'get'
    })
  },
  reset: function(id) {
    return request({
      url: '/api/v1/user/reset/' + id,
      method: 'post'
    })
  },
  /**
   * 禁用(锁定)用户
   * @param id
   */
  freeze: function(id) {
    return request({
      url: '/api/v1/user/freeze/' + id,
      method: 'post'
    })
  },
  /**
   * 解锁用户
   * @param id
   */
  unfreeze: function(id) {
    return request({
      url: '/api/v1/user/unfreeze/' + id,
      method: 'post'
    })
  },
  update: function(id, data) {
    return request({
      url: '/api/v1/user/update/' + id,
      method: 'post',
      data
    })
  }
}
