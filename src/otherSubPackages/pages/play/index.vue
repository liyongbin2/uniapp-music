<template>
  <view
    class="container relative bg-cover flex flex-col gap-[20rpx] h-full w-full z-10"
    :style="{
      backgroundImage: `url('http://p4.music.126.net/AWcDI5wc9fkS2bZt6wIm-Q==/109951163212638897.jpg?param=200y200')`
    }"
  >
    <TopBarSlot
      :customStyle="{
        background: 'transparent',
        position: 'relative',
        zIndex: '100'
      }"
    >
      <view class="flex items-center gap-[20rpx] px-[20rpx]">
        <FontIcon icon="&#xe64e;" size="32rpx" @click="back" />
        <view
          class="flex-1 text-center flex flex-col justify-center items-center"
        >
          <text class="text-lg">年少有为</text>
          <view class="flex gap-[6rpx] items-center justify-center text-sm">
            <text class="singer">李荣浩</text>
            <view
              class="px-[6rpx] py-[2rpx] rounded-sm text-white bg-[#999999]"
            >
              关注
            </view>
          </view>
        </view>
        <view class="flex items-center gap-[30rpx]">
          <view
            class="user relative flex items-center justify-center w-[44rpx] h-[44rpx] rounded-full bg-white"
          >
            <image
              class="w-[40rpx] h-[40rpx] rounded-full"
              src="https://p2.music.126.net/gM3rXJOkzPP4RmUXeu_Z0Q==/109951165141674000.jpg?param=30y30"
            ></image>
          </view>
          <FontIcon icon="&#xe799;" size="32rpx" />
        </view>
      </view>
    </TopBarSlot>
    <view class="content flex-1 z-10 h-full w-full">
      <block v-if="true">
        <view class="flex flex-col justify-between items-center h-full w-full">
          <!-- 黑胶播放器 -->
          <view
            class="needle-point w-[80rpx] h-[80rpx] relative rounded-full z-10"
          >
            <image
              :class="
                `swith absolute ${
                  play ? 'play-music-needle-play' : 'play-music-needle-stop'
                }`
              "
              mode="widthFix"
              src="../../../static/swith.png"
            ></image>
          </view>
          <scroll-view scroll-x enable-flex :style="{
            display: 'flex',
            flex: 1,
            height: '100%'
          }">
            <!-- 黑胶唱片 -->
            <view class=" w-full flex items-start justify-center shrink-0"
             v-for="(item,index) in needPlayList" :key="index">
              <view
                class="record record-rotate"
                :style="{
                  animationPlayState: play ? 'running' : 'paused'
                }"
              >
                <image
                  mode="widthFix"
                  class="w-full"
                  src="../../../static/coverall.png"
                ></image>
                <image
                  class="absolute inset-1/2 translate-x-[-50%] translate-y-[-50%] w-[300rpx] h-[300rpx] rounded-full"
                  src="http://p4.music.126.net/AWcDI5wc9fkS2bZt6wIm-Q==/109951163212638897.jpg?param=200y200"
                ></image>
              </view>
            </view>
          </scroll-view>
          <view class="w-full">
            <Tools />
          </view>
        </view>
      </block>
      <block v-else>
        <view>歌词界面</view>
      </block>
    </view>
    <view class="bar z-10 h-[128rpx]" @tap="handlePlayMusic">底部</view>
  </view>
</template>

<script setup lang="ts">
import TopBarSlot from "@/components/TopBarSlot";
import FontIcon from "@/components/FontIcon";
import Tools from "./components/Tools";

import { computed, ref } from "vue";
import { useStore } from "vuex";

import { back } from "@/utils/router";

const store = useStore();

const play = computed(() => store.getters.getPlay);
const needPlayList = ref([1,2,3,1]); // 当前播放歌曲以及前后两首播放歌曲（共三首）最后一个和第一个相同，无缝衔接轮播图

function handlePlayMusic() {
  if (play.value) store.dispatch("addPlayAction", false);
  else store.dispatch("addPlayAction", true);
}
</script>
<style>
page {
  @apply w-full h-full;
}
</style>
<style lang="scss" scoped>
@keyframes GreenDot {
  0% {
    transform: scale(1);
    border-color: rgba(255, 255, 255, 1);
    opacity: 1;
  }
  30% {
    opacity: 1;
  }
  100% {
    transform: scale(1.6);
     border-color: rgba(255, 255, 255, 0);
    opacity: 0;
  }
}

@keyframes Rotate {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.container {
  z-index: 10;
  &::after {
    content: "";
    @apply absolute inset-0;
    backdrop-filter: blur(30px);
    z-index: -1;
  }
  .user {
    &::before {
      content: "";
      @apply absolute inset-0 rounded-full;
      border: 1px solid #ffffff;
      animation: GreenDot 2s ease-out 1s infinite;
    }
    &::after {
      content: "";
      @apply absolute inset-0 rounded-full;
      border: 1px solid #ffffff;
      animation: GreenDot 2s ease-out 0s infinite;
    }
  }
  .bar {
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
  }
  .needle-point {
    background-color: rgba(0, 0, 0, 0.4);
    .swith {
      transform-origin: 20rpx 20rpx;
      transition: all 0.5s; 
    }
    .play-music-needle-play {
      transform: rotate(30deg);
      left: 15rpx;
      top: 0;
    }
    .play-music-needle-stop {
      transform: rotate(-30deg);
      left: 0;
      top: 14rpx;
    }
    image {
      @apply w-[200rpx];
      left: 0;
      top: 14rpx;
      transition: rotate;
      transform: rotate(-30deg);
    }
  }
  .record {
    @apply relative w-[480rpx] rounded-full mt-[180rpx];
  }
  .record-rotate {
    animation-name: Rotate;
    animation-fill-mode: both;
    animation-duration: 6s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  }
}
:deep(.uni-scroll-view-content) {
  display: flex;
}
</style>
