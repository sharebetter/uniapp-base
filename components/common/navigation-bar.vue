<template>
  <view :style="styles">
    <view class="status-bar" :style="{ height: statusBarHeight + 'px' }" />
    <view class="navigation-bar" :style="{ height: navigationBarHeight + 'px' }">
		<text class="title">{{title}}</text>
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
    },
	title: {
		type: String,
		default: '首页'
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
        background: rgba(20, 64, 162, ${this.alpha});
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
  .title {
	width: 100%;
	font-weight:500;
    font-size: 16px;
    color: white;
	text-align: center;
  }
}
</style>
