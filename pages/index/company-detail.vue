<template>
  <view class="company-detail">
    <view class="section">
      <text class="title">{{ info.aab004 }}</text>
      <text class="text" v-if="info.aab022 !== '0000'">所属行业：{{ info.aab022 | type }}</text>
      <text class="text" v-if="info.aae006">单位地址：{{ info.aae006 }}</text>
    </view>
    <view class="section">
      <text class="title">联系方式</text>
      <text class="text">联系人：{{ info['cb20_aae004'] }}</text>
      <text class="text">联系电话：{{ info['cb20_aae005'] }}</text>
    </view>
    <view class="section" v-if="info.aab092">
      <text class="title">单位简介</text>
      <text class="text">单位简介：{{ info.aab092 }}</text>
    </view>
  </view>
</template>

<script>
export default {
  filters: {
    type(value) {
      const list = require('../../data/company-types.js').types;
      return list.reduce((result, item) => {
        result[item.aaa102] = item.aaa103;
        return result;
      }, {})[value];
    }
  },
  data() {
    return {
      info: {}
    };
  },
  onLoad(e) {
    this.info = JSON.parse(e.info);
  }
};
</script>

<style lang="scss" scoped>
.company-detail {
  .section {
    padding: 30upx;
    display: flex;
    flex-direction: column;
    .title {
      margin: 16upx 0;
      font-size: 36upx;
      color: #292626;
    }
    .text {
      margin: 8upx 0;
      font-size: 28upx;
      color: #666666;
      line-height: 44upx;
    }
  }
  .section:not(:last-child) {
    border-bottom: 8upx solid #f8f8f8;
  }
}
</style>
