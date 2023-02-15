<template>
  <view class="container">
    <TopBarSlot>
      <view class="px-[20rpx] flex items-center gap-2">
        <image
          src="../../static/expand.png"
          @tap="handleOpenPop"
          class="w-[32px] h-[32px]"
        ></image>
        <!-- 发现顶部 -->
        <block v-if="true">
          <view
            class="flex items-center flex-1 search rounded-3xl py-[16rpx] px-[20rpx] bg-[#3a333b] flex gap-[10rpx]"
          >
            <FontIcon icon="&#xe61f;" size="32rpx" />
            <view
              @tap="push('/otherSubPackages/pages/search/index')"
              class="flex-1 text-[#918a91]"
            >
              {{ searchRecommend }}
            </view>
            <FontIcon icon="&#xe631;" size="32rpx" />
          </view>
        </block>
        <!-- 我的 顶部 -->
        <block v-else-if="false"></block>
        <!-- 关注 顶部 -->
        <block v-else-if="false"></block>
        <!-- 社区 顶部 -->
        <block v-else-if="false"></block>
      </view>
    </TopBarSlot>
    <Popup
      position="left"
      :open="openMenuPanel"
      @close="handleClosePop"
      :customStyle="customStyle"
    >
      <!-- 菜单头部 -->
      <view
        id="menuHead"
        class="menu-panel-head flex flex-col justify-end px-[20rpx] pb-[30rpx]"
        :style="{
          paddingTop: `${navHeight - menuBottomInfo.height || 30}px`,
          backgroundColor: headBg,
          transition: 'background-color 0.5s linear'
        }"
      >
        <view
          class="flex gap-[20rpx] items-center"
          :style="{
            height: `${menuBottomInfo.height}px`
          }"
        >
          <image
            class="w-[40rpx] h-[40rpx] rounded-full"
            src="https://p2.music.126.net/gM3rXJOkzPP4RmUXeu_Z0Q==/109951165141674000.jpg?param=30y30"
          ></image>
          <view class="flex gap-[10rpx] items-center flex-1">
            <text>飞飞飞会飞的噜噜噜</text>
            <FontIcon icon="&#xe6b5;" size="32rpx" />
          </view>
          <FontIcon icon="&#xe631;" size="40rpx" />
        </view>
      </view>

      <view
        class="flex flex-col gap-[30rpx] overflow-y-auto p-[20rpx]"
        :style="{
          height: `calc(100% - ${navHeight}px)`
        }"
      >
        <!-- vip ad -->
        <view class="vip-card rounded-lg p-[20rpx] flex flex-col gap-[50rpx]">
          <view class="flex items-start justify-between">
            <view class="flex flex-col">
              <text class="text-2xl text-[#e8cfce] font-bold">续费黑胶VIP</text>
              <text class="mt-[10rpx] text-[#917f81] text-sm">
                <text>立即享受21项专属特权</text>
                <text class="ml-1">&gt;</text>
              </text>
            </view>
            <view
              class="rounded-3xl text-sm text-[#917f81] border-solid border-[1px] border-[#917f81] px-[20rpx] py-[10rpx]"
            >
              会员中心
            </view>
          </view>
          <view
            class="vip-ad relative flex items-center justify-between text-[#917f81]"
          >
            <text>专享优惠！黑胶VIP仅需￥0.1/天！</text>
            <image
              class="w-[40rpx] h-[40rpx] rounded-md"
              src="https://p2.music.126.net/gM3rXJOkzPP4RmUXeu_Z0Q==/109951165141674000.jpg?param=30y30"
            ></image>
          </view>
        </view>
        <!-- 剩下的一些card -->
        <view
          class="card rounded-lg bg-[#2c2c2c]"
          v-for="(item, index) in otherCards"
          :key="index"
        >
          <view
            class="card-title p-[20rpx] text-sm text-[#858585]"
            v-if="item.title"
          >
            {{ item.title }}
          </view>
          <view
            class="py-[20rpx] pr-[20rpx] ml-[20rpx] flex items-center gap-[20rpx]"
            v-for="ite in item.list"
            :key="ite.name"
          >
            <FontIcon icon="&#xe717;" size="32rpx" />
            <!-- <span class="iconfont text-white" v-html="ite.icon"></span> -->
            <view class="text-xl flex-1">{{ ite.name }}</view>
            <view class="flex gap-[10rpx] items-center">
              <text v-if="ite.desc">{{ ite.desc }}</text>
              <FontIcon icon="&#xe6b5;" size="32rpx" />
            </view>
          </view>
        </view>
        <view
          class="rounded-lg bg-[#2c2c2c] p-[20rpx] text-center text-4xl text-rose-700 font-bold"
        >
          退出登录
        </view>
      </view>
    </Popup>
  </view>
</template>

<script setup lang="ts">
import TopBarSlot from "@/components/TopBarSlot";
import FontIcon from "@/components/FontIcon";
import Popup from "@/components/Popup";

import { computed, getCurrentInstance, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { push } from "@/utils/router";

const store = useStore();
const navHeight = computed(() => store.getters.getNavHeight);
const menuBottomInfo = computed(() => store.getters.getMenuButtonInfo);
const searchRecommend = ref<string>("月亮代表我的心");
const openMenuPanel = ref<boolean>(false);
const headBg = ref<string>("inhert");
const customStyle = ref<any>({
  background: "#1c1c1e",
  width: "70%",
  display: "flex",
  flexDirection: "column",
  overflowY: "scroll"
});
const otherCards = ref<any[]>([
  {
    title: "",
    list: [
      {
        icon: "&#xe717;",
        name: "我的消息",
        desc: ""
      },
      {
        icon: "&#xe717;",
        name: "云贝中心",
        desc: "签到"
      },
      {
        icon: "&#xe717;",
        name: "创作者中心",
        desc: ""
      }
    ]
  },
  {
    title: "音乐服务",
    list: [
      {
        icon: "&#xe728;",
        name: "免费听歌",
        desc: ""
      },
      {
        icon: "&#xe728;",
        name: "云村有票",
        desc: ""
      },
      {
        icon: "&#xe728;",
        name: "商城",
        desc: "智能真无线直降210"
      },
      {
        icon: "&#xe728;",
        name: "Beta专区",
        desc: ""
      },
      {
        icon: "&#xe728;",
        name: "口袋彩铃",
        desc: ""
      },
      {
        icon: "&#xe728;",
        name: "游戏专区",
        desc: "音乐浇灌治愈花园"
      }
    ]
  },
  {
    title: "其他",
    list: [
      {
        icon: "&#xe728;",
        name: "设置",
        desc: ""
      },
      {
        icon: "&#xe728;",
        name: "定时关闭",
        desc: ""
      },
      {
        icon: "&#xe728;",
        name: "个性装扮",
        desc: ""
      },
      {
        icon: "&#xe728;",
        name: "边听边存",
        desc: ""
      },
      {
        icon: "&#xe728;",
        name: "在线听歌免流量",
        desc: ""
      },
      {
        icon: "&#xe728;",
        name: "音乐黑名单",
        desc: ""
      }
    ]
  }
]);
onMounted(() => {
  handleScroll();
});
function handleOpenPop() {
  openMenuPanel.value = true;
}
function handleClosePop() {
  openMenuPanel.value = false;
}
function handleScroll() {
  const _this = getCurrentInstance();
  uni
    .createIntersectionObserver(_this)
    .relativeTo("#menuHead", { top: 0 })
    .observe(".vip-card", res => {
      const { intersectionRect, boundingClientRect } = res;
      if (intersectionRect.top == 0 && boundingClientRect.top > 0)
        headBg.value = "inhert";
      else headBg.value = "#2c2c2c";
    });
}
</script>

<style lang="scss" scoped>
::-webkit-scrollbar {
  width: 0;
  height: 0;
  background-color: transparent;
}
.vip-card {
  background: linear-gradient(
    30deg,
    rgba(59, 55, 54, 1) 15%,
    rgba(94, 76, 74, 1) 89%
  );
}
.vip-ad::before {
  content: "";
  @apply absolute;
  top: -25rpx;
  left: 0;
  right: 0;
  border: 1rpx solid #eeeeee;
}
.card-title {
  border-bottom: 1px solid #858585;
}
</style>
