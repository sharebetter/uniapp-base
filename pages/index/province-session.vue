<template>
  <view class="province-session">
    <text class="title">各省分会场</text>
    <text class="tips">点击省份进入相应分会场</text>
    <view class="list">
      <text v-for="(item, index) in provinces" :key="index">{{ item.name | provinceFilter }}</text>
    </view>
  </view>
</template>

<script>
export default {
  filters: {
    provinceFilter(value) {
      if (value.indexOf('市') !== -1 || value.indexOf('省') !== -1) {
        return value.substring(0, value.length - 1);
      } else if (value.indexOf('内蒙古') !== -1) {
        return '内蒙古';
      } else if (value.indexOf('广西') !== -1) {
        return '广西';
      } else if (value.indexOf('西藏') !== -1) {
        return '西藏';
      } else if (value.indexOf('宁夏') !== -1) {
        return '宁夏';
      } else if (value.indexOf('新疆') !== -1) {
        return '新疆';
      } else {
        return value;
      }
    }
  },
  data() {
    return {
      provinces: require('../../data/cities.js').cities.filter(item => item.name.indexOf('生产建设兵团') === -1)
    };
  }
};
</script>

<style lang="scss" scoped>
.province-session {
  padding: 0 30upx;
  display: flex;
  flex-direction: column;
  .title {
    margin: 16upx 0;
    font-size: 36upx;
    font-weight: bold;
    color: #292626;
  }
  .tips {
    font-size: 24upx;
    color: #4077f4;
  }
  .list {
    margin-top: 30upx;
    display: flex;
    flex-wrap: wrap;
    text {
      margin-right: 22upx;
      margin-bottom: 22upx;
      width: 156upx;
      height: 68upx;
      line-height: 68upx;
      text-align: center;
      background: #f7f7f7;
      border-radius: 8upx;
      font-size: 24upx;
      color: #373737;
    }
    text:nth-child(4n) {
      margin-right: 0;
    }
  }
}
</style>
