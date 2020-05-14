import Vue from 'vue'
import App from './App'
import './common/utils/util'
import './utilities/uni'
import './apis/index'

Vue.config.productionTip = false

App.mpType = 'app'

Vue.filter('dataSlice', (date) => {
  if (date) {
  	return date.slice(0, 10)
  } else {
  	return ''
  }
})

const app = new Vue({
  ...App
})

app.$mount()
