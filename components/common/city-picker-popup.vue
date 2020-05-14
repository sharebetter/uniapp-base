<template>
  <view class="content">
    <!-- <view class="tips flex-h" v-if="tips && !closed">
      <text class="flex-1">注：其他统筹区会陆续开通，请避免备案误操作，否则会影响到参保人现有待遇水平</text>
      <image src="../../static/home/icon-mine-close.png" @click="closeClicked"></image>
    </view> -->
    <view class="container flex-v">
      <view class="header flex-h">
        <text class="cancel" @click="cancelClicked">取消</text>
        <text class="title">{{ selected ? selected.name : '城市选择' }}</text>
        <text class="confirm" @click="confirmClicked">确定</text>
      </view>
      <scroll-view scroll-x="true" class="selected-info">
        <text :class="step === 0 ? 'selected' : ''" @click="stepClicked(0)">{{ province.name }}</text>
        <text :class="step === 1 ? 'selected' : ''" @click="stepClicked(1)" v-if="provinceIndex !== -1 && province.list.length > 0">{{ city.name }}</text>
        <text :class="step === 2 ? 'selected' : ''" @click="stepClicked(2)" v-if="cityIndex !== -1 && city.list.length > 0">{{ area.name }}</text>
      </scroll-view>
      <scroll-view scroll-y="true" class="items">
        <view class="item flex-h" v-for="(item, index) in list" :key="index" @click="itemClicked(index)">
          <text :class="(step === 0 && index === provinceIndex) || (step === 1 && index === cityIndex) || (step === 2 && index === areaIndex) ? 'selected' : ''">{{ item }}</text>
          <image
            src="../../static/common/icon-common-item-selected.png"
            v-if="(step === 0 && index === provinceIndex) || (step === 1 && index === cityIndex) || (step === 2 && index === areaIndex)"
          ></image>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'CityPickerPopup',
  data() {
    return {
      step: 0,
      provinceIndex: -1,
      cityIndex: -1,
      areaIndex: -1,
      closed: false
    };
  },
  props: {
    cities: {
      type: Array,
      default: function() {
        const json = require('../../data/cities.js');
        return json.cities;
      }
    },
    tips: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    province() {
      return this.cities[this.provinceIndex] || { name: '请选择', code: '000000', supportYn: 'n', list: [] };
    },
    city() {
      return this.province.list[this.cityIndex] || { name: '请选择', code: '000000', supportYn: 'n', list: [] };
    },
    area() {
      return this.city.list[this.areaIndex] || { name: '请选择', code: '000000', supportYn: 'n', list: [] };
    },
    selected() {
      return this.areaIndex !== -1 ? this.area : this.cityIndex !== -1 ? this.city : this.provinceIndex !== -1 ? this.province : null;
    },
    list() {
      switch (this.step) {
        case 0:
          return this.cities.map(item => {
            return item.name;
          });
        case 1:
          return this.province.list.map(item => {
            return item.name;
          });
        case 2:
          return this.city.list.map(item => {
            return item.name;
          });
        default:
          return [];
      }
    }
  },
  watch: {
    cities(newValue, oldValue) {
      this.reset();
    }
  },
  methods: {
    closeClicked() {
      this.closed = true;
    },
    reset() {
      this.step = 0;
      this.provinceIndex = -1;
      this.cityIndex = -1;
      this.areaIndex = -1;
    },
    cancelClicked() {
      setTimeout(() => {
        this.closed = false;
      }, 500);
      this.$emit('cancel');
    },
    confirmClicked() {
      if (!this.selected) {
        this.$util.showToast('请选择城市');
        return;
      }
      if (this.selected.supportYn === 'n') {
        const message = this.provinceIndex === -1 ? '请选择省份' : this.cityIndex === -1 ? '请选择城市' : this.areaIndex === -1 ? '请选择区县' : '';
        this.$util.showToast(message);
        return;
      }
      setTimeout(() => {
        this.closed = false;
      }, 500);
      this.$emit('confirm', { city: this.selected });
    },
    stepClicked(index) {
      this.step = index;
      this.cityIndex = index < 1 ? -1 : this.cityIndex;
      this.areaIndex = index < 2 ? -1 : this.areaIndex;
    },
    itemClicked(index) {
      switch (this.step) {
        case 0:
          this.provinceIndex = index;
          this.step = this.province.list.length > 0 ? this.step + 1 : this.step;
          break;
        case 1:
          this.cityIndex = index;
          this.step = this.city.list.length > 0 ? this.step + 1 : this.step;
          break;
        case 2:
          this.areaIndex = index;
          break;
        default:
          break;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.content {
  .tips {
    margin: 30upx;
    padding: 0 30upx;
    width: 630upx;
    height: 120upx;
    background: #ffe0da;
    align-items: center;
    border-radius: 12upx;

    text {
      font-size: 26upx;
      color: #e77136;
    }

    image {
      margin-left: 16upx;
      width: 48upx;
      height: 48upx;
    }
  }

  .container {
    width: 750upx;
    height: 750upx;
    background: white;
    overflow: hidden;

    .header {
      padding: 0 30upx;
      height: 88upx;
      align-items: center;
      justify-content: space-between;
      border-bottom: 2upx solid $color-line;
      box-sizing: border-box;

      .cancel {
        font-size: 32upx;
        color: $color-text-grey;
      }

      .title {
        font-size: 32upx;
        font-weight: bold;
        color: $color-text-black;
      }

      .confirm {
        font-size: 32upx;
        color: $color-primary;
      }
    }

    .selected-info {
      width: 750upx;
      height: 80upx;
      white-space: nowrap;
      border-bottom: 2upx solid $color-line;
      box-sizing: border-box;

      text {
        margin: 0 30upx;
        height: 80upx;
        line-height: 80upx;
        font-size: 28upx;
        color: $color-text-black;
      }

      .selected {
        color: $color-primary;
        border-bottom: 4upx solid $color-primary;
        box-sizing: border-box;
      }
    }

    .items {
      width: 750upx;
      height: 590upx;

      .item {
        height: 100upx;
        align-items: center;

        text {
          margin-left: 30upx;
          height: 100upx;
          line-height: 100upx;
          font-size: 28upx;
          color: $color-text-black;
        }

        .selected {
          color: $color-primary;
        }

        image {
          margin-left: 8upx;
          width: 36upx;
          height: 36upx;
        }
      }
    }
  }
}
</style>
