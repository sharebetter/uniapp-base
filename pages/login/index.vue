<template>
    <view>
        <view class="login-info-wrap">
			<view class="public-info">				
				<image class="image" src="../../static/common/icon-common-logo.png"></image>           
				<text class="use-tip">人社政策文件库 申请</text>
			</view>
			<view class="title">以下信息：</view>
			<view class="desc">· 为了更好地查询政策文件，请完成授权</view>
			<view class="actions">
			    <button class="confirm" open-type="getPhoneNumber" @getphonenumber="getUserInfo">我知道了</button>
				 <!-- <button class="confirm" open-type="getUserInfo" @getuserinfo="getUserInfo">允许</button> -->
			    <!-- <button class="cancel" @click="cancelClicked">拒绝</button> -->
			</view>
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
		// getPhoneNumberClicked(e) {
		//   if (e.detail.errMsg.indexOf('ok') !== -1) {
		//     uni.getProvider({
		//       service: 'oauth',
		//       success: res => {
		//         uni.login({
		//           provider: res.provider,
		//           success: res => {
		// 			console.log(res, 'res')
		//             // this.getToken(res.code, e.detail.encryptedData, e.detail.iv, 0, e.target.id);
		//           }
		//         });
		//       }
		//     });
		//   } else {
		//     this.$util.showModal('该功能必须授权后才能使用');
		//   }
		// },
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
					uni.navigateBack()
				} else {
					if (count < 2) {
					  this.getToken(appId, code, encryptedData, iv, count + 1);
					} else {
						console.log('获取用户信息失败')
						uni.navigateBack()
					}
				}
				
			  },
			  fail: () => {
				  if (count < 2) {
				    this.getToken(appId, code, encryptedData, iv, count + 1);
				  } else {
					console.log('获取用户信息失败')
					uni.navigateBack()
				  }
			  }
				  
		  });
		},
		cancelClicked(){
			this.$util.showModal('部分功能需要用户信息授权才能使用，确定拒绝？', true, {
				title: '提示', 
				confirmText: '授权', 
				cancelText: '拒绝', 
				confirm: ()=> {
				},
				cancel: ()=>{
					uni.navigateBack()					
				}
			})			
		}
	},
}
</script>

<style lang="less" scoped>
.login-info-wrap {
	padding: 48rpx 40rpx;
	width: 100%;
	min-height: 100vh;
	background: #fff;
	box-sizing: border-box;
	.public-info{
		display: flex;
		align-items: center;
		.image{			
			margin-right: 16rpx;
			width: 48rpx;
			height: 48rpx;
			border-radius: 50%;
			overflow: hidden;
		}
		.use-tip{
			color: #303133;
			font-size: 28rpx;
		}
	} 
	.title{
		margin-top: 30rpx;
		font-size: 48rpx;
		color: #303133;
	}
	.desc{
		margin-top: 54rpx;
		font-size: 32rpx;
		color: #303133;
	}
	.actions{
		position: relative;
		top: 500rpx;
		.confirm{
			width: 368rpx;
			height: 80rpx;
			background: #003EA8;
			text-align: center;
			line-height: 80rpx;
			color: #fff;
			font-size: 32rpx;
			border-radius: 8rpx;
			margin: 0 auto;
		}
		.cancel{
			margin: 24rpx auto 0;
			width: 368rpx;
			height: 80rpx;
			background: #F2F2F2;
			text-align: center;
			line-height: 80rpx;
			color: #003EA8;
			font-size: 32rpx;
			border-radius: 8rpx;
		}
	}
}
</style>
