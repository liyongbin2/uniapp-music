<template>
  <view
      class="container"
      :style="{
      backgroundImage: `url('http://p4.music.126.net/AWcDI5wc9fkS2bZt6wIm-Q==/109951163212638897.jpg?param=200y200')`
    }"
  >
    <TopBarSlot
        id="head"
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
    <view
        class="content z-10 flex-1 w-full"
        @tap="openMusicLyric"
        :style="{
        height: `${contentHeight}px`
      }"
    >
      <block v-if="!openLyric">
        <view
            id="needle"
            class="flex flex-col justify-between items-center w-full"
        >
          <!-- 黑胶播放器 -->
          <view
              class="needle-point w-[80rpx] h-[80rpx] relative rounded-full z-10"
          >
            <image
                :class="
                `switch absolute z-12 ${
                  play ? 'play-music-needle-play' : 'play-music-needle-stop'
                }`
              "
                mode="widthFix"
                src="../../../static/swith.png"
            ></image>
          </view>
          <scroll-view
              scroll-x
              scroll-with-animation
              :scroll-left="scrollLeft"
              @touchend="handleTouched($event, handlerTouched)"
              @touchstart="handleTouchStart($event, handlerTouchStart)"
              @scroll="handleScroll"
              enable-flex
              :style="{
              display: 'flex',
              flexWrap: 'nowrap',
              alignItems: 'cneter',
              height: `${scrollHeight}px`
            }"
          >
            <!-- 黑胶唱片 -->
            <view
                :class="
                `record-container ${
                  activeMusicIndex === index ? 'is-active is-animating' : ''
                } ${activeMusicIndex - 1 === index ? 'is-animating' : ''}`
              "
                v-for="(item, index) in needPlayList"
                :key="index"
                :style="{
                trnasform: `translateX(${item.translateX})`
              }"
            >
              <view
                  class="record record-rotate"
                  :style="{
                  animationPlayState: play ? 'running' : 'paused'
                }"
              >
                <image
                    class="w-[480rpx] h-[484rpx]"
                    src="../../../static/coverall.png"
                ></image>
                <image
                    class="absolute inset-1/2 translate-x-[-50%] translate-y-[-50%] w-[304rpx] h-[304rpx] rounded-full"
                    :src="item.img"
                ></image>
              </view>
            </view>
          </scroll-view>
          <Tools id="tool" />
        </view>
      </block>
      <block v-else>
        <view class="h-full">
          <Lyric />
        </view>
      </block>
    </view>
    <view id="ctl" class="bar z-10">
      <ControlBar @switchMusic="handleSwitchMusic" />
    </view>
  </view>
</template>

<script setup lang="ts">
import TopBarSlot from "@/components/TopBarSlot";
import FontIcon from "@/components/FontIcon";
import Tools from "./components/Tools";
import ControlBar from "./components/ControlBar";
import Lyric from "./components/Lyric";

import {computed, onMounted, ref} from "vue";
import {useStore} from "vuex";

import {PlayStateEnum, SwitchMusicState} from "@/store/module/musicPlayData/type";
import {TouchedInfoType, DirectionEnum} from "@/hooks/useTouched/type";
import useTouched from "@/hooks/useTouched";
import useElementInfo from "@/hooks/useElementInfo";
import {back} from "@/utils/router";
import {debounced} from "@/utils/utils";

const store = useStore();
const {handleTouchStart, handleTouched} = useTouched();

const play = computed(() => store.getters.getPlay);
const sysInfo = computed(() => store.getters.getSystemInfo);
const needPlayList = ref([
  {
    name: 1,
    img:
        "http://p4.music.126.net/AWcDI5wc9fkS2bZt6wIm-Q==/109951163212638897.jpg?param=200y200"
  },
  {
    name: 2,
    img:
        "http://p3.music.126.net/rd0iSV6zxXOytgehfIaZ8g==/109951163693273653.jpg?param=200y200"
  },
  {
    name: 3,
    img:
        "http://p3.music.126.net/FoF5_ROj-jU37263LhInsw==/109951163203287436.jpg?param=200y200"
  }
]); // 当前播放歌曲以及前后两首播放歌曲（共三首）最后一个和第一个相同，无缝衔接轮播图
const recordDomInfo = ref<any>(null);
const activeMusicIndex = ref<number>(0);
const scrollLeft = ref<number>(0);
const contentHeight = ref<number>(0);
const scrollHeight = ref<number>(0);
const openLyric = ref<boolean>(true);
onMounted(async () => {
  const domInfo = await useElementInfo(".record-container");
  if (!recordDomInfo.value) recordDomInfo.value = domInfo;
});

onMounted(() => {
  calcContentHeight();
});

async function calcContentHeight() {
  const [headDomInfo, ctlDomInfo, deedleDomInfo, toolDomInfo]: any[] = await Promise.all([
    useElementInfo("#head"),
    useElementInfo("#ctl"),
    useElementInfo("#needle"),
    useElementInfo("#tool"),
  ]);
  console.log("查看这两个dom信息", headDomInfo, ctlDomInfo, sysInfo.value);
  contentHeight.value =
      sysInfo.value.windowHeight - (headDomInfo?.height + ctlDomInfo?.height) ?? 400;
  scrollHeight.value = contentHeight.value - (deedleDomInfo?.height + toolDomInfo?.height)
}


// 触摸开始
function handlerTouchStart(e: any, data: TouchedInfoType) {

}

// // 触摸结束
function handlerTouched(e: any, data: TouchedInfoType) {
  const {direction} = data;
  console.log("触摸结束", direction);
  handlePlayNextOrPreMusicAnimation(direction as DirectionEnum | null)
}

function handleSwitchMusic(e) {
  console.log("切换歌曲", e)
  handlePlayNextOrPreMusicAnimation(e)
}

function handlePlayNextOrPreMusicAnimation(direction: DirectionEnum | null) {
  const {width} = recordDomInfo.value;
  if (!direction) return;
  if (direction === DirectionEnum.LEFT) {
    activeMusicIndex.value += 1;
    if (activeMusicIndex.value >= needPlayList.value.length) {
      activeMusicIndex.value = needPlayList.value.length - 1;
      setTimeout(() => {
        store.dispatch("switchMusicAction", SwitchMusicState.NEXT);
      }, 500)
    }

  } else {
    activeMusicIndex.value -= 1;
    if (activeMusicIndex.value < 0) activeMusicIndex.value = 0;
    else
      setTimeout(() => {
        store.dispatch("switchMusicAction", SwitchMusicState.PRE);
      }, 500)
  }
  scrollLeft.value = activeMusicIndex.value * width;
  console.log("查看滚动的距离：", activeMusicIndex.value, scrollLeft.value);
}

function openMusicLyric() {
  openLyric.value = !openLyric.value
}

const handleScroll = debounced((e: any) => {
  store.dispatch("addPlayStateAction", PlayStateEnum.STOP);
}, 50, true);
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
  @apply relative bg-cover flex flex-col gap-[20rpx] w-full z-10 h-screen overflow-y-hidden;
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

    .switch {
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

  .is-animating {
    transition: transform 0.4s ease-in-out;
  }

  scroll-view {
    @apply relative;
    &::after {
      content: "";
      @apply absolute rounded-full;
      left: 50%;
      top: 190rpx;
      transform: translateX(-50%);
      width: 440rpx;
      height: 440rpx;
      background-color: rgba(0, 0, 0, 0.2);
      z-index: -1;
    }
  }

  .record-container {
    @apply w-full flex items-start justify-center shrink-0 relative;
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
