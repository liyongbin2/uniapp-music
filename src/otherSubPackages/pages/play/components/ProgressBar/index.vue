<template>
  <view class="container px-[20rpx] gap-[20rpx] rounded-sm flex items-center">
    <text>00.00</text>
    <view
      class="progress-container bg-transparent py-[20rpx] flex-1 w-full"
      @touchmove="handleTouchMove"
      @touchstart="handleTouchStart"
    >
      <view
        class="progress"
        :style="{
          '--percen': `${musicSpeedPercen}%`
        }"
      ></view>
    </view>
    <text>04.32</text>
  </view>
</template>

<script setup lang="ts">
import { getCurrentInstance, onMounted, ref } from "vue";
import useElementInfo from "@/hooks/useElementInfo";
import { throttle } from "@/utils/utils";
import store from "../../../../../store";

const musicSpeedPercen = ref<number>(0);
const progressBarWidth = ref<number>(0);
onMounted(() => {
  // setInterval(() => {
  //   if (musicSpeedPercen.value < 100) musicSpeedPercen.value += 1;
  // }, 1000);
  handleProgressBarDom();
});

async function handleProgressBarDom() {
  const info = await useElementInfo(".progress-container");
  console.log("获取进度条节点信息：", info);
  const { width } = info;
  progressBarWidth.value = width as number;
}

const handleTouchMove = throttle((e: any) => {
  const { offsetLeft } = e.currentTarget;
  const [{ pageX }] = e.changedTouches;
  handleCalcProgressPercent(pageX, offsetLeft);
}, 50);
function handleTouchStart(e: any) {
  const { offsetLeft } = e.currentTarget;
  const [{ pageX }] = e.changedTouches;
  handleCalcProgressPercent(pageX, offsetLeft);
}
function handleCalcProgressPercent(pageX: number, offsetLeft: number) {
  let percent = ((pageX - offsetLeft) / progressBarWidth.value) * 100;
  if (percent < 0) percent = 0;
  else if (percent > 99) percent = 100;
  console.log("计算百分比：", percent);
  musicSpeedPercen.value = percent;
  store.dispatch("addPercentAction",{
    percent,
    seek: true
  })
}
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
