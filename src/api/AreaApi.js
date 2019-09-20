import request from '@/utils/request'

export default{
  list: function() {
    return request({
      url: '/api/v1/area/list',
      method: 'get'
    })
  }
}
