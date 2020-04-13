<template>
  <view :style="styles">
    <view class="status-bar" :style="{ height: statusBarHeight + 'px' }" />
    <view class="navigation-bar" :style="{ height: navigationBarHeight + 'px' }">
      <image class="logo" src="/static/logo.png" />
      <text class="title">中国公共招聘网</text>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    alpha: {
      type: Number,
      default: 0,
      validator: value => value >= 0 && value <= 1
    }
  },
  data() {
    return {
      statusBarHeight: uni.getSystemInfoSync().statusBarHeight,
      navigationBarHeight: 44 + (uni.getSystemInfoSync().system.toLowerCase().indexOf('ios') === -1 ? 2: 0)
    };
  },
  computed: {
    styles() {
      return `
        position: fixed;
        background: rgba(0, 122, 255, ${this.alpha});
        transition: all 1s;
        width: 100%;
        z-index: 999;
      `;
    }
  }
};
</script>

<style lang="scss" scoped>
.navigation-bar {
  display: flex;
  align-items: center;
  .logo {
    margin: 0 8px 0 15px;
    width: 20px;
    height: 20px;
  }
  .title {
    font-size: 14px;
    color: white;
  }
}
</style>
