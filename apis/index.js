import Vue from 'vue'
import request from '../utilities/request.js'

Vue.prototype.$api = {
  getIndexInfo: (config) => request({
    // #ifdef MP-WEIXIN
    url: '/getServiceMenuList',
    // #endif
    // #ifdef MP-ALIPAY
    url: '/getServiceMenuListZFB',
    // #endif
    ...config
  }),
  getJobList: (config) => request({
    url: '/gwdwList',
    ...config
  }),
  getJobDetail: (config) => request({
    url: '/gwdwDetail',
    ...config
  }),
  getSessionJobList: (config) => request({
    url: '/Jobinfolist',
    ...config
  })
}
