import request from '@/utils/request'

export default {
  list: function() {
    return request({
      url: '/api/v1/role/list',
      method: 'post'
    })
  },
  getAuthority: function() {
    return request({
      url: '/api/v1/role/authority',
      method: 'get'
    })
  },
  createAuthority: function(data) {
    return request({
      url: '/api/v1/role/authority/create',
      method: 'post',
      data
    })
  },
  updateAuthority: function(data) {
    return request({
      url: '/api/v1/role/authority/update',
      method: 'post',
      data
    })
  },
  create: function(data) {
    return request({
      url: '/api/v1/role/create',
      method: 'post',
      data
    })
  },
  update: function(id, data) {
    return request({
      url: '/api/v1/role/update/' + id,
      method: 'post',
      data
    })
  },
  details: function(id) {
    return request({
      url: '/api/v1/role/details/' + id,
      method: 'get'
    })
  },
  delete: function(id) {
    return request({
      url: '/api/v1/role/delete/' + id,
      method: 'delete'
    })
  }
}
