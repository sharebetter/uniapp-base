<template>
  <view class="home-wrap">
    <navigation-title title="首页"></navigation-title>
	<image class="bg-bottom" src="../../static/home/bg-pic.png" mode=""></image>
	<view class="content">
		<view class="location" @touchstart="selectCityClicked" :class="guide === 'first' ? 'z-index-3': 'z-index-0'">
			<view class="location-info">
				<image class="icon-location" src="../../static/home/icon-location-white.png" mode=""></image>
				<text>{{selectedCity.name || '定位中...'}}</text>
			</view>			
		</view>
		<view class="left-line"></view>
		<view class="swiper-wrap">
			<view class="swiper-search">
				<!-- <view class="title">人社政策文件库</view> -->
				<view class="title">{{title || '政策文件库'}}</view>
				<swiper @touchstart="swiperTouchStart" @touchend="swiperTouchEnd" class="swiper" @change="swiperChange" :current="current" :vertical="true" :display-multiple-items="8" :indicator-dots="false" :autoplay="autoplay" :interval="4000" :duration="500" :circular="true">
				  <swiper-item @click="swiperListClick(index)" class="swiper-item" v-for="(item, index) in hotKey" :key="index">
				    <view class="list-name">{{item.keyword}}</view>
				  </swiper-item>
				</swiper>
			</view>
			<view :class="['search-btn', { 'bg-none' :  bgNone, 'z-index-3': guide === 'second'}]">
				<input id="searchIpt" ref="searchIpt" :disabled="guide!=='over'" @input="queryKeyChange" @focus="iptFocus"  @blur="iptBlur" type="text" :value="queryKey" />
				<image @click="clearQueryKey" v-show="!autoplay && queryKey.length > 0" class="icon-clean" src="../../static/common/icon-common-clear.png" mode=""></image>
				<image @click="searchClick" class="icon-search" src="../../static/common/icon-common-search-blue.png" mode=""></image>
			</view>
			<view @click="toHightSearch" :class="['search-super',{'z-index-3': guide === 'third'}]">高级搜索 ></view>
		</view>		
	</view>
	<uni-popup ref="popup" :custom="true" :maskClick="false" type="bottom">
	  <city-picker-popup ref="picker" :cities="citiesData" :tips="true" @cancel="selectCityCancelClicked" @confirm="selectCityConfirmClicked"></city-picker-popup>
	</uni-popup>
	<view class="overlay" v-if="guide!=='over'"></view>
  </view>
</template>

<script>
import NavigationTitle from '../../components/common/navigation-title.vue'
import { uniPopup } from '@dcloudio/uni-ui'
import CityPickerPopup from '../../components/common/city-picker-popup.vue'
import { cities } from '../../data/cities-all.js'
export default {
  components: {
    NavigationTitle,
	CityPickerPopup,
    uniPopup
  },
  data () {
    return {
	  title: '',
	  autoplay: true,
	  isListClick : false,
	  current: 0,
	  citiesData: cities,
	  selectedCity: {
		name: '全国',
		code: '000000'
	  },
	  queryKey: '',
	  hotKey: [{id: "jianfeibili", keyword: "技能提升补贴", title: null},
	  {id: "laodonghutong", keyword: "稳岗补贴", title: null},
	  {id: "peixunbutie", keyword: "培训补贴", title: null},
	  {id: "shebaoshenbao", keyword: "失业登记", title: null},
	  {id: "shiyedengji", keyword: "退休年龄", title: null},
	  {id: "shiyejin", keyword: "养老金", title: null},
	  {id: "tuixiunianling", keyword: "失业金", title: null},
	  {id: "wengangbutie", keyword: "缴费基数", title: null},
	  {id: "wengangfanhuan", keyword: "社保待遇", title: null},
	  {id: "yicixingbujiao", keyword: "最低工资", title: null}],
	  bgNone: false,
	  guide: 'over',
    };
  },
  onShareAppMessage() {
    return {
      title: '人社政策文件库',
      desc: '随时随地 查询最新人社政策',
      path: '/pages/home/index'
    };
  },
  onLoad () {
	getApp().globalData.citiesData = cities
	this.queryKey = this.hotKey[2].keyword
  },
  onShow () {	
	this.autoplay = true	
  },
  onHide () {
	this.autoplay = false
  },
  methods: {
	  // 检测版本更新
	  checkUpdate() {
	    // if (process.env.NODE_ENV === 'development') return;
	    const manager = uni.getUpdateManager();
		const _this = this
	    manager.onCheckForUpdate((res) => {
	      // 请求完新版本信息的回调
	      if (res.hasUpdate) {
			  setTimeout(()=>{
				this.$util.showToast('检测到新版本，正在为您更新') 
			  }, 100)
	      }
	    });
	    manager.onUpdateReady((res) => {
			setTimeout(()=>{
				this.$util.showModal('新版本已经准备好，即将重启应用', false, {
				  confirm: () => {
				    manager.applyUpdate();
				  }
				})
			}, 100)	      
	    });
	    manager.onUpdateFailed(function(res) {
	      // 新的版本下载失败
	      console.log('新版本下载失败');
	    });
	  },
	  requestData(){
		// this.$api.getAreaList({
		// 	success: data => {
		// 		this.citiesData = data
		// 		getApp().globalData.citiesData = data
		// 	},
		// 	fail: () => {
		// 	  this.$util.showToast('获取城市列表失败')
		// 	},
		// 	complete: () => {
			  
		// 	}
		// })
		this.$api.getPolicyIndex({        
			success: data => {
			  this.title = data.title || '政策文件库'
			  this.hotKey = data.hotKey
			  this.queryKey = this.hotKey[2].keyword
			},
			fail: () => {
			  this.$util.showToast('获取首页关键字失败')
			},
			complete: () => {
			  
			}
		})
	  },	  
	  queryKeyChange(e){		
		this.queryKey = this.$util.filterSpace(e.detail.value)
	  },
	  swiperChange(e){	
		 let current = (e.detail.current + 2) >= this.hotKey.length ? ((e.detail.current + 2) - this.hotKey.length) : (e.detail.current + 2)
		 this.queryKey = this.hotKey[current].keyword
	  },
	  swiperListClick(index){
		/* current 无法设置负数，当current = 0 时，
		但是swiper改变的时候，显示的搜索总是 + 2， 所以永远不会选中 0，1这两个list，
		所以用此方法解决 */
		// this.autoplay = false
		this.current = index < 2 ? (this.hotKey.length - 2 + index) : index - 2		
	  },
	  iptFocus(){
		this.autoplay = false
	  },
	  iptBlur(){
		this.autoplay = true
	  },
	  swiperTouchStart(){
		this.bgNone = true
	  },
	  swiperTouchEnd(){
		this.bgNone = false
	  },
	  /**
	   * 获取用户当前城市
	   */
	  getLocation() {
		// 需要在百度地图添加小程序的appId才能使用
	    // #ifdef MP-WEIXIN
	    uni.getLocation({
	      success: res => {
	        const config = require('../../config.js');
	        uni.request({
	          url: `https://api.map.baidu.com/reverse_geocoding/v3/?ak=${config.bmapAK}&output=json&coordtype=wgs84ll&location=${res.latitude},${res.longitude}`,
	          success: data => {
	            let code = data.data.result.addressComponent.adcode;
	            if (['11', '12', '31', '50'].indexOf(code.substring(0, 2)) !== -1 || code.substring(2, 4) === '00') {
				  code = code.replace(code.substring(2, 6), '0000');
	            } else {
	              code = code.replace(code.substring(4, 6), '00');
	            }
	            const city = {
	              code: code,
	              name: data.data.result.addressComponent.city
	            };
	            getApp().globalData.city = city;
	            this.selectedCity = city;
				uni.setStorageSync('selectedCity', city)
	          },
	          fail: () => {
	            this.$util.showToast('定位失败');
	            getApp().globalData.city = {
	              name: '全国',
	              code: '000000'
	            };
	            this.selectedCity = {
	              name: '全国',
	              code: '000000'
	            };
	          },
	          complete: () => {
	            this.$util.hideLoading();
	          }
	        });
	      },
	      fail: () => {
	        this.$util.showToast('定位失败');
	        getApp().globalData.city = {
			  name: '全国',
			  code: '000000'
	        };
	        this.selectedCity = {
	          name: '全国',
	          code: '000000'
	        };
	      }
	    });
	    // #endif
	    // #ifdef MP-ALIPAY
	    my.getLocation({
	      type: 1,
	      success: res => {
	        let code = res.cityAdcode;
	        if (['11', '12', '31', '50'].indexOf(code.substring(0, 2)) !== -1 || code.substring(2, 4) === '00') {
	          code = code.replace(code.substring(2, 6), '0000')
	        } else {
	          code = code.replace(code.substring(4, 6), '00');
	        }
	        const city = {
	          code: code,
	          name: res.city
	        };
	        getApp().globalData.city = city;
	        this.selectedCity = city;
			uni.setStorageSync('selectedCity', city)
	      },
	      fail: () => {
	        this.$util.showToast('定位失败');
	        getApp().globalData.city = {
				name: '全国',
				code: '000000'
	        };
	        this.selectedCity = {
				name: '全国',
				code: '000000'
	        };
	      }
	    });
	    // #endif
	  },
	  /**
	   * 备案弹窗选择城市点击事件
	   */
	  selectCityClicked() {
	    this.$refs.popup.open();
	  },
	  /**
	   * 选择城市取消点击事件
	   */
	  selectCityCancelClicked() {
	    this.$refs.popup.close();
	  },
	  /**
	   * 选择城市确定点击事件
	   * @param {Object} city
	   */
	  selectCityConfirmClicked(e) {
	    this.selectedCity = e.city
		// 传省份code
		// this.selectedCity.code = this.selectedCity.code.replace(this.selectedCity.code.substring(2, 6), '0000')
		uni.setStorageSync('selectedCity', this.selectedCity)
	    this.$refs.popup.close()
	  },
	  toHightSearch(url){		 
		  let area = JSON.stringify(this.selectedCity)
		  uni.navigateTo({
			  url: `search?area=${area}`
		  })
	  },
	  clearQueryKey(){
		  setTimeout(()=>{
			  this.queryKey = ''
		  }, 100)
	  },
	  searchClick(){		
		if (this.queryKey) {
			let area = this.selectedCity.code || '350200'
			uni.navigateTo({
				url: `search-result?queryKey=${this.queryKey}&area=${area}`
			})
		}
	  },	  
  }
};
</script>

<style lang="scss" scoped>
.home-wrap {
	position: relative;
	width: 750upx;
	height: 100vh;
	background: linear-gradient(#1440A2 65%, #2D74CF);
	overflow: hidden;
  .bg-bottom{
	  position: absolute;
	  left: 0;
	  bottom: 0;
	  width: 100%;
	  height: 502upx;
  }
  .content{
	position: relative;
	width: 100%;
	top: 208upx;
	// top: 44rpx;
	.location{
		position: relative;
		height: 50rpx;
		padding: 0 40rpx;	
		text-align: right;
		.location-info{
			display: inline-flex;
			align-items: center;
			.icon-location{
				width: 40upx;
				height: 40upx;
			}	  
			text{
				color: #fff;
				font-size: 28upx;
				font-weight: 500;
				margin-left: 8upx;
			}	
		}		
	}
	.left-line{
		position: absolute;
		left: 90upx;
		top: 56upx;
		width: 2upx;
		height: 956upx;
		background: #fff;
		opacity: 0.3;
	} 
	 .swiper-wrap{
		 position: relative;		 
		 padding: 0px 40rpx;		 
		 .swiper-search{
			 position: relative;			 
			 left: 104upx;
			 top: 40upx;
			 width: 100%;
			 height: 750upx;
			 .title{
				 font-weight: 900upx;
				 font-size: 56upx;
				 font-family:STSongti-SC-Black,STSongti-SC;
				 color: #fff;
			 }
			 .swiper{
				 margin-top: 60upx;
				 width: 550upx;
				 height: 750upx;
				.swiper-item {
				   width: 100%;
				   .list-name{
					   font-size: 32upx;
					   color: #fff;
				   }
				 }
			 }
		 }
		 .search-btn{
			 position: absolute;	
			 top: 336rpx;
			 left: 38rpx;
			 width: 660rpx;
			 height: 90rpx;
			 display: flex;
			 justify-content: space-between;
			 align-items: center;
			 border-radius: 48rpx;
			 border: 2px solid #fff;
			 background: #fff;
			 // z-index: 3;
			 transition: background 0.2s;
			 input{
				 flex: 1;
				 height: 100%;
				 color: #1B65B9;
				 font-size: 38rpx;
				 font-family: PingFangSC-Bold,PingFang SC;
				 font-weight: bold;
				 line-height: 96rpx;
				 padding: 0 10rpx 0 94rpx;
			 }
			 .icon-search{
				 width: 60rpx;
				 height: 60rpx;
				 margin-right: 32rpx;
			 }
			 .icon-clean{
				 width: 60rpx;
				 height: 60rpx;
			 }
			 
		}
		.bg-none{
			transition: background 0.2s;
			background: none !important;
			input{
				color: transparent !important;
			}
		}
		.search-super{
			position: absolute;
			top: 454rpx;
			right: 52rpx;
			color: rgba(255, 255, 255, 0.7);
			font-size: 32rpx;
			font-weight: 400;
		}
	 }
	 .guide-wrap{
		 .guide-first-wrap{
			 position: absolute;
			 top: 68rpx;
			 right: 36rpx;
			 z-index: 3;
			 .guide-first-bg{
			 	width: 590rpx;
			 	height: 284rpx;
			 }
			 .btn{
				 position: absolute;
				 top: 202rpx;
				 left: 163rpx;
				 width: 230rpx;
				 height: 80rpx;
			 }
		 }
		 .guide-second-wrap{
				 position: absolute;
				 top: 508rpx;
				 left: 0rpx;
				 z-index: 3;
				 .guide-second-bg{
					width: 536rpx;
					height: 284rpx;
				 }
				 .btn{
					 position: absolute;
					 top: 202rpx;
					 left: 158rpx;
					 width: 230rpx;
					 height: 80rpx;
				 }
		 }
		 .guide-third-wrap{
			 position: absolute;
			 top: 564rpx;
			 right: 85rpx;
			 z-index: 3;
			 .guide-third-bg{
				width: 648rpx;
				height: 284rpx;
			 }
			 .btn{
				 position: absolute;
				 top: 202rpx;
				 left: 158rpx;
				 width: 230rpx;
				 height: 80rpx;
			 }
		 }	
	 }
  }
  // 遮罩
  .overlay {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 2;
  }
  .z-index-3 {
	z-index: 3;
	font-weight: bold !important;
  }
  .z-index-0 {
  	z-index: 0;
  }
}
</style>
