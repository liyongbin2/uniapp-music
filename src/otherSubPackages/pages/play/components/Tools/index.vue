<template>
  <view
    class="container box-border flex justify-between items-center w-screen py-[30rpx] px-[80rpx]"
  >
    <view
      :class="
        `relative ${index === 3 ? 'more' : ''} ${
          index === toolList.length - 1 ? 'together' : ''
        }`
      "
      v-for="(item, index) in toolList"
      :key="index"
      data-count="999+"
      data-desc="一起听"
    >
      <FontIcon :icon="item.icon" :color="item.color" />
    </view>
  </view>
</template>

<script setup lang="ts">
import FontIcon from "@/components/FontIcon";

import { ref } from "vue";
const toolList = ref<any[]>([
  {
    icon: "&#xe86f;",
    color: "#999999",
    label: "喜欢"
  },
  {
    icon: "&#xe60d;",
    color: "#eeeeee",
    label: "下载"
  },
  {
    icon: "&#xe619;",
    color: "#eeeeee",
    label: "多人"
  },
  {
    icon: "&#xe745;",
    color: "#eeeeee",
    label: "评论"
  },
  {
    icon: "&#xe600;",
    color: "#eeeeee",
    label: "更多"
  }
]);
</script>

<style lang="scss" scoped>
.container {
  .more {
    &::after {
      content: attr(data-count);
      @apply absolute rounded-full;
      right: -46rpx;
      top: -20rpx;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 100;
      color: #ffffff;
      font-size: 16rpx;
      padding: 4rpx 10rpx;
    }
  }
  .together {
    &::after {
      content: attr(data-desc);
      @apply absolute rounded-full;
      right: -46rpx;
      top: -20rpx;
      background-color: #fc3938;
      z-index: 100;
      color: #ffffff;
      font-size: 16rpx;
      padding: 2rpx 10rpx;
    }
  }
}
</style>
