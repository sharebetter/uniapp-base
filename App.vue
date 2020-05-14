<script>
export default {
  globalData: {  
	appId: 'wx9ba764d12d8d27e6'  
  },
  onLaunch: function() {
    console.log('App Launch');
  },
  onShow: function() {
    console.log('App Show');
  },
  onHide: function() {
    console.log('App Hide');
  }
};
</script>

<style>
/*每个页面公共css */
page {
  width: 750rpx;
  overflow-x: hidden;
  background: #F7F6FB;
}
button {
  margin: 0;
  padding: 0;
  background: transparent;
}
button::after {
  border: none;
}
</style>
