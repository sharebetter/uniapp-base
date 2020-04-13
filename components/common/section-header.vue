<template>
  <view class="section-header">
    <image class="indicator" src="/static/common/icon-common-session-header-indicator.png"></image>
    <text class="title">{{ title }}</text>
    <slot></slot>
  </view>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  }
};
</script>

<style lang="scss" scoped>
.section-header {
  padding: 0 30upx;
  display: flex;
  height: 88upx;
  align-items: center;
  justify-content: space-between;
  .indicator {
    width: 8upx;
    height: 32upx;
  }
  .title {
    flex: 1;
    margin: 0 16upx;
    font-size: 32upx;
    font-weight: bold;
    color: #161515;
  }
}
</style>
