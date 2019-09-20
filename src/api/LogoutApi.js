import request from '@/utils/request'

export default {
  logout: function(token) {
    return request({
      url: '/api/v1/logout',
      method: 'post'
    })
  }
}
