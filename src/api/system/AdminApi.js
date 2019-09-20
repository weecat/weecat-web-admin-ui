import request from '@/utils/request'

export default {
  list: function(data) {
    return request({
      url: '/api/v1/admin/list',
      method: 'post',
      data
    })
  },
  create: function(data) {
    return request({
      url: '/api/v1/admin/create',
      method: 'post',
      data
    })
  },
  update: function(id, data) {
    return request({
      url: '/api/v1/admin/update/' + id,
      method: 'post',
      data
    })
  },
  details: function(id) {
    return request({
      url: '/api/v1/admin/details/' + id,
      method: 'get'
    })
  },
  reset: function(id, data) {
    return request({
      url: '/api/v1/admin/reset/password/' + id,
      method: 'post',
      data
    })
  }
}
