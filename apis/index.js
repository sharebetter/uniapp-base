import Vue from 'vue'
import request from '../utilities/request.js'

Vue.prototype.$api = {
  // 微信登录
  login: (config) => request({
  	  url: `policy/decriptPhoneAndLogin`,
  	  ...config
  }),
  getIndexInfo: (config) => request({
    // #ifdef MP-WEIXIN
    url: '/getServiceMenuList',
    // #endif
    // #ifdef MP-ALIPAY
    url: '/getServiceMenuListZFB',
    // #endif
    ...config
  }),
  getAreaList: (config) => request({
    url: 'policy/getAreaList',
    ...config
  }),
  getPolicyIndex: (config) => request({
    url: 'policy/index',
    ...config
  }),
  policyQuery: (config) => request({
    url: 'policy/query',
    ...config
  }),
  advanceQuery: (config) => request({
    url: 'policy/advanceQuery',
    ...config
  }),
  enterAdvanceQuery: (config) => request({
    url: 'policy/enterAdvanceQuery',
    ...config
  }),
  policyText: (config) => request({
    url: 'policy/text',
    ...config
  }),
  updateCollection: (config) => request({
    url: 'policy/updateCollection',
    ...config
  }),
  thematicList: (config) => request({
    url: 'thematic/list',
    ...config
  }),
  thematicZone: (config) => request({
    url: 'thematic/zone',
    ...config
  }),
  userUserMessage: (config) => request({
    url: 'user/userMessage',
    ...config
  }),
  userFavorite: (config) => request({
    url: 'user/favorite',
    ...config
  }),
  updateEmail: (config) => request({
    url: 'user/updateEmail',
    ...config
  }),
}
