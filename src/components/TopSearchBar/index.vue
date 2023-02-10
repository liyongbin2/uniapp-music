<template>
  <view class="container">
    <TopBarSlot>
      <view
        class="px-[20rpx] flex items-center gap-2"
      >
        <image
          src="../../static/expand.png"
          class="w-[32px] h-[32px]"
        ></image>
        <!-- 发现顶部 -->
        <block v-if="true">
          <view
            class="flex items-center flex-1 search rounded-3xl py-[16rpx] px-[20rpx] bg-[#3a333b] flex gap-[10rpx]"
          >
            <FontIcon
              icon="&#xe61f;"
              size="32rpx"
            />
            <view
              @tap="goToSearcgPage"
              class="flex-1 text-[#918a91]"
            >
              {{ searchRecommend }}
            </view>
            <FontIcon
              icon="&#xe631;"
              size="32rpx"
            />
          </view>
        </block>
        <!-- 我的 顶部 -->
        <block
          v-else-if="false"
        ></block>
        <!-- 关注 顶部 -->
        <block
          v-else-if="false"
        ></block>
        <!-- 社区 顶部 -->
        <block
          v-else-if="false"
        ></block>
      </view>
    </TopBarSlot>
  </view>
</template>

<script setup lang="ts">
import TopBarSlot from "@/components/TopBarSlot";
import FontIcon from "@/components/FontIcon";

import { computed, ref } from "vue";

import router from "@/utils/router";

const searchRecommend = ref<string>(
  "月亮代表我的心"
);

function goToSearcgPage(): void {
  router.push(
    "/otherSubPackages/pages/search/index"
  );
}
</script>

<style lang="scss" scoped></style>
