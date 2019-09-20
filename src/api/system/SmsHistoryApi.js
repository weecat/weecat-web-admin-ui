import request from '@/utils/request'

export default {
  list: function(data) {
    return request({
      url: '/api/v1/sms/list',
      method: 'post',
      data
    })
  }
}
