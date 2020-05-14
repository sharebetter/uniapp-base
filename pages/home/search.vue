<template>
	<view class="search-page-wrap">
		<view class="search-wrap">
			<view class="search-wrap-content">
				<input v-model="queryKey" @input="queryKeyChange" type="text" placeholder-class="placeholder-style" placeholder="输入关键词搜索" />
				<image @click="clearQueryKey" v-show="queryKey.length > 0" class="mg-row-10" src="../../static/common/icon-common-clear.png" mode=""></image>
				<image @click="searchClick" src="../../static/common/icon-common-search-blue.png" mode=""></image>
			</view>
		</view>		
		<view class="search-detail-wrap">
			<view class="search-screening">
				<view class="search-title">搜索筛选</view>
				<view class="search-content">
					<view class="content-list">
						<view class="left">地址</view>
						<view class="right" @touchstart="selectCityClicked">
							<image class="icon-location" src="../../static/common/icon-common-location-blue.png" mode=""></image>
							<text class="city-name">{{selectedCity.name}}</text>
							<image class="icon-drop" src="../../static/common/icon-common-drop.png" mode=""></image>
						</view>
					</view>
					<view class="content-list">
						<view class="left">搜索位置</view>
						<view class="right">
							<view @click="searchLocation = 1" :class="['select-btn',{'btn-active': searchLocation === 1}]">全文</view>
							<view @click="searchLocation = 0" :class="['select-btn',{'btn-active': searchLocation === 0}]">标题</view>
						</view>
					</view>
					<view class="content-list">
						<view class="left">发布日期</view>
						<view class="right">
							<picker class="time-picker" mode="date" :value="beginDate" :start="startTimeDate" :end="endDate || endTimeDate" @change="bindbeginDateChange">
								<view v-if="beginDate" class="time-date">{{beginDate}}</view>
								<view v-else class="time-tip">选择开始日期</view>
								<image class="icon-clean" @click.stop="cleanDate('beginDate')" v-if="beginDate" src="../../static/common/icon-common-clear.png" mode=""></image>
								<image class="icon-date" src="../../static/common/icon-common-date.png" mode=""></image>
							</picker>
						</view>
					</view>
					<view class="content-list">
						<view class="left"></view>
						<view class="right">
							<picker class="time-picker" mode="date" :value="endDate" :start="beginDate || startTimeDate" :end="endTimeDate" @change="bindEndDateChange">
								<view v-if="endDate" class="time-date">{{endDate}}</view>
								<view v-else class="time-tip">选择结束日期</view>
								<image @click.stop="cleanDate('endDate')" v-if="endDate" class="icon-clean" src="../../static/common/icon-common-clear.png" mode=""></image>
								<image class="icon-date" src="../../static/common/icon-common-date.png" mode=""></image>
							</picker>
						</view>
					</view>
					<view class="content-list">
						<view class="left">排序方式</view>
						<view class="right">
							<view @click="sortBy = 1" :class="['select-btn',{'btn-active': sortBy === 1}]">按相关度</view>
							<view @click="sortBy = 0" :class="['select-btn',{'btn-active': sortBy === 0}]">按时间</view>
						</view>
					</view>
				</view>
			</view>
			<view class="search-tab-wrap" v-if="historySearchList && historySearchList.length > 0">
				<view class="search-title">历史记录</view>
				<view class="tab-content">
					<view @click="pushToInput(item.keyword)" class="tab-list xz-ellipsis" v-for="(item, index) in historySearchList" :key="index">{{item.keyword}}</view>
				</view>
			</view>
			<view class="search-tab-wrap" v-if="wantSearchList && wantSearchList.length > 0">
				<view class="search-title">猜你想搜</view>
				<view class="tab-content">
					<view @click="pushToInput(item.keyword)" class="tab-list" v-for="(item, index) in wantSearchList" :key="index">{{item.keyword}}</view>
				</view>
			</view>
		</view>
		<uni-popup ref="popup" :custom="true" :maskClick="false" type="bottom">
		  <city-picker-popup ref="picker" :cities="citiesData" :tips="true" @cancel="selectCityCancelClicked" @confirm="selectCityConfirmClicked"></city-picker-popup>
		</uni-popup>
	</view>
</template>

<script>
import { uniPopup } from '@dcloudio/uni-ui'
import CityPickerPopup from '../../components/common/city-picker-popup.vue'
export default {	
	components: {
		uniPopup,
		CityPickerPopup
	},
	onShareAppMessage() {
	  return {
	    title: '人社政策文件库',
	    desc: '随时随地 查询最新人社政策',
	    path: '/pages/home/index'
	  };
	},
	data() {
		const currentDate = this.getDate({
			format: true
		})
		return {
			selectedCity: {
				name: '全国',
				code: '000000'
			},
			citiesData: [],
			queryKey: '',
			searchLocation: 1,
			beginDate: '',
			endDate: '',
			sortBy: 1,
			historySearchList: [],
			wantSearchList: []
		};
	},
	computed: {
		startTimeDate() {
			return this.getDate('start');
		},
		endTimeDate() {
			return this.getDate('end');
		}
	},
	onShow(){		
	},
	onLoad(e) {
		this.citiesData = getApp().globalData.citiesData
		if (e.area) {
			this.selectedCity = JSON.parse(e.area) 
		}
	},
	methods: {		
		cleanDate(type){
			switch (type) {
			  case 'beginDate':
				this.beginDate = ''
				break
			  case 'endDate':
				this.endDate = ''
				break
			  default:
				break
			}
		},
		bindbeginDateChange: function(e) {
			this.beginDate = e.target.value
		},
		bindEndDateChange: function(e) {
			this.endDate = e.target.value
		},
		getDate(type) {
			const date = new Date();
			let year = date.getFullYear();
			let month = date.getMonth() + 1;
			let day = date.getDate();

			if (type === 'start') {
				year = year - 20;
			} else if (type === 'end') {
				year = year;
			}
			month = month > 9 ? month : '0' + month;;
			day = day > 9 ? day : '0' + day;
			return `${year}-${month}-${day}`;
		},
		queryKeyChange(e){
			this.queryKey = this.$util.filterSpace(e.detail.value)
		},
		clearQueryKey(){
			this.queryKey = ''
		},
		searchClick(){
			let area = this.selectedCity.code			
			let condition = {
				area: area,
				queryKey: this.queryKey,
				searchLocation: this.searchLocation,
				beginDate: this.beginDate || null,
				endDate: this.endDate || null,
				sortBy: this.sortBy
			}
			if (this.queryKey) {
				uni.navigateTo({
					url: `search-result?condition=${JSON.stringify(condition)}`
				})
			} 
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
		  this.selectedCity = e.city;
		  // 传省份code
		  // this.selectedCity.code = this.selectedCity.code.replace(this.selectedCity.code.substring(2, 6), '0000')
		  this.$refs.popup.close();
		},
		pushToInput(keyword){
			this.queryKey = keyword
		}
	},
}
</script>

<style lang="scss" scoped>
.search-page-wrap{
	position: relative;
	width: 750rpx;
	min-height: 100vh;
	padding: 32rpx;
	box-sizing: border-box;
	background: #F7F6FB;
	overflow-x: hidden;
	.search-wrap{
		width: 100%;
		height: 130rpx;
		background: #F7F6FB;;
		position: fixed;
		top: 0rpx;
		left: 0rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 3;
		.search-wrap-content{
			width: 686rpx;
			height: 96rpx;
			background: #fff;
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-radius: 48rpx;
			padding: 0 32rpx;
			box-sizing: border-box;
			.placeholder-style{
				font-size: 32rpx;
				color: #909399;
			}
			input{
				flex: 1;
				font-size: 32rpx;	
				color: #303133;		
			}	
			image{
				width: 60rpx;
				height: 60rpx;
			}
		}
	}	
	.search-detail-wrap{
		position: relative;
		// top: 100rpx;
		// left: 0rpx;
		margin-top: 100rpx;
		width: 686rpx;
		padding-bottom: 24rpx;
		.search-title{
			position: relative;
			width: 100%;
			height: 80rpx;
			font-size: 32rpx;
			color: #303133;
			font-weight: 500;
			line-height: 80rpx;
			border-bottom: 1px solid #F2F6FC;
			padding: 0 44rpx;
			box-sizing: border-box;
			&::before{
				content: "";
				position: absolute;
				left: 24rpx;
				top: 50%;
				width: 8rpx;
				height: 32rpx;
				transform: translateY(-50%);
				background: #1440A2;
				border-radius: 4rpx;
			}
		}
		.search-screening{
			width: 100%;
			border-radius: 16rpx;
			background: #fff;	
			padding-bottom: 10rpx;
			box-sizing: border-box;
			.search-content{
				width: 100%;
				padding: 0 32rpx;
				box-sizing: border-box;				
				.content-list{
					width: 100%;
					height: 88rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					.left{
						width: 135rpx;
						text-align: right;
						color: #606266;
						font-size: 28rpx;
					}
					.right{
						margin-left: 48rpx;
						flex: 1;
						display: flex;
						align-items: center;
						font-size: 28rpx;
						color: #606266;
						display: flex;
						align-items: center;
						.icon-location{
							width: 40rpx;
							height: 40rpx;
						}
						.city-name{
							margin: 0 8rpx;
							color: #303133;
							font-size: 30rpx;
						}
						.icon-drop{
							width: 32rpx;
							height: 32rpx;
						}
						.select-btn{
							font-size: 28rpx;
							line-height: 60rpx;							
							height:60rpx;
							width: 176rpx;
							border-radius: 32rpx;
							margin-right: 30rpx;
							color: #606266;
							border: 1px solid #CECECE;
							text-align: center;
						}
						.btn-active{
							background: #1440A2 !important;
							color: #fff !important;
							border: none !important;
						}
						.time-picker{
							position: relative;
							flex: 1;
							height: 52rpx;
							display: flex;
							justify-content: space-between;
							align-items: center;
							.time-date{
								width: 350rpx;
								display: inline-block;
							}
							.time-tip{
								width: 350rpx;
								font-size: 28rpx;
								color: #C0C4CC;
								display: inline-block;
							}
							.icon-clean{
								position: absolute;
								top: 4rpx;
								width: 48rpx;
								height: 48rpx;
								margin-right: 16rpx;
							}
							.icon-date{
								position: absolute;
								right: 0;
								width: 40rpx;
								height: 40rpx;
							}
						}						
					}
				}				
			}
		}
		.search-tab-wrap{
			margin-top: 20rpx;
			width: 100%;
			border-radius: 16rpx;
			background: #fff;	
			.tab-content{
				width: 100%;				
				display: flex;
				align-items: center;
				flex-wrap: wrap;
				padding: 30rpx 30rpx 10px 30rpx;
				box-sizing: border-box;
				.tab-list{					
					height: 60rpx;
					border-radius: 32rpx;
					background: #F5F7FA;
					color: #606266;
					font-size: 28rpx;
					text-align: center;
					line-height: 60rpx;
					margin-right: 24rpx;
					margin-bottom: 16rpx;
					padding: 0 20rpx;
					box-sizing: border-box;
				}
				.tab-list-active{
					background: #1440A2;
					color: #fff;
				}
			}
		}
	}
}
</style>
