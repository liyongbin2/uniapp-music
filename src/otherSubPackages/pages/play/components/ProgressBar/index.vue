<template>
  <view class="container px-[20rpx] gap-[20rpx] rounded-sm flex items-center">
    <text>00.00</text>
    <view
      class="progress flex-1 w-full"
      :style="{
        '--percen': `${misicSpeedPercen}%`
      }"
    ></view>
    <text>04.32</text>
  </view>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

const misicSpeedPercen = ref<number>(0);
onMounted(() => {
  setInterval(() => {
    if (misicSpeedPercen.value < 100) misicSpeedPercen.value += 1;
  }, 1000);
})
</script>

<style lang="scss" scoped>
.container {
  .progress {
    @apply relative;
    background-color: rgba(241, 240, 237, 0.2);
    height: 2px;
    &::before {
      content: "";
      @apply absolute;
      left: 0;
      top: 0;
      height: 2px;
      background-color: rgba(241, 240, 237, 1);
      width: var(--percen);
    }
    &::after {
      content: "";
      @apply absolute rounded-full;
      left: var(--percen);
      top: 50%;
      transform: translate3d(-50%, -50%, 0);
      height: 8rpx;
      width: 8rpx;
      background-color: rgba(241, 240, 237, 1);
    }
  }
}
</style>
