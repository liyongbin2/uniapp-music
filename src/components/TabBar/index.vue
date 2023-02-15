<template>
  <view class="container fixed bottom-0 left-0 right-0 flex items-center">
    <view
      class="flex flex-col items-center justify-center box-border flex-1 gap-[10rpx] p-[20rpx] h-[128rpx]"
      v-for="(item, index) in list"
      :key="item.text"
      @tap="redirect(item.pagePath)"
    >
      <image
        class="w-[48rpx] h-[48rpx]"
        :src="index === activeTabIndex ? item.selectedIconPath : item.iconPath"
      ></image>
      <text
        :style="{
          color: index === activeTabIndex ? '#E93323' : '#ffffff'
        }"
      >
        {{ item.text }}
      </text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

import { redirect, getRoute } from "@/utils/router";
const activeTabIndex = ref<number>(0);
const list = ref<any[]>([
  {
    pagePath: "/pages/index/index",
    text: "发现",
    iconPath: "/static/images/tabBar/discover.png",
    selectedIconPath: "/static/images/tabBar/discover-active.png"
  },
  {
    pagePath: "/pages/my/index",
    text: "我的",
    iconPath: "/static/images/tabBar/music.png",
    selectedIconPath: "/static/images/tabBar/music-active.png"
  },
  {
    pagePath: "/pages/follow/index",
    text: "关注",
    iconPath: "/static/images/tabBar/attention.png",
    selectedIconPath: "/static/images/tabBar/attention-active.png"
  },
  {
    pagePath: "/pages/community/index",
    text: "社区",
    iconPath: "/static/images/tabBar/community.png",
    selectedIconPath: "/static/images/tabBar/community-active.png"
  }
]);
onMounted(async () => {
  const { route }: any = await getRoute();
  console.log("当前路由信息：", route);
  const i = list.value.findIndex(item => item.pagePath.substring(1) === route);
  activeTabIndex.value = i;
});
</script>

<style lang="scss" scoped>
.container {
  background-color: #21212b;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
}
</style>
