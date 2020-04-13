import config from '../../config'
import {
  md5
} from '../utils/md5'
import {
  showLoading,
  hideLoading
} from '../utils/loading'

export const request = function(url, parameters, {
  showsLoading = true,
  success = () => {},
  fail = () => {},
  complete = () => {}
}) {
  // 配置请求数据
  const token = uni.getStorageSync('token')
  const timestamp = new Date().getTime()
  let headers = {}
  headers['Accept'] = 'application/json'
  headers['Content-Type'] = 'application/json'
  headers['Timestamp'] = timestamp
  headers['token'] = token
  headers['sign'] = md5(timestamp + token + config.requestKey)

  if (showsLoading) showLoading()
  showStartLog(config.baseURL + url, headers, parameters)

  uni.request({
    url: config.baseURL + url,
    method: 'POST',
    header: headers,
    data: parameters,
    success: res => {
      if (showsLoading) hideLoading()
      uni.stopPullDownRefresh()
      showResponseLog(config.baseURL + url, res)
      if (res.statusCode === 200 && res.data.success) {
        success(res.data.resultBody)
      } else {
        fail(res.data)
      }
    },
    fail: error => {
      if (showsLoading) hideLoading()
      uni.stopPullDownRefresh()
      fail(error)
    },
    complete: () => {
      complete()
    }
  })
}

function showStartLog(url, headers, parameters) {
  // 仅在测试环境下输出日志
  if (process.env.NODE_ENV !== 'development') return

  console.groupCollapsed(`%c Request %c ${url.replace('https://', '')} `,
    'font-size: 12px; background: #27B3EB; padding: 1px; border-radius: 3px 0 0 3px; color: #fff;',
    'font-size: 12px; background: #66D9FC; padding: 1px; border-radius: 0 3px 3px 0; color: #fff;'
  )
  console.log(`%cURL: %c${url}`, 'font-size: 12px; font-weight: bold;', 'font-size: 12px; font-weight: normal;')
  console.log(`%cMethod: %cPOST`, 'font-size: 12px; font-weight: bold;', 'font-size: 12px; font-weight: normal;')
  console.log(`%cHeaders:`, 'font-size: 12px; font-weight: bold;')
  console.table(headers)
  console.log(`%cBody:`, 'font-size: 12px; font-weight: bold;')
  console.table(parameters)
  console.groupEnd()
}

function showResponseLog(url, response) {
  if (response.statusCode === 200) {
    if (response.data.success) {
      console.groupCollapsed(`%c Response %c ${url.replace('https://', '')} `,
        'font-size: 12px; background: #41b883; padding: 1px; border-radius: 3px 0 0 3px; color: #fff;',
        'font-size: 12px; background: #4AE6A8; padding: 1px; border-radius: 0 3px 3px 0; color: #fff;'
      )
      console.log(response.data.resultBody)
      console.groupEnd()
    } else {
      console.group(`%c Response %c ${url.replace('https://', '')} `,
        'font-size: 12px; background: #CFC169; padding: 1px; border-radius: 3px 0 0 3px; color: #fff;',
        'font-size: 12px; background: #E3D67E; padding: 1px; border-radius: 0 3px 3px 0; color: #fff;'
      )
      console.warn(`错误码: ${response.data.resultCode}`)
      console.warn(`错误提示: ${response.data.resultMsg}`)
      console.groupEnd()
    }
  } else {
    console.group(`%c Response %c ${url.replace('https://', '')} `,
      'font-size: 12px; background: #FA531B; padding: 1px; border-radius: 3px 0 0 3px; color: #fff;',
      'font-size: 12px; background: #FA8954; padding: 1px; border-radius: 0 3px 3px 0; color: #fff;'
    )
    console.error(`Status Code: ${response.statusCode}`)
    console.error(`Message: ${response.data.error}`)
    console.groupEnd()
  }
}
