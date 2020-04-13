module.exports = {
  showModal(text, showCancel = false, {
    title = '提示',
    confirmText = '确定',
    cancelText = '取消',
    confirm = () => {},
    cancel = () => {}
  } = {}) {
    uni.showModal({
      title: title,
      content: text,
      showCancel: showCancel,
      cancelColor: '#808080',
      cancelText: cancelText,
      confirmColor: '#177ee6',
      confirmText: confirmText,
      success: res => {
        if (res.confirm) {
          confirm()
        } else {
          cancel()
        }
      }
    })
  }
}
