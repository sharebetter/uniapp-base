<template>
  <view class="content flex-v"><web-view :webview-styles="webviewStyles" :src="url"></web-view></view>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      url: '',
      webviewStyles: {
        progress: {
          color: '#4077F4'
        }
      }
    };
  },
  onLoad(e) {
    this.url = e.url;
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.content {
  position: relative;
  min-height: 100%;
}
</style>
