<template>
  <view class="job-detail" v-show="info.aca112">
    <view class="section">
      <text class="text">招聘人数：{{ info.acb240 }}</text>
      <text class="title">{{ info.aca112 }}</text>
      <text class="text">{{ info.aab302 }} 学历要求：{{ info.aac011 | education }}</text>
      <text class="salary">{{ info.acb241 }}-{{ info.acb242 }}</text>
    </view>
    <view class="section" style="flex-direction: row; align-items: center; justify-content: space-between;" @click="handleCompanyClick">
      <view class="info">
        <text class="title">{{ info.aab004 }}</text>
        <text class="text" v-if="info.aae006">{{ info.aae006 }}</text>
      </view>
      <image src="/static/index/icon-index-arrow.png"></image>
    </view>
    <view class="section" v-if="info.acb22a">
      <text class="title">岗位要求</text>
      <text class="text" :class="!showsDetail && info.acb22a.length > 100 ? 'hide-detail' : ''">{{ info.acb22a }}</text>
      <button v-if="info.acb22a.length > 100" class="see-more" @click="showsDetail = !showsDetail">{{showsDetail ? '点击收起' : '展开更多'}}</button>
    </view>
    <view class="section">
      <text class="title">联系方式</text>
      <text v-if="info['cb20_aae004']" class="text">联系人：{{ info['cb20_aae004'] }}</text>
      <text v-if="info['cb20_aae005']" class="text">固定电话：{{ info['cb20_aae005'] }}</text>
      <text v-if="info.aae159" class="text">邮箱：{{ info.aae159 }}</text>
    </view>
  </view>
</template>

<script>
export default {
  filters: {
    education(value) {
      const list = {
        '11': '博士研究生',
        '14': '硕士研究生',
        '21': '大学本科',
        '31': '大学专科',
        '41': '中等专科',
        '44': '职业高中',
        '47': '技工学校',
        '61': '普通高中',
        '71': '初中',
        '81': '小学',
        '90': '其他'
      };
      return list[value] || '不限';
    }
  },
  data() {
    return {
      info: {},
      showsDetail: false
    };
  },
  onLoad(e) {
    this.$api.getJobDetail({
      data: { Acb200: e.id },
      success: data => {
        this.info = data;
      }
    });
  },
  methods: {
    handleCompanyClick() {
      uni.navigateTo({
        url: `company-detail?info=${JSON.stringify(this.info)}`
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.job-detail {
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
      margin: 12upx 0;
      font-size: 28upx;
      color: #666666;
      line-height: 32upx;
    }
    .salary {
      font-size: 36upx;
      color: #4077f4;
    }
    .see-more {
      margin-left: auto;
      width: 100upx;
      height: 34upx;
      line-height: 34upx;
      font-size: 24upx;
      color: #4077f4;
    }
    .hide-detail {
      display: -webkit-box;
      overflow: hidden;
      text-overflow: ellipsis;
      word-wrap: break-word;
      white-space: normal !important;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }
    .info {
      display: flex;
      flex-direction: column;
    }
    image {
      width: 24upx;
      height: 14upx;
      transform: rotate(-90deg);
    }
  }
  .section:not(:last-child) {
    border-bottom: 8upx solid #f8f8f8;
  }
}
</style>
