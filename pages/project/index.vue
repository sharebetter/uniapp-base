<template>	
	<view class="project-list-wrap">
		<view class="search-wrap">
			<swiper class="swiper" :indicator-dots="false" :autoplay="true" :interval="3000" :duration="500" :circular="true">
			  <swiper-item v-for="(item, index) in banner" :key="index" @click="handleBannerClick(item)">
			    <image class="swiper-item" :src="item.bannerImage"></image>
			  </swiper-item>
			</swiper>
			<view class="content-wrap">
				<view class="search-result">
					<view class="question-swiper-content">
						<view class="card-title">常见问题</view>
						<special-banner :banner-list="list" :swiper-config="swiperConfig"></special-banner>
					</view>
				</view>
			</view>
		</view>				
	</view>
</template>

<script>
	import specialBanner from '../../components/common/specialBanner.vue'
	import { uniPopup } from '@dcloudio/uni-ui'
	import AutherPhone from '../../components/common/auther-phone.vue'; 
	export default {
		components: {
			specialBanner,
			uniPopup,
			AutherPhone
		},
		data() {
			return {
				banner:[{
						bannerImage: "https://jjshebao.oss-cn-shenzhen.aliyuncs.com/images/20200413100821-e29b9ac8268442d8b686f1bbf0e42880.png"
					},
					{
						bannerImage: "http://jjshebao.oss-cn-shenzhen.aliyuncs.com/images/20200414164324-e0c94d13167e42909191732d306e5404.png"
				}],
				list: [{
					title: '3月份已复工复产的企业的工资如何发放？',
					articleBody: '<span style="font-size: 15px;">企业已经复工复产，因疫情影响或者个人原因，职工无法正常上班的，从3月1日起，属于超过一个工资支付周期。工资支付按以下处理：</span>'
				}, {
					title: '4月份已复工复产的企业的工资如何发放？',
					articleBody: '<span style="font-size: 15px;">企业已经复工复产，因疫情影响或者个人原因，职工无法正常上班的，从3月1日起，属于超过一个工资支付周期。工资支付按以下处理：</span>'
				}, {
					title: '5月份已复工复产的企业的工资如何发放？',
					articleBody: '<span style="font-size: 15px;">企业已经复工复产，因疫情影响或者个人原因，职工无法正常上班的，从3月1日起，属于超过一个工资支付周期。工资支付按以下处理：</span>'
				}],								
				swiperConfig: {
					indicatorDots: true,
					indicatorColor: 'rgba(255, 255, 255, .4)',
					indicatorActiveColor: 'rgba(255, 255, 255, 1)',
					autoplay: false,
					interval: 3000,
					duration: 300,
					circular: true,
					previousMargin: '58rpx',
					nextMargin: '58rpx'
				}
			}
		},
		onShareAppMessage() {
		  return {
		    title: '人社政策文件库',
		    desc: '随时随地 查询最新人社政策',
		    path: '/pages/home/index'
		  };
		},
		methods: {
			handleBannerClick(item){
					 console.log(item, 'swiper') 
			}
		}
	}
</script>

<style lang="scss" scoped>
.project-list-wrap{
	position: relative;
	width: 750rpx;
	min-height: 100vh;
	padding: 0 32rpx;
	box-sizing: border-box;
	padding-bottom: 24rpx;
	overflow-x: hidden;
	.search-wrap{
		width: 100%;
		background: #F7F6FB;;
		.search-wrap-content{
			margin: 32rpx 0 20rpx 0;
			width: 686rpx;
			height: 80rpx;
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
		.swiper {
			margin-top: 10rpx;
			width: 100%;
			// height: 240rpx;
			.swiper-item {
			  width: 100%;
			  height: 100%;
			  border-radius: 14rpx;
			}
		}
		.select-tab-wrap{			
			width: 686rpx;
			height: 90rpx;
			display: flex;
			align-items: center;
			background: #F7F6FB;
			.select-tab{
				width: 100%;
				display: flex;
				align-items: center;
				border: 1px solid #3B71E8;
				border-radius: 10rpx;
				overflow: hidden;
				.select-tab-list{
					flex: 1;
					height: 50rpx;
					background: #fff;
					color: #1440A2;
					font-size: 28rpx;
					line-height: 50rpx;
					text-align: center;
				}
				.select-tab-list-active{
					background: #1440A2 !important;
					color: #fff !important;
				}
			}			
		}
		.select-tab-wrap-fixed{
			position: fixed !important;
			z-index: 3 !important;
			top: 0 !important;
		}
	}
	.content-wrap{
		width: 686rpx;
		padding-bottom: 24rpx;
		background: #F7F6FB;
		box-sizing: border-box;
		.search-title, .card-title{
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
		.bottom-more{
			height: 80rpx;
			font-size: 28rpx;
			color: #909399;
			text-align: center;
			line-height: 80rpx;
		}
		.search-result{
			width: 100%;
			border-radius: 12rpx;
			background: #F7F6FB;	
			margin-bottom: 20rpx;			
			.question-swiper-content{
				margin-top: 20rpx;
				width: 100%;
				height: 1042rpx;
				border-radius: 12rpx;
				background: #fff;	
				padding: 30rpx 0;
				box-sizing: border-box;
			}
		}		
	}
}
</style>
