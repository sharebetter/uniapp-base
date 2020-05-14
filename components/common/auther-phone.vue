<template>
    <view class="auther-phone-wrap">
        <view class="public-info">
        	<image class="logo" src="../../static/common/icon-common-logo.png"></image>           
        	<text class="use-tip">人社政策文件库 申请使用</text>
        </view>
		<view class="info-title">以下信息</view>
		<view class="tip">为了更好地查询政策文件，请完成授权</view>
		<view class="actions">
		    <button class="cancel" @click="cancelClicked">取消</button>
		    <button class="confirm" open-type="getPhoneNumber" @getphonenumber="getUserInfo">我知道了</button>
			 <!-- <button class="confirm" open-type="getUserInfo" @getuserinfo="getUserInfo">允许</button> -->
		</view>
    </view>
</template>

<script>
export default {
	data() {
		return {
			isShowAuth: false
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
		getUserInfo(e) {
		  if (e.detail.errMsg.indexOf('ok') !== -1) {
		    uni.getProvider({
		      service: 'oauth',
		      success: res => {
		        uni.login({
		          provider: res.provider,
		          success: res => {	
		            this.getToken(getApp().globalData.appId, res.code, e.detail.encryptedData, e.detail.iv, 0)
		          }
		        });
		      }
		    });
		  } else {
		    this.$util.showModal('该功能必须授权后才能使用');
		  }
		},
		getToken(appId, code, encryptedData, iv, count) {
		  this.$api.login({
			  data: {
				appId,
				code,
				encryptedData,
				iv
			  },
			  success: data => {
				if (data) {
					uni.setStorageSync('userInfo', data);
					getApp().globalData.userInfo = {...data}
					this.$emit('confirm')
				} else {
					if (count < 2) {
					  this.getToken(appId, code, encryptedData, iv, count + 1);
					} else {
						console.log('获取用户信息失败')
						this.$emit('cancel')
					}
				}
				
			  },
			  fail: () => {
				  if (count < 2) {
				    this.getToken(appId, code, encryptedData, iv, count + 1);
				  } else {
					console.log('获取用户信息失败')
					this.$emit('cancel')
				  }
			  }
				  
		  });
		},
		cancelClicked(){
			this.$emit('cancel')		
		}
	},
}
</script>

<style lang="less" scoped>
.auther-phone-wrap{
	width: 100%;
	background: #fff;
	border-radius: 24rpx 24rpx 0 0;
	padding: 44rpx;
	box-sizing: border-box;
	.public-info{
		display: flex;
		align-items: center;
		.logo{
			width: 48rpx;
			height: 48rpx;
			border-radius: 50%;
		}
		.use-tip{
			margin-left: 8rpx;
			font-size: 30rpx;
			font-weight: bold;
			color: #000000;
		}
	}
	.info-title{
		margin: 48rpx 0;
		color: #000000;
		font-size: 34rpx;
		font-weight: bold;
	}
	.tip{
		font-size: 34rpx;
		font-weight: 400;
		line-height: 48rpx;
	}
	.actions{
		width: 600rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin: 160rpx auto 0;
		.confirm{
			width: 268rpx;
			height: 80rpx;
			background: #04C160;
			text-align: center;
			line-height: 80rpx;
			color: #fff;
			font-size: 32rpx;
			border-radius: 8rpx;			
		}
		.cancel{
			width: 268rpx;
			height: 80rpx;
			background: #F2F2F2;
			text-align: center;
			line-height: 80rpx;
			color: #07C160;
			font-size: 32rpx;
			border-radius: 8rpx;
		}
	}
	
}
</style>
