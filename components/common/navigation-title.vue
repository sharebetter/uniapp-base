<template>
  <view :style="styles">
    <view class="status-title" :style="{ height: statusBarHeight + 'px' }" />
    <view class="navigation-title" :style="{ height: navigationBarHeight + 'px' }">
		<text class="title">{{title}}</text>
	</view>
  </view>
</template>

<script>
export default {
  props: {
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
        background: #1440A2;
        width: 100%;
        z-index: 99;
      `;
    }
  }
};
</script>

<style lang="scss" scoped>
.navigation-title {
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
