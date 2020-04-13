import uniapp from './uni.js'

const request = function({
  url,
  method = 'get',
  headers = {},
  data = {},
  showsLoading = true,
  success = () => {},
  fail = () => {},
  complete = () => {}
}) {
  if (showsLoading) uniapp.showLoading('加载中...')

  const baseURL = 'https://www.12333.gov.cn/cjobs'

  uni.request({
    url: baseURL + url,
    method: method,
    header: headers,
    data: data,
    success: (res) => {
      if (res.statusCode === 200 && res.data.bizSuccess) {
        success(res.data.data)
      } else {
        fail()
      }
    },
    fail: (err) => {
      fail()
    },
    complete: () => {
      if (showsLoading) uniapp.hideLoading()
      complete()
    }
  })
}

module.exports = request
