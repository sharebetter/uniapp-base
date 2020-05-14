let baseURL = ''
let requestKey = ''

if (process.env.NODE_ENV === 'development') {
  // baseURL = 'https://fuwu.jjshebao.com/ydjy/api'
  baseURL = 'https://fuwu.jjshebao.com/test/ydjy/api'
  // baseURL = 'https://chenshangyue.picp.vip/ydjy/api'
  // baseURL = 'https://ydjy-tst.jjshebao.com/ydjy/api'
  requestKey = 'guodumnci%$#*dkdjuehdl&&&&'
} else {
  baseURL = 'https://fuwu.jjshebao.com/ydjy/api'
  requestKey = 'guodumnci%$#*dkdjuehdl&&&&'
}

const config = {
  baseURL,
  requestKey,
  bmapAK: 'edTx5b9tjNMkH0Cc2ltAqx1zGDAVWtKG'
}

module.exports = config
