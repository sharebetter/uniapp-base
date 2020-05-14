import uniapp from './uni.js'
import {
  md5
} from '../common/utils/md5'
import {
  showLoading,
  hideLoading
} from '../common/utils/loading'
const request = function({
  url,
  method = 'POST',
  data = {},
  showsLoading = true,
  success = () => {},
  fail = () => {},
  complete = () => {}
}) {
  if (showsLoading) uniapp.showLoading('加载中...')

  // 配置请求数据
  // const baseURL = 'https://tst-contentapi.jjshebao.com/apiPolicy/api/'
  const baseURL = 'https://contentapi.jjshebao.com/apiPolicy/api/'
  const token = uni.getStorageSync('userInfo') && uni.getStorageSync('userInfo').token
  const timestamp = new Date().getTime()
  let headers = {}
  headers['Accept'] = 'application/json'
  headers['Content-Type'] = 'application/json'
  headers['Timestamp'] = timestamp
  headers['appliance'] = 'human_society' || 'medical_insure'
  headers['version'] = 'v1.1.3'
  // 医保
  // headers['appliance'] = 'medical_insure'
  if (token) {	 
	let requestKey = 'ashin8886826$aksiy^^key2019'
	headers['token'] = token
	headers['sign'] = md5(timestamp + token + requestKey)
  }
  uni.request({
    url: baseURL + url,
    method: method,
    header: headers,
    data: data,
    success: (res) => {
	  if (showsLoading) hideLoading()
      if (res.statusCode === 200) {		
		if (res.data.resultCode === -1) {
			uni.removeStorageSync('userInfo')
			uni.showToast({
			  title: '授权状态已过期，请重新授权',
			  icon: 'none',
			  mask: true
			});
			setTimeout(() => {
			  uni.navigateTo({
			    url: '/pages/login/index'
			  })
			}, 1000)
		} if (res.data.resultCode === 1) {			
			success(res.data.resultBody)
		} else {
			fail(res.data)
		}
      } else {
        fail(res.data)
      }
    },
    fail: (err) => {
	  if (showsLoading) hideLoading()
      fail(err)
    },
    complete: () => {
      if (showsLoading) hideLoading()
      complete()
    }
  })
}

module.exports = request
