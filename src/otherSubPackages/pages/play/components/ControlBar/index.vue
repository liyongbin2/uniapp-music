<template>
  <view class="container">
    <ProgressBar/>
    <view class="flex justify-between items-center gap-[30rpx] px-[80rpx] py-[30rpx]">
      <!-- 播放模式 -->
      <view><FontIcon icon="&#xe6a3;" size="64rpx" /></view>
      <!-- 上一首 -->
      <FontIcon icon="&#xe722;" size="64rpx" />
      <!-- 播放暂停 -->
      <view @tap="handlePlayMusic">
        <FontIcon v-if="play" icon="&#xe68f;" size="84rpx" />
        <FontIcon v-else icon="&#xe691;" size="84rpx" />
      </view>
      <!-- 下一首 -->
      <FontIcon icon="&#xe72a;" size="64rpx" />
      <!-- 歌单 -->
      <FontIcon icon="&#xe716;" size="64rpx" />
    </view>
  </view>
</template>

<script setup lang="ts">
import FontIcon from "@/components/FontIcon";
import ProgressBar from "../ProgressBar";

import { computed } from "vue";
import { useStore } from "vuex";

import { PlayStateEnum } from "@/store/module/musicPlayData/type";

const store = useStore();

const play = computed(() => store.getters.getPlay);
function handlePlayMusic() {
  if (play.value) store.dispatch("addPlayStateAction", PlayStateEnum.STOP);
  else store.dispatch("addPlayStateAction", PlayStateEnum.PLAY);
}
</script>

<style lang="scss" scoped>
.container {
}
</style>
