<template>
  <view class="container">
    <TopBarSlot>
      <view class="flex items-center gap-[20rpx] mx-[20rpx]">
        <FontIcon icon="&#xe64e;" size="32rpx" />
        <view
          class="py-[10rpx] px-[20rpx] flex-1 flex items-center gap-[20rpx] rounded-3xl bg-[#3a333b]"
        >
          <FontIcon icon="&#xe61f;" size="28rpx" />
          <input placeholder="哈哈" />
        </view>
        <view>搜索</view>
      </view>
    </TopBarSlot>
    <!-- 分类 -->
    <view class="flex px-[30rpx] justify-between">
      <view
        v-for="item in categoryList"
        :key="item.cateName"
        class="flex gap-[10rpx] py-[30rpx]"
      >
        <image class="w-[32rpx] h-[32rpx]" :src="item.icon"></image>
        <text>{{ item.cateName }}</text>
      </view>
    </view>
    <!-- 广告位置 -->
    <view :class="`ad ${isCloseAd && 'puff-out-center'}`">
      <image
        class="w-full h-full rounded-md"
        mode="widthFix"
        src="https://image.woshipm.com/wp-files/2018/04/z8rOb4Ed28OkfWXv0Vd5.jpg"
      ></image>
      <view class="absolute top-1 right-1" @click="handleCloseAd">
        <FontIcon icon="&#xe609;" size="32rpx" />
      </view>
    </view>
    <!-- 猜你喜欢 -->
    <view class="mx-[20rpx]">
      <view class="flex items-center justify-between mb-[20rpx]">
        <text class="font-bold">猜你喜欢</text>
        <FontIcon icon="&#xe618;" size="36rpx" />
      </view>
      <scroll-view :scroll-x="true" :scroll-y="false">
        <view class="flex items-center gap-[10rpx] flex-nowrap">
          <view
            v-for="(item, index) in 10"
            class="flex items-center gap-[6rpx] w-fit shrink-0 rounded-3xl px-[20rpx] py-[10rpx] bg-[#32323a] text-[#a7a7b0]"
            :key="index"
          >
            <FontIcon icon="&#xe66c;" size="32rpx" color="#ec3738" />
            <view>三体版权争夺战{{ item }}</view>
          </view>
        </view>
      </scroll-view>
    </view>
    <!-- 歌榜 -->
    <scroll-view
      :scroll-x="true"
      :scroll-y="false"
      class="p-[20rpx] w-auto"
      @scroll="handleTouchmove"
    >
      <view
        id="topList"
        class="flex gap-[20rpx] items-center flex-nowrap"
        @touchend="handleTouchEnd"
        @touchstart="handleTouchStart"
      >
        <view
          :id="`topList${index}`"
          class="shrink-0 w-[520rpx] bg-[#32323a] rounded-lg"
          v-for="(item, index) in 6"
          :key="index"
        >
          <view
            class="top-list-head relative flex items-center gap-[20rpx] px-[20rpx] py-[30rpx]"
          >
            <view class="name text-[26rpx] font-bold">热搜榜{{ item }}</view>
            <view
              class="flex items-center rounded-3xl bg-[#3b3b42] gap-[6rpx] px-[10rpx] py-[10rpx]"
            >
              <FontIcon icon="&#xe61c;" size="26rpx" />
              <text>播放</text>
            </view>
          </view>
          <!-- 榜单列表 -->
          <view class="m-[20rpx]">榜单列表</view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import TopBarSlot from "@/components/TopBarSlot";
import FontIcon from "@/components/FontIcon";

import { ref, getCurrentInstance, onMounted } from "vue";

export type CategoryListType = {
  icon: string;
  cateName: string;
  path: string;
};

const categoryList = ref<CategoryListType[]>([
  {
    icon: "../../../static/images/singer.png",
    cateName: "歌手",
    path: ""
  },
  {
    icon: "../../../static/images/genre.png",
    cateName: "曲风",
    path: ""
  },
  {
    icon: "../../../static/images/zone.png",
    cateName: "专区",
    path: ""
  },
  {
    icon: "../../../static/images/recognize-music.png",
    cateName: "识曲",
    path: ""
  }
]);
const isCloseAd = ref<boolean>(false);
const topListDomInfo = ref<any>({});
const showTopListItemIndex = ref<number>(0); // 榜单item完全显示的下标
const topListMoveFirstLeftPosition = ref<number | null>(null);
const topListMoveEndLeftPosition = ref<number | null>(null);

function handleCloseAd() {
  console.log("点击关闭广告");
  isCloseAd.value = true;
}

onMounted(() => {
  getTopListAllDomInfo();
});

function getTopListAllDomInfo() {
  console.log("香蕉");
  const _this = getCurrentInstance();
  const query = uni.createSelectorQuery().in(_this);
  for (let i = 0; i < 6; i++) {
    const itemId = "#topList" + i;
    query
      .select(itemId)
      .boundingClientRect(data => {
        if (!topListDomInfo.value[itemId]) topListDomInfo.value[itemId] = data;
      })
      .exec();
  }
  console.log("查看节点信息：", topListDomInfo.value);
}

// 开始滑动榜单
function handleTouchmove(e: any) {
  console.log("开始滑动", e);
  const { scrollLeft } = e.detail;
  if (topListMoveFirstLeftPosition.value === null)
    topListMoveFirstLeftPosition.value = scrollLeft;
  topListMoveEndLeftPosition.value = scrollLeft;
}
// 榜单触摸开始
function handleTouchStart(e: any) {
  console.log("榜单触摸开始", e);
  topListMoveFirstLeftPosition.value = null;
  topListMoveEndLeftPosition.value = null;
}
// 榜单触摸结束
function handleTouchEnd(e: any) {
  console.log("榜单触摸结束", e);
  calcTopListMoveDistance();
}
// 计算榜单滑动距离（左滑或者右滑）
function calcTopListMoveDistance(): void {
  console.log(
    "查看123：",
    topListMoveFirstLeftPosition.value,
    topListMoveEndLeftPosition.value
  );
  if (
    topListMoveFirstLeftPosition.value === null ||
    topListMoveEndLeftPosition.value === null
  )
    return;
  const distance =
    topListMoveEndLeftPosition.value - topListMoveFirstLeftPosition.value;
  console.log("滑动的距离为：", distance);
  const showActiveIndex = calcShowTopListItemIndex(distance);
  console.log("要显示的索引下标：", showActiveIndex);
  showTopListItemIndex.value = showActiveIndex;
}

function calcShowTopListItemIndex(distance: number): number {
  const activeDomItem =
    topListDomInfo.value[`#topList${showTopListItemIndex.value}`];
  console.log("查看这个Item：", activeDomItem);
  let activeIndex = showTopListItemIndex.value;
  let addCount: number = 0;
  if (activeDomItem) {
    if (
      Math.abs(distance) > activeDomItem.width / 2 &&
      distance < activeDomItem
    )
      addCount = 1;
    else if (Math.abs(distance) > activeDomItem.width) addCount = 2;
    if (distance > 0) {
      // 右滑动
      activeIndex += addCount;
    } else {
      // 左滑动
      activeIndex -= addCount;
    }
    if (activeIndex > topListDomInfo.value.length - 1)
      activeIndex = topListDomInfo.value.length - 1;
    else if (activeIndex < 0) activeIndex = 0;
  }
  return activeIndex;
}
</script>

<style lang="scss" scoped>
.ad {
  @apply m-[20rpx] relative;
}
.ad::before {
  content: "广告";
  @apply rounded-sm text-white absolute;
  left: 8rpx;
  top: 8rpx;
  background-color: rgba(0, 0, 0, 0.4);
  padding: 0 4rpx;
  font-size: 20rpx;
}
.top-list-head::after {
  content: "";
  @apply absolute;
  height: 2rpx;
  width: 90%;
  left: 50%;
  bottom: 0;
  transform: translate3d(-50%, 0, 0);
  background-color: #3b3b42;
}
</style>
