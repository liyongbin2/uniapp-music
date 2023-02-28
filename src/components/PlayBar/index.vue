<template>
  <view class="container flex items-center gap-[10rpx] py-[10rpx] p-[20rpx]">
    <image
      class="w-[80rpx] h-[80rpx]"
      src="https://p2.music.126.net/gM3rXJOkzPP4RmUXeu_Z0Q==/109951165141674000.jpg?param=30y30"
    ></image>
    <view class="flex items-center gap-[10rpx] flex-1">
      <text>《这么近，这么远》</text>
      <text class="text-[#918a91]">-</text>
      <text class="text-[#918a91]">张学友</text>
    </view>
    <view class="flex items-center gap-[40rpx]">
      <AnnularPlayBar />
      <FontIcon icon="&#xe716;" color="#ffffff" />
    </view>
  </view>
</template>

<script setup lang="ts">
import AnnularPlayBar from "./components/AnnularPlayBar";
import FontIcon from "@/components/FontIcon";
</script>

<style lang="scss" scoped>
.container {
  background-color: #21212b;
}
</style>
