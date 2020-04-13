<template>
  <view class="video-player"><video :src="url" controls></video></view>
</template>

<script>
export default {
  data() {
    return {
      url: ''
    };
  },
  onLoad(e) {
    this.url = e.url;
  }
};
</script>

<style lang="scss" scoped>
.video-player {
  video {
    width: 100%;
  }
}
</style>
