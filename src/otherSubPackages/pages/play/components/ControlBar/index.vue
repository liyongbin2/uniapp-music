<template>
  <view class="container">
    <ProgressBar />
    <view
      class="flex justify-between items-center gap-[30rpx] px-[80rpx] py-[30rpx]"
    >
      <!-- 播放模式 -->
      <view><FontIcon icon="&#xe6a3;" size="64rpx" /></view>
      <!-- 上一首 -->
      <FontIcon icon="&#xe722;" size="64rpx" @click="switchMusic(-1)" />
      <!-- 播放暂停 -->
      <view>
        <!-- 点击暂停 -->
        <FontIcon
          @click="handlePlayMusic(false)"
          v-if="play"
          icon="&#xe68f;"
          size="84rpx"
        />
        <!-- 点击播放 -->
        <FontIcon
          @click="handlePlayMusic(true)"
          v-else
          icon="&#xe691;"
          size="84rpx"
        />
      </view>
      <!-- 下一首 -->
      <FontIcon icon="&#xe72a;" size="64rpx" @click="switchMusic(1)" />
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

import {
  PlayStateEnum,
  SwitchMusicState
} from "@/store/module/musicPlayData/type";
import {DirectionEnum} from "@/hooks/useTouched/type";

type ControlBarEmitsType = {
  (event: "switchMusic"): void;
}

const emits = defineEmits<ControlBarEmitsType>()
const store = useStore();

const play = computed(() => store.getters.getPlay);
function switchMusic(type: number) {
  if (type > 0) {
    store.dispatch("switchMusicAction", SwitchMusicState.NEXT);
    emits("switchMusic",DirectionEnum.LEFT)
  }
  else {
    store.dispatch("switchMusicAction", SwitchMusicState.PRE);
    emits("switchMusic",DirectionEnum.RIGHT)
  }

}
async function handlePlayMusic(isPlay:boolean) {
  console.log("播放歌曲：", play.value);
  await store.dispatch(
    "addPlayStateAction",
    isPlay? PlayStateEnum.PLAY : PlayStateEnum.PAUSE
  );
  console.log("查看播放状态：",play.value);
}
</script>

<style lang="scss" scoped>
.container {
}
</style>
