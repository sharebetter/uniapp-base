module.exports = {
  showLoading(text) {
    uni.showLoading({
      title: text || '加载中',
      mask: true
    })
  },
  hideLoading() {
    uni.hideLoading()
  }
}
