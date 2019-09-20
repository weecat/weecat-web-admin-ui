import request from '@/utils/request'

export default {
  login: function(data) {
    return request({
      url: '/api/v1/login',
      method: 'post',
      data
    })
  }
}
