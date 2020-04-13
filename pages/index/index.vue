<template>
  <view class="content">
    <navigation-bar :alpha="alpha"></navigation-bar>
    <image class="banner" src="/static/index/banner-index-header.png"></image>
    <swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="500" :circular="true">
      <swiper-item v-for="(item, index) in info.zpzcList" :key="index" @click="handleBannerClick(item)"><image class="swiper-item" :src="item.pic"></image></swiper-item>
    </swiper>
    <view class="session-title">{{ info.zpzcList[0].time || '' }} 招聘专项行动时间安排</view>
    <view class="session-content">
      <view class="sessions">
        <text v-for="(item, index) in info.zpzcList" :key="index" @click="handleBannerClick(item)">{{ item.serviceName }}</text>
      </view>
      <image class="trumpet" src="/static/index/icon-index-trumpet.png"></image>
    </view>
    <view class="sessions">
      <image src="/static/index/image-index-graduates-session.png" @click="handleSessionClick(0)"></image>
      <image src="/static/index/image-index-migrant-workers-session.png" @click="handleSessionClick(1)"></image>
      <image src="/static/index/image-index-unemployed-personnel-session.png" @click="handleSessionClick(2)"></image>
      <image src="/static/index/image-index-poverty-labour-session.png" @click="handleSessionClick(3)"></image>
      <image class="area-session" src="/static/index/image-index-area-session.png" @click="handleAreaSessionClick"></image>
      <!-- <view class="entrance">
        <text>各省分会场</text>
        <image src="/static/index/icon-index-province-session.png"></image>
        <button @click="handleProvinceSessionClick">查看</button>
      </view>
      <view class="entrance">
        <text>区域专场</text>
        <image src="/static/index/icon-index-area-session.png"></image>
        <button @click="handleAreaSessionClick">查看</button>
      </view> -->
    </view>
    <view class="newest-jobs">
      <section-header title="最新岗位"></section-header>
      <view class="search-bar" @click="handleSearchBarClick">
        <text>请输入关键字</text>
        <image src="/static/index/icon-index-search.png"></image>
      </view>
      <view class="keywords">
        <text @click="handleHotJobClick('教师')">教师</text>
        <text @click="handleHotJobClick('行政办公')">行政办公</text>
        <text @click="handleHotJobClick('财会人员')">财会人员</text>
        <text @click="handleHotJobClick('会计')">会计</text>
        <text @click="handleHotJobClick('护士')">护士</text>
        <text @click="handleHotJobClick('计算机专业')">计算机专业</text>
        <text @click="handleHotJobClick('实习')">实习</text>
        <text @click="handleHotJobClick('建筑工程师')">建筑工程师</text>
        <text @click="handleHotJobClick('中学教师')">中学教师</text>
        <text @click="handleHotJobClick('科研人员')">科研人员</text>
      </view>
    </view>
    <!-- <view class="video-class" v-if="info.spktList && info.spktList.length > 0">
      <section-header title="视频课堂"><button class="see-more">查看更多</button></section-header>
      <view class="videos">
        <view class="video" v-for="(item, index) in info.spktList" :key="index" @click="handleVideoClick(item)">
          <image :src="item.pic"></image>
          <text>{{ item.serviceName }}</text>
          <image class="play" src="../../static/index/icon-index-play.png" mode="center"></image>
        </view>
      </view>
    </view> -->
    <view class="participated-organizations" v-if="info.cyjgList && info.cyjgList.length > 0">
      <section-header title="参与机构"></section-header>
      <view class="organizations">
        <image v-for="(item, index) in info.cyjgList" :key="index" :class="index < 6 ? 'big-logo' : 'small-logo'" :src="item.pic" @click="handleOrganizationClick(item)"></image>
      </view>
    </view>
    <view class="copyright">
      <image src="/static/index/icon-index-copyright.png"></image>
      <view>
        <text>版权所有 中国公共招聘网</text>
        <text>京ICP备0507021号</text>
      </view>
    </view>
  </view>
</template>

<script>
import NavigationBar from '../../components/common/navigation-bar.vue';
import SectionHeader from '../../components/common/section-header.vue';
export default {
  components: {
    NavigationBar,
    SectionHeader
  },
  data() {
    return {
      alpha: 0,
      info: {}
    };
  },
  onLoad() {
    this.$api.getIndexInfo({
      success: data => {
        this.info = data;
      }
    });
  },
  onPageScroll(e) {
    // #ifdef MP-WEIXIN
    this.alpha = Math.min(1, e.scrollTop / 44);
    // #endif
    // #ifdef MP-ALIPAY
    if (e.scrollTop > 44 && this.alpha === 0) {
      this.alpha = 1
    } else if (e.scrollTop <= 44 && this.alpha === 1){
      this.alpha = 0
    }
    // #endif
  },
  methods: {
    handleBannerClick(item) {
      if (!item.serviceUrl) return;
      uni.navigateTo({
        url: `../common/webpage?url=${item.serviceUrl}`
      });
    },
    handleSessionClick(index) {
      const sessions = ['graduates', 'migrant-workers', 'unemployed-personnel', 'poverty-labour'];
      uni.navigateTo({
        url: `session?session=${sessions[index]}`
      });
    },
    handleProvinceSessionClick() {
      uni.navigateTo({
        url: 'province-session'
      });
    },
    handleAreaSessionClick() {
      uni.navigateTo({
        url: 'area-session'
      });
    },
    handleSearchBarClick() {
      uni.navigateTo({
        url: 'job-list'
      });
    },
    handleHotJobClick(keyword) {
      uni.navigateTo({
        url: `job-list?keyword=${keyword}`
      });
    },
    handleVideoClick(item) {
      if (!item.serviceUrl) return;
      uni.navigateTo({
        url: `../common/video-player?url=${item.serviceUrl}`
      });
    },
    handleOrganizationClick(item) {
      if (!item.serviceUrl) return;
      if (item.serviceUrl.indexOf('http') === -1) {
        uni.navigateToMiniProgram({
          appId: item.serviceUrl
        });
      } else {
        uni.navigateTo({
          url: `../common/webpage?url=${item.serviceUrl}`
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.content {
  .banner {
    width: 750upx;
    height: 560upx;
  }
  .swiper {
    margin: -60upx 30upx 0;
    width: 690upx;
    height: 288upx;
    box-shadow: 0 2upx 10upx 0 rgba(110, 113, 166, 0.16);
    .swiper-item {
      width: 100%;
      height: 100%;
      border-radius: 12upx;
    }
  }
  .session-title {
    margin: 56upx 80upx 0;
    background: linear-gradient(to right, #00adfd, #0049ff);
    width: 590upx;
    height: 80upx;
    line-height: 80upx;
    border-radius: 40upx;
    font-size: 28upx;
    color: white;
    text-align: center;
  }
  .session-content {
    position: relative;
    margin: -40upx 30upx 0;
    width: 690upx;
    height: 288upx;
    box-shadow: 0 2upx 10upx 0 rgba(110, 113, 166, 0.16);
    .sessions {
      padding-top: 30upx;
      height: 240upx;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text {
        font-size: 30upx;
        color: #0171fe;
        max-width: 432upx;
        line-height: 60upx;
        display: inline-block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    .trumpet {
      position: absolute;
      left: 16upx;
      bottom: 16upx;
      width: 100upx;
      height: 128upx;
    }
  }
  .sessions {
    margin: 30upx;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    image {
      margin-bottom: 16upx;
      width: 330upx;
      height: 150upx;
    }
    .area-session {
      width: 690upx;
      height: 200upx;
    }
    // .entrance {
    //   width: 330upx;
    //   height: 290upx;
    //   background: #f0f5ff;
    //   display: flex;
    //   flex-direction: column;
    //   align-items: center;
    //   justify-content: center;
    //   text {
    //     font-size: 40upx;
    //     color: #363636;
    //   }
    //   image {
    //     margin: 8upx;
    //     width: 132upx;
    //     height: 132upx;
    //   }
    //   button {
    //     width: 132upx;
    //     height: 50upx;
    //     line-height: 50upx;
    //     border-radius: 25upx;
    //     background: #0049ff;
    //     font-size: 28upx;
    //     color: white;
    //   }
    // }
  }
  .newest-jobs {
    .search-bar {
      margin: 0 30upx;
      padding: 0 30upx;
      width: 630upx;
      height: 72upx;
      background: #f7f7f7;
      border-radius: 8upx;
      display: flex;
      align-items: center;
      justify-content: space-between;
      text {
        font-size: 26upx;
        color: #bcbcbc;
      }
      image {
        width: 36upx;
        height: 36upx;
      }
    }
    .keywords {
      margin: 24upx 30upx 0;
      display: flex;
      flex-wrap: wrap;
      text {
        margin-right: 22upx;
        margin-bottom: 16upx;
        padding: 0 15upx;
        width: 156upx;
        height: 68upx;
        line-height: 68upx;
        text-align: center;
        border-radius: 8upx;
        border: 2upx solid #dfeaff;
        box-sizing: border-box;
        font-size: 28upx;
        color: #373737;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      text:nth-child(4n) {
        margin-right: 0;
      }
    }
  }
  .video-class {
    .see-more {
      font-size: 20upx;
      color: #161515;
    }
    .videos {
      margin: 10upx 30upx 0;
      display: flex;
      overflow-x: scroll;
      .video {
        position: relative;
        width: 276upx;
        image {
          width: 276upx;
          height: 160upx;
          border-radius: 8upx;
        }
        text {
          font-size: 26upx;
          color: #686868;
          text-align: center;
          display: inline-block;
          width: 100%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .play {
          position: absolute;
          top: 0;
          left: 0;
          background: rgba(0, 0, 0, 0.2);
          border-radius: 8upx;
        }
      }
      .video:not(:last-child) {
        margin-right: 45upx;
      }
    }
    .videos::-webkit-scrollbar {
      width: 0 !important;
    }
  }
  .participated-organizations {
    .organizations {
      padding: 0 30upx;
      display: flex;
      flex-wrap: wrap;
      .big-logo {
        margin-right: 40upx;
        margin-bottom: 16upx;
        width: 325upx;
        height: 94upx;
        box-shadow: 0 2upx 10upx 0 rgba(110, 113, 166, 0.16);
      }
      .big-logo:nth-child(2n) {
        margin-right: 0;
      }
      .small-logo {
        margin-right: 14upx;
        margin-bottom: 10upx;
        width: 162upx;
        height: 72upx;
      }
      .small-logo:nth-child(4n+2) {
        margin-right: 0;
      }
    }
  }
  .copyright {
    display: flex;
    align-items: center;
    justify-content: center;
    image {
      width: 64upx;
      height: 76upx;
    }
    view {
      margin: 60upx 0;
      display: flex;
      flex-direction: column;
      margin-left: 30upx;
      align-items: center;
      justify-content: center;
      text {
        font-size: 24upx;
        color: #aaaaaa;
      }
    }
  }
}
</style>
