import request from '@/utils/request'

/**
 * 数据统计
 */
export default {
  home: function(data) {
    return request({
      url: '/api/v1/statistic/home',
      method: 'get'
    })
  }
}
