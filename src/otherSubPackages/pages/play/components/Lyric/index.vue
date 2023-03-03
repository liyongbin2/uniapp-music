<template>
  <view class="container flex flex-col w-full h-full p-[20rpx]">
    <view class="flex justify-between" :style="{
      '--left': left
    }">
      <FontIcon icon="&#xe60b;" />
      <view class="tabs" @tap.native.stop="handleChangeTab">
        <view class="flex-1">歌词</view>
        <view class="flex-1">百科</view>
      </view>
      <FontIcon icon="&#xe7de;" />
    </view>
      <view class="flex-1 flex flex-col gap-[20rpx] items-center justify-center py-[80rpx] overflow-y-auto">
        <block v-if="activeTab === 0">
          <view class="lyric-list">
            <view :style="{
              color: item === 8?'#ffffff':'#c1c1c1'
            }" v-for="item in 40">
              电视一直闪{{ item }}
            </view>
          </view>
        </block>
        <block v-else>
          <view>
            百科
          </view>
        </block>
      </view>
    <view class="flex justify-between">
      <FontIcon icon="&#xe61c;" />

      <FontIcon icon="&#xe600;" />
    </view>
  </view>
</template>
<script setup lang="ts">
import FontIcon from "@/components/FontIcon"
import {getCurrentInstance, onMounted, ref} from "vue";

const activeTab = ref<number>(0)
const left = ref<number | string>(0)

onMounted(() => {

})

function handleChangeTab() {
  activeTab.value = activeTab.value ? 0 : 1
  left.value = activeTab.value ? "50%" : 0
}
</script>

<style>
.container {
  --left: 0;
}
</style>
<style lang="scss" scoped>

.tabs {
  @apply flex items-center justify-center rounded-full overflow-hidden relative bg-transparent;
  border: 1px solid rgba(255, 255, 255, .3);

  &::after {
    content: "";
    @apply absolute rounded-full;
    left: var(--left);
    top: 0;
    bottom: 0;
    width: 50%;
    background-color: rgba(255, 255, 255, .3);
    transition: left 0.5s;
  }

  view {
    @apply px-[26rpx] py-[4rpx];
  }
}

.lyric-list {
  @apply relative flex flex-col gap-[20rpx] my-[80rpx] overflow-y-auto h-[700rpx] box-border;
  &::-webkit-scrollbar {
    width: 0;
    height: 0;
    background-color: transparent;
  }
}
</style>