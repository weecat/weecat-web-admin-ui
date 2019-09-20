import request from '@/utils/request'

export default {
  getUserInfo: function() {
    return request({
      url: '/api/v1/account/info',
      method: 'get'
    })
  }
}
