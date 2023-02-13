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
    <view class="ad" v-if="!isCloseAd">
      <image
        class="w-full h-full rounded-md"
        mode="widthFix"
        src="https://image.woshipm.com/wp-files/2018/04/z8rOb4Ed28OkfWXv0Vd5.jpg"
      ></image>
      <view class="absolute top-1 right-1" @click="handleOpenPop">
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
      id="scrollView"
      :scroll-x="true"
      :scroll-y="false"
      :scroll-left="scrollTopListViewLeft"
      scroll-with-animation
      class="p-[20rpx] w-auto"
      style="white-space: nowrap;"
      @scroll="handleTouchmove"
    >
      <view
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
          <view class="m-[20rpx] flex flex-col gap-[20rpx]">
            <view class="top-list-item" v-for="(item, idx) in 13" :key="idx">
              <text class="ranking">{{ idx + 1 }}</text>
              <text>歌曲{{ item }}</text>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
    <Popup
      officeTop="40%"
      v-model:open="openPop"
      :customStyle="{
        background: '#1c1c1e',
        width: '80%',
        padding: '40rpx 30rpx'
      }"
    >
      <view class="w-full h-full relative">
        <view class="text-3xl mb-[40rpx] font-bold">选择理由，精准屏蔽</view>
        <view class="flex flex-col gap-[30rpx]">
          <text class="text-xl w-fit text-[#a1a2a4]" v-for="item in closeAdReason" :key="item">
            {{ item }}
          </text>
        </view>
        <view class="bg-[#98989a] rounded-full close-pop-btn" @tap="handleCloseAd">
           <FontIcon icon="&#xeaf2;" size="26rpx" />
        </view>
      </view>
    </Popup>
  </view>
</template>

<script setup lang="ts">
import TopBarSlot from "@/components/TopBarSlot";
import FontIcon from "@/components/FontIcon";

import { ref, getCurrentInstance, onMounted } from "vue";

import Popup from "@/components/Popup"

import {debounced} from "@/utils/utils"

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
const scrollViewDomInfo = ref<any>(null);
const showTopListItemIndex = ref<number>(0); // 榜单item完全显示的下标
const scrollDistance = ref<number>(0)
const scrollTopListViewLeft = ref<number>(0)
const openPop = ref<boolean>(true); // 弹窗
const closeAdReason = ref<string[]>(["不感兴趣","看过了","虚假内容","素材质量差"])

function handleOpenPop() {
  console.log("打开弹窗");
  openPop.value = true
}
function handleCloseAd() {
  console.log("点击关闭广告");
  openPop.value = false;
  isCloseAd.value = true;
}

onMounted(() => {
  getTopListAllDomInfo();
});

function getTopListAllDomInfo() {
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
  query
    .select("#scrollView")
    .fields(
      {
        size: true,
        rect: true,
        scrollOffset: true
      },
      data => {
        if (!scrollViewDomInfo.value) scrollViewDomInfo.value = data;
      }
    )
    .exec();
  console.log("查看节点信息：", topListDomInfo.value);
}

// 开始滑动榜单
const handleTouchmove = debounced((e: any) => {
  console.log("开始滑动", e);
  const { scrollLeft } = e.detail;
  scrollDistance.value = scrollLeft

},200)
// 榜单触摸开始
function handleTouchStart(e: any) {
  console.log("榜单触摸开始", e);

}
// 榜单触摸结束
function handleTouchEnd(e: any) {
  console.log("榜单触摸结束", e);
  handleTopScrollView()
}
function handleTopScrollView() {
  const i = Math.round(scrollDistance.value/(topListDomInfo.value[`#topList${showTopListItemIndex.value}`]?.width ?? 260))
  showTopListItemIndex.value = i
  scrollTopListViewLeft.value = topListDomInfo.value[`#topList${showTopListItemIndex.value}`].left - 10
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
.top-list-item {
  @apply flex gap-[20rpx];
  color: #a1a2a4;
  text:first-child {
    @apply font-bold;
  }
  &:nth-of-type(-n + 3) {
    text:first-child {
      color: #c8343b;
    }
    text:last-child {
      color: #ffffff;
    }
  }
}
.close-pop-btn {
  @apply absolute text-center;
  left: 50%;
  bottom: -200rpx;
  transform: translateX(-50%);
  line-height: 50rpx;
  width: 50rpx;
  height: 50rpx;
}
</style>
