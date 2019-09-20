import request from '@/utils/request'

/**
 * app升级管理
 */
export default {
  list: function(data) {
    return request({
      url: '/api/v1/app/list',
      method: 'post',
      data
    })
  },
  details: function(id) {
    return request({
      url: '/api/v1/app/details/' + id,
      method: 'get'
    })
  },
  getVersions: function(id, data) {
    return request({
      url: '/api/v1/app/' + id + '/versions',
      method: 'post',
      data
    })
  },
  update: function(id, data) {
    return request({
      url: '/api/v1/app/update/' + id,
      method: 'post',
      data
    })
  },
  getOssConfig: function() {
    return request({
      url: '/api/v1/app/getOssConfig',
      method: 'get'
    })
  },
  publish: function(id, data) {
    return request({
      url: '/api/v1/app/' + id + '/publish',
      method: 'post',
      data
    })
  },
  release: function(id, data) {
    return request({
      url: '/api/v1/app/' + id + '/release',
      method: 'post',
      data
    })
  }
}
