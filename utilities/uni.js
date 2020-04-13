import Vue from 'vue'

const uniapp = {
  /**
   * 封装 uni.showToast
   * @param {*} toast toast 信息
   */
  showToast(toast) {
    const object = typeof toast === 'string' ? {
      title: toast
    } : typeof toast === 'object' ? toast : {}
    if (!object.title) return
    uni.showToast({
      title: object.title,
      icon: object.icon || 'none',
      image: object.image,
      mask: object.mask || true,
      duration: object.duration || 1500
    })
  },
  /**
   * 封装 uni.hideToast
   */
  hideToast() {
    uni.hideToast()
  },
  /**
   * 封装 uni.showLoading
   * @param {*} loading loading 信息
   */
  showLoading(loading) {
    const object = typeof loading === 'string' ? {
      title: loading
    } : typeof loading === 'object' ? loading : {
      title: ''
    }
    uni.showLoading({
      title: object.title,
      mask: object.mask || true
    })
  },
  /**
   * 封装 uni.hideLoading
   */
  hideLoading() {
    uni.hideLoading()
  },
  /**
   * 封装 uni.showModal 实现 alert 弹窗
   * @param {*} alert alert 信息
   */
  showAlert(alert) {
    const object = typeof alert === 'string' ? {
      content: alert
    } : typeof alert === 'object' ? alert : {}
    if (!object.content) return
    uni.showModal({
      title: object.title || '提示',
      content: object.content,
      showCancel: false,
      confirmText: object.text || '确定',
      confirmColor: object.color || '#4077f5',
      success: res => {
        if (res.confirm && object.confirm) object.confirm()
      }
    })
  },
  /**
   * 封装 uni.showModal 实现 confirm 弹窗
   * @param {*} confirm confirm 信息
   */
  showConfirm(confirm) {
    if (typeof confirm !== 'object' || !confirm.content || !confirm.confirm) return
    uni.showModal({
      title: confirm.title || '提示',
      content: confirm.content,
      showCancel: true,
      cancelText: confirm.cancelText || '取消',
      cancelColor: confirm.cancelColor || '#666666',
      confirmText: confirm.confirmText || '确定',
      confirmColor: confirm.confirmColor || '#4077f5',
      success: res => {
        if (res.confirm) {
          confirm.confirm()
        } else if (res.cancel && confirm.cancel) {
          confirm.cancel()
        }
      }
    })
  },
  /**
   * 封装 uni.showActionSheet
   * @param {*} action action sheet 信息
   */
  showActionSheet(action) {
    if (typeof action !== 'object' || !action.items || !action.confirm) return
    uni.showActionSheet({
      itemList: action.items,
      itemColor: action.color || '#000000',
      success: res => {
        action.confirm(res.tapIndex)
      }
    })
  },
  /**
   * 封装 uni.setNavigationBarTitle
   * @param {*} title 导航栏标题
   */
  setTitle(title) {
    uni.setNavigationBarTitle({
      title: title
    })
  }
}

Vue.prototype.$uni = uniapp

module.exports = uniapp
