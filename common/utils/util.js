import Vue from 'vue'
import loading from './loading'
import toast from './toast'
import modal from './modal'
import validate from './validate'
import filter from './filter'
import './dateExtension'

Vue.prototype.$util = Object.assign(
  loading,
  toast,
  modal,
  validate,
  filter
)
