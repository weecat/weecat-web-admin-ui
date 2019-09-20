import request from '@/utils/request'

/**
 * 构建索引
 */
export default {
  build: function(data) {
    return request({
      url: '/api/v1/search/build',
      method: 'post',
      data
    })
  }
}
