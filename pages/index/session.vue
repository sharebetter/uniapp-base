<template>
  <view class="session">
    <view class="header">
      <image class="banner" :src="banner"></image>
      <view class="filters">
        <view v-if="showsAreaPicker" class="area" @click="handleAreaPickerClick">
          <text>{{ areas[selectedAreaIndex].name }}</text>
          <image src="../../static/index/icon-index-arrow.png"></image>
        </view>
        <view class="search-bar">
          <input type="text" placeholder="请输入关键字" v-model="keyword" confirm-type="search" @confirm="handleSearch" @focus="handleInputFocus" />
          <image v-if="keyword" src="/static/index/icon-index-clear-input.png" mode="center" @click="handleClearInput"></image>
          <image v-else src="/static/index/icon-index-search.png"></image>
        </view>
      </view>
    </view>
    <view class="list">
      <view class="item" v-for="(item, index) in list" :key="index" @click="handleItemClick(item.ACB200)">
        <view class="content">
          <view class="row">
            <text class="name">{{ item.ACA112 }}</text>
            <text class="salary">{{ item.ACB241 }}</text>
          </view>
          <view class="row">
            <text class="company">{{ item.AAB004 || item.AAB001 }}</text>
            <text class="number">招聘人数：{{ item.ACB240 }}</text>
          </view>
          <view class="row">
            <text class="city">{{ item.AAB302 }}</text>
          </view>
        </view>
      </view>
    </view>
    <uni-load-more :status="status"></uni-load-more>
    <uni-popup ref="popup" type="top">
      <view class="popup area-filter">
        <view class="column">
          <text v-for="(item, index) in areas" :key="index" :class="index === selectedAreaIndex ? 'highlight' : ''" @click="handleAreaClick(index)">{{ item.name }}</text>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script>
import { uniPopup, uniLoadMore } from '@dcloudio/uni-ui';
export default {
  components: {
    uniPopup,
    uniLoadMore
  },
  data() {
    return {
      // 顶部 banner
      banner: '',
      // 专场名称
      session: 'jinjingji',
      // 专场代码
      sessionCode: '',
      // 是否显示地区 picker
      showsAreaPicker: false,
      // 是否正在显示地区 picker
      isShowingAreaPicker: false,
      // 选中的地区下标
      selectedAreaIndex: 0,
      // 关键字
      keyword: '',
      // 上一次搜索的关键字
      lastedKeyword: '',
      // 页码
      page: 1,
      // 数据列表
      list: [],
      // 上拉加载状态
      status: 'noMore'
    };
  },
  computed: {
    // 所有可选的工种岗位列表
    areas() {
      return require('../../data/areas.js').areas[this.session];
    }
  },
  onLoad(e) {
    this.banner = `/static/index/banner-index-${e.session}-session.png`;
    switch (e.session) {
      case 'graduates':
        this.$uni.setTitle('高校毕业生招聘专场');
        this.showsAreaPicker = false;
        this.sessionCode = 'GX';
        break;
      case 'migrant-workers':
        this.$uni.setTitle('农民工招聘专场');
        this.showsAreaPicker = false;
        this.sessionCode = 'NMG';
        break;
      case 'unemployed-personnel':
        this.$uni.setTitle('城镇失业人员招聘专场');
        this.showsAreaPicker = false;
        this.sessionCode = 'CZ';
        break;
      case 'poverty-labour':
        this.$uni.setTitle('贫困劳动力招聘专场');
        this.showsAreaPicker = false;
        this.sessionCode = 'PK';
        break;
      case 'zhusanjiao':
        this.$uni.setTitle('珠三角招聘专场');
        this.showsAreaPicker = true;
        this.session = e.session;
        this.sessionCode = 'ZSJ';
        break;
      case 'zhongbu':
        this.$uni.setTitle('中部招聘专场');
        this.showsAreaPicker = true;
        this.session = e.session;
        this.sessionCode = 'ZB';
        break;
      case 'sanqusanzhou':
        this.$uni.setTitle('三区三州招聘专场');
        this.showsAreaPicker = true;
        this.session = e.session;
        this.sessionCode = 'SQSZ';
        break;
      case 'yuegangao':
        this.$uni.setTitle('粤港澳大湾区招聘专场');
        this.showsAreaPicker = true;
        this.session = e.session;
        this.sessionCode = 'YGA';
        break;
      case 'hubei':
        this.$uni.setTitle('湖北招聘专场');
        this.showsAreaPicker = true;
        this.session = e.session;
        this.sessionCode = 'HB';
        break;
      case 'jinjingji':
        this.$uni.setTitle('京津冀招聘专场');
        this.showsAreaPicker = true;
        this.session = e.session;
        this.sessionCode = 'JJJ';
        break;
      case 'pinkunxian':
        this.$uni.setTitle('52个贫困县招聘专场');
        this.showsAreaPicker = true;
        this.session = e.session;
        this.sessionCode = 'PKZC';
        break;
      case 'changsanjiao':
        this.$uni.setTitle('长三角招聘专场');
        this.showsAreaPicker = true;
        this.session = e.session;
        this.sessionCode = 'CSJ';
        break;
      case 'dongbei':
        this.$uni.setTitle('东北招聘专场');
        this.showsAreaPicker = true;
        this.session = e.session;
        this.sessionCode = 'DB';
        break;
      default:
        break;
    }

    this.requestData();
  },
  onPullDownRefresh() {
    // 下拉刷新数据
    uni.stopPullDownRefresh();
    this.page = 1;
    this.requestData();
  },
  onReachBottom() {
    // 无更多数据时返回
    if (this.status === 'noMore') return;
    this.page += 1;
    this.requestData();
  },
  methods: {
    handleInputFocus() {
      this.$refs.popup.close();
    },
    // 响应清空输入内容点击事件
    handleClearInput() {
      this.keyword = '';
      if (this.lastedKeyword !== '') this.handleSearch();
    },
    handleSearch() {
      this.page = 1;
      this.requestData();
      this.$refs.popup.close();
    },
    handleAreaPickerClick() {
      if (this.isShowingAreaPicker) {
        this.$refs.popup.close();
        this.isShowingAreaPicker = false;
      } else {
        this.$refs.popup.open();
        this.isShowingAreaPicker = true;
      }
    },
    // 响应地区选择事件
    handleAreaClick(index) {
      this.isShowingAreaPicker = false;
      this.selectedAreaIndex = index;
      this.$refs.popup.close();
      this.requestData();
    },
    // 请求数据
    requestData() {
      this.status = 'loading';
      this.$api.getSessionJobList({
        data: {
          GJ: this.sessionCode,
          job: this.keyword,
          diqu: this.areas[this.selectedAreaIndex].name,
          pageNo: this.page,
          pageSize: 10
        },
        success: data => {
          this.lastedKeyword = this.keyword;

          if (this.page === 1) {
            this.list = data.list;
          } else {
            this.list = this.list.concat(data.list);
          }

          if (!data.list || data.list.length < 10) {
            this.status = 'noMore';
          } else {
            this.status = 'more';
          }
        },
        fail: () => {
          this.status = 'noMore';
        },
        complete: () => {
          if (this.status === 'loading') this.status = 'more';
        }
      });
    },
    // 响应岗位点击事件
    handleItemClick(id) {
      uni.navigateTo({
        url: `job-detail?id=${id}`
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.session {
  .header {
    position: fixed;
    background: white;
    z-index: 999;
    .banner {
      width: 750upx;
      height: 138upx;
    }
    .filters {
      padding: 0 30upx;
      display: flex;
      align-items: center;
      height: 88upx;
      border-bottom: 2upx solid #e5e5e5;
      .area {
        width: 128upx;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 28upx;
        color: #292626;
        text {
        }
        image {
          margin-left: 16upx;
          width: 20upx;
          height: 14upx;
        }
      }
      .search-bar {
        flex: 1;
        padding: 0 30upx;
        height: 72upx;
        background: #f7f7f7;
        border-radius: 8upx;
        display: flex;
        align-items: center;
        justify-content: space-between;
        input {
          flex: 1;
          font-size: 26upx;
          color: #292626;
          /* #ifdef MP-ALIPAY */
          background: #f7f7f7;
          /* #endif */
        }
        image {
          margin-left: 16upx;
          width: 36upx;
          height: 36upx;
        }
      }
    }
  }
  .list {
    padding-top: 226upx;
    .item {
      padding: 30upx;
      height: 158upx;
      .row {
        height: 50upx;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .name {
          font-size: 32upx;
          font-weight: bold;
          color: #292626;
        }
        .salary {
          font-size: 32upx;
          color: #4077f4;
        }
        .company,
        .number {
          font-size: 24upx;
          color: #a1a1a1;
        }
        .city {
          background: #f7f7f7;
          font-size: 20upx;
          color: #a1a1a1;
          padding: 8upx 16upx;
        }
      }
    }
    .item:not(:last-child) {
      border-bottom: 8upx solid #f8f8f8;
    }
  }
  .popup {
    position: relative;
    margin-top: 238upx;
    width: 750upx;
    height: 450upx;
    background: white;
    border-radius: 0 0 40upx 40upx;
  }
  .area-filter {
    display: flex;
    .column {
      padding: 0 30upx;
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow-y: scroll;
      text {
        line-height: 64upx;
        font-size: 28upx;
        color: #6f6f6f;
        text-align: center;
      }
      .highlight {
        color: #4077f4;
      }
    }
    .separator {
      margin: 16upx 0;
      width: 2upx;
      height: calc(100% - 32upx);
      background: #e7e7e7;
    }
  }
}
</style>
