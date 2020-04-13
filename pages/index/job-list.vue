<template>
  <view class="job-list">
    <view class="header">
      <view class="search-bar">
        <input type="text" placeholder="请输入关键字" v-model="keyword" confirm-type="search" @confirm="handleSearch" @focus="handleInputFocus" />
        <image v-if="keyword" src="/static/index/icon-index-clear-input.png" mode="center" @click="handleClearInput"></image>
        <image v-else src="/static/index/icon-index-search.png"></image>
      </view>
      <!-- <view class="filters">
        <view class="filter" @click="handleOpenPopup(1)">
          <text :class="filterIndex === 1 || (selectedCity && selectedCity.name !== '不限') ? 'highlight' : ''">
            {{ selectedCity && selectedCity.name !== '不限' ? selectedCity.name : '招聘区域' }}
          </text>
          <image
            :class="filterIndex === 1 ? 'rotate' : ''"
            :src="'/static/index/icon-index-arrow' + (filterIndex === 1 || (selectedCity && selectedCity.name !== '不限') ? '-highlight' : '') + '.png'"
          ></image>
        </view>
        <view class="filter" @click="handleOpenPopup(2)">
          <text :class="filterIndex === 2 || selectedJobIndexes.length > 0 ? 'highlight' : ''">
            {{ selectedJobIndexes.length === 0 ? '工种岗位' : selectedJobIndexes.map(item => jobTypes[item[0]].subTypes[item[1]].subTypes[item[2]].name).join(',') }}
          </text>
          <image
            :class="filterIndex === 2 ? 'rotate' : ''"
            :src="'/static/index/icon-index-arrow' + (filterIndex === 2 || selectedJobIndexes.length > 0 ? '-highlight' : '') + '.png'"
          ></image>
        </view>
        <view class="filter" @click="handleOpenPopup(3)">
          <text :class="filterIndex === 3 || selectedSalaryIndex !== 0 ? 'highlight' : ''">
            {{ selectedSalaryIndex === 0 ? '薪资范围' : salaryRanges[selectedSalaryIndex].value }}
          </text>
          <image
            :class="filterIndex === 3 ? 'rotate' : ''"
            :src="'/static/index/icon-index-arrow' + (filterIndex === 3 || selectedSalaryIndex !== 0 ? '-highlight' : '') + '.png'"
          ></image>
        </view>
        <view class="filter" @click="handleOpenPopup(4)">
          <text :class="filterIndex === 4 || selectedEducationIndex !== 0 ? 'highlight' : ''">
            {{ selectedEducationIndex === 0 ? '更 多' : educationRanges[selectedEducationIndex].value }}
          </text>
          <image
            :class="filterIndex === 4 ? 'rotate' : ''"
            :src="'/static/index/icon-index-arrow' + (filterIndex === 4 || selectedEducationIndex !== 0 ? '-highlight' : '') + '.png'"
          ></image>
        </view>
      </view> -->
    </view>
    <view class="list">
      <!-- <view class="item" v-for="(item, index) in list" :key="index" @click="handleItemClick(item.acb200)">
        <view class="content">
          <view class="row">
            <text class="name">{{ item.aca112 }}</text>
            <text class="salary">{{ item.acb241 }}-{{ item.acb242 }}</text>
          </view>
          <view class="row">
            <text class="company">{{ item.aab004 }}</text>
            <text class="date">{{ item.uptime | date }}</text>
          </view>
        </view>
      </view> -->
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
    <uni-popup ref="popup" type="top" @change="handlePopupChange">
      <view class="popup area-filter" v-if="filterIndex === 1">
        <view class="column">
          <text v-for="(item, index) in cities" :key="index" :class="cityIndex[0] === index ? 'highlight' : ''" @click="handleCityChange(1, index)">{{ item.name }}</text>
        </view>
        <view class="separator" v-show="cityIndex[0] !== -1"></view>
        <view class="column" v-show="cityIndex[0] !== -1">
          <text v-for="(item, index) in cities[cityIndex[0]].list" :key="index" :class="cityIndex[1] === index ? 'highlight' : ''" @click="handleCityChange(2, index)">
            {{ item.name }}
          </text>
        </view>
      </view>
      <view class="popup job-filter" v-if="filterIndex === 2">
        <view class="selected-jobs">
          <view class="job" v-for="(item, index) in selectedJobIndexes" :key="index">
            <text class="title">{{ jobTypes[item[0]].subTypes[item[1]].subTypes[item[2]].name }}</text>
            <text class="delete" @click="handleDeleteJob(index)">✕</text>
          </view>
        </view>
        <view class="items">
          <view class="column">
            <text v-for="(item, index) in jobTypes" :key="index" @click="handleJobTypeChange(1, index)">{{ item.name }}</text>
          </view>
          <view class="separator" v-show="jobTypeIndexes[0] !== -1"></view>
          <view class="column" v-show="jobTypeIndexes[0] !== -1">
            <text v-for="(item, index) in jobTypes[jobTypeIndexes[0]].subTypes" :key="index" @click="handleJobTypeChange(2, index)">{{ item.name }}</text>
          </view>
          <view class="separator" v-show="jobTypeIndexes[1] !== -1"></view>
          <view class="column" v-show="jobTypeIndexes[1] !== -1">
            <text v-for="(item, index) in jobTypes[jobTypeIndexes[0]].subTypes[jobTypeIndexes[1]].subTypes" :key="index" @click="handleJobTypeChange(3, index)">
              {{ item.name }}
            </text>
          </view>
        </view>
        <button @click="handleSearch">查询</button>
      </view>
      <view class="popup salary-filter" v-if="filterIndex === 3">
        <text v-for="(item, index) in salaryRanges" :key="index" :class="selectedSalaryIndex === index ? 'highlight' : ''" @click="handleSalaryChange(index)">
          {{ item.value }}
        </text>
        <button @click="handleSearch">查询</button>
      </view>
      <view class="popup more-filter" v-if="filterIndex === 4">
        <view class="section">
          <text class="title">学历要求</text>
          <view class="items">
            <text v-for="(item, index) in educationRanges" :key="index" :class="selectedEducationIndex === index ? 'highlight' : ''" @click="handleEducationChange(index)">
              {{ item.value }}
            </text>
          </view>
        </view>
        <!-- <view class="section">
          <text class="title">发布时间</text>
          <view class="items">
            <text v-for="(item, index) in publishDateRanges" :key="index" :class="selectedPublishDateIndex === index ? 'highlight' : ''" @click="handlePublishDateChange(index)">
              {{ item }}
            </text>
          </view>
        </view> -->
        <button @click="handleSearch">查询</button>
      </view>
    </uni-popup>
  </view>
</template>

<script>
import { uniPopup, uniLoadMore } from '@dcloudio/uni-ui';
import dayjs from 'dayjs';
export default {
  components: {
    uniPopup,
    uniLoadMore
  },
  filters: {
    date(value) {
      return dayjs(value).format('YYYY-MM-DD');
    }
  },
  data() {
    return {
      // 关键字
      keyword: '',
      // 上一次搜索的关键字
      lastedKeyword: '',
      // 当前显示的筛选条件下标
      filterIndex: 0,
      // 招聘区域点击的下标
      cityIndex: [0, -1],
      // 选中的城市
      selectedCity: null,
      // 工种岗位点击的下标
      jobTypeIndexes: [-1, -1, -1],
      // 选中的工种岗位下标
      selectedJobIndexes: [],
      // 所有可选的薪资范围列表
      salaryRanges: [
        {
          key: '',
          value: '不限'
        },
        {
          key: '1',
          value: '1000元以下'
        },
        {
          key: '2',
          value: '1000-1999元'
        },
        {
          key: '3',
          value: '2000-2999元'
        },
        {
          key: '4',
          value: '3000-3999元'
        },
        {
          key: '5',
          value: '4000-4999元'
        },
        {
          key: '6',
          value: '5000元以上'
        }
      ],
      // 选中的薪资范围下标
      selectedSalaryIndex: 0,
      // 所有可选的学历列表
      educationRanges: [
        {
          key: '',
          value: '不限'
        },
        {
          key: '11',
          value: '博士研究生'
        },
        {
          key: '14',
          value: '硕士研究生'
        },
        {
          key: '21',
          value: '大学本科'
        },
        {
          key: '31',
          value: '大学专科'
        },
        {
          key: '41',
          value: '中等专科'
        },
        {
          key: '44',
          value: '职业高中'
        },
        {
          key: '47',
          value: '技工学校'
        },
        {
          key: '61',
          value: '普通高中'
        },
        {
          key: '71',
          value: '初中'
        },
        {
          key: '81',
          value: '小学'
        },
        {
          key: '90',
          value: '其他'
        }
      ],
      // 选中的学历下标
      selectedEducationIndex: 0,
      // 所有可选的发布时间列表
      publishDateRanges: ['不限', '近1天', '近2天', '近1周', '近2周', '近1月', '近2月', '近半年'],
      // 选中的发布时间下标
      selectedPublishDateIndex: 0,
      // 页码
      page: 1,
      // 数据列表
      list: [],
      // 上拉加载状态
      status: 'noMore'
    };
  },
  computed: {
    // 所有可选的城市列表
    cities() {
      return [{ name: ' 不限', code: '', list: [] }, ...require('../../data/cities.js').cities];
    },
    // 所有可选的工种岗位列表
    jobTypes() {
      return require('../../data/job-types.js').types;
    }
  },
  onLoad(e) {
    this.keyword = e.keyword || '';
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
    // 响应搜索输入框点击事件
    handleInputFocus() {
      this.$refs.popup.close();
    },
    // 响应清空输入内容点击事件
    handleClearInput() {
      this.keyword = '';
      if (this.lastedKeyword !== '') this.handleSearch();
    },
    // 响应搜索事件
    handleSearch() {
      this.page = 1;
      this.requestData();
      this.$refs.popup.close();
    },
    // 响应条件筛选点击事件
    handleOpenPopup(index) {
      if (index === this.filterIndex) {
        this.$refs.popup.close();
      } else {
        this.filterIndex = index;
        this.$refs.popup.open();
      }
    },
    // 响应弹出层 popup 状态改变事件
    handlePopupChange(e) {
      if (!e.show) this.filterIndex = 0;
    },
    // 响应招聘区域选择事件
    handleCityChange(level, index) {
      this.cityIndex.splice(level - 1, 1, index);
      switch (level) {
        case 1:
          if (this.cities[index].list.length === 0) {
            this.selectedCity = this.cities[index];
            this.$refs.popup.close();
            this.requestData();
          }
          break;
        case 2:
          this.selectedCity = this.cities[this.cityIndex[0]].list[index];
          this.$refs.popup.close();
          this.requestData();
        default:
          break;
      }
    },
    // 响应工种岗位选择事件
    handleJobTypeChange(level, index) {
      this.jobTypeIndexes.splice(level - 1, 1, index);
      switch (level) {
        case 1:
          this.jobTypeIndexes[1] = -1;
          this.jobTypeIndexes[2] = -1;
          break;
        case 2:
          this.jobTypeIndexes[2] = -1;
          break;
        case 3:
          if (this.selectedJobIndexes.length === 5) {
            this.$uni.showToast('最多只能选择5个岗位');
            return;
          }
          this.selectedJobIndexes.push([...this.jobTypeIndexes]);
          break;
        default:
          break;
      }
    },
    // 响应工种岗位删除事件
    handleDeleteJob(index) {
      this.selectedJobIndexes.splice(index, 1);
    },
    // 响应薪资范围点击事件
    handleSalaryChange(index) {
      this.selectedSalaryIndex = index;
    },
    // 响应学历点击事件
    handleEducationChange(index) {
      this.selectedEducationIndex = index;
    },
    // 响应发布时间点击事件
    handlePublishDateChange(index) {
      this.selectedPublishDateIndex = index;
    },
    // 请求数据
    requestData() {
      this.status = 'loading';
      this.$api.getJobList({
        data: {
          job: this.keyword,
          // AAB004: this.keyword,
          // OrderType: '',
          // TYPE: 1,
          // AREA: this.selectedCity ? this.selectedCity.code : '',
          // ACB241: this.salaryRanges[this.selectedSalaryIndex].key,
          // AAC011: this.educationRanges[this.selectedEducationIndex].key,
          // ACA111: this.selectedJobIndexes.map(item => this.jobTypes[item[0]].subTypes[item[1]].subTypes[item[2]].id).join(','),
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
.job-list {
  .header {
    position: fixed;
    background: white;
    z-index: 999;
    .search-bar {
      margin: 30upx 30upx 16upx;
      padding: 0 30upx;
      width: 630upx;
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
    .filters {
      padding: 0 30upx;
      display: flex;
      align-items: center;
      height: 88upx;
      border-bottom: 2upx solid #e5e5e5;
      .filter {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        text {
          font-size: 28upx;
          color: #292626;
          transition: all 0.3s;
          display: inline-block;
          max-width: 120upx;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .highlight {
          color: #4077f4;
        }
        image {
          margin-left: 8upx;
          width: 22upx;
          height: 14upx;
          transition: all 0.3s;
        }
        .rotate {
          transform: rotate(180deg);
        }
      }
    }
  }
  // .list {
  //   padding-top: 100upx;
  //   .item {
  //     padding: 30upx;
  //     height: 100upx;
  //     .row {
  //       height: 50upx;
  //       display: flex;
  //       align-items: center;
  //       justify-content: space-between;
  //       .name {
  //         font-size: 32upx;
  //         font-weight: bold;
  //         color: #292626;
  //       }
  //       .salary {
  //         font-size: 32upx;
  //         color: #4077f4;
  //       }
  //       .company,
  //       .date {
  //         font-size: 24upx;
  //         color: #a1a1a1;
  //       }
  //     }
  //   }
  //   .item:not(:last-child) {
  //     border-bottom: 8upx solid #f8f8f8;
  //   }
  // }
  .list {
    padding-top: 100upx;
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
          flex: 1;
          display: inline-block;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .salary {
          font-size: 32upx;
          color: #4077f4;
          display: inline-block;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
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
    margin-top: 190upx;
    width: 750upx;
    height: 950upx;
    background: white;
    border-radius: 0 0 40upx 40upx;
    button {
      position: absolute;
      bottom: 0;
      margin: 30upx 0;
      width: 690upx;
      height: 76upx;
      line-height: 76upx;
      border-radius: 38upx;
      background: #4077f4;
      font-size: 32upx;
      color: white;
    }
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
  .job-filter {
    .selected-jobs {
      padding: 30upx;
      display: flex;
      flex-wrap: wrap;
      .job {
        margin: 0 16upx 16upx 0;
        padding: 8upx 16upx;
        display: flex;
        align-items: center;
        background: #f0f4ff;
        border-radius: 4upx;
        .title {
          font-size: 24upx;
          color: #4077f4;
        }
        .delete {
          margin-left: 16upx;
          width: 24upx;
          height: 24upx;
          line-height: 24upx;
          border-radius: 12upx;
          background: #4077f4;
          font-size: 20upx;
          color: white;
          text-align: center;
        }
      }
    }
    .items {
      display: flex;
      height: 65%;
      .column {
        padding: 0 30upx;
        flex: 1;
        display: flex;
        flex-direction: column;
        overflow-y: scroll;
        text {
          margin: 16upx 0;
          line-height: 44upx;
          font-size: 28upx;
          color: #6f6f6f;
        }
      }
      .separator {
        width: 2upx;
        height: 100%;
        background: #e7e7e7;
      }
    }
    button {
      margin: 30upx;
    }
  }
  .salary-filter {
    display: flex;
    flex-direction: column;
    align-items: center;
    text {
      font-size: 32upx;
      color: #292626;
      line-height: 80upx;
    }
    .highlight {
      color: #4077f4;
    }
  }
  .more-filter {
    .section {
      padding: 0 30upx;
      display: flex;
      flex-direction: column;
      .title {
        line-height: 72upx;
        font-size: 28upx;
        color: #161515;
      }
      .items {
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
        .highlight {
          background: #f0f4ff;
          color: #4077f4;
        }
      }
    }
    .section:first-child {
      padding-top: 30upx;
    }
  }
}
</style>
