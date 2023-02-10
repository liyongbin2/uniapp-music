<!-- 自定义顶部时用到 -->
<template>
  <view
    class="container flex flex-col justify-end"
    :style="{
      height: `${navHeight}px`,
      background: `linear-gradient(180deg, rgba(41,28,37,0.6) 14%, rgba(34,27,35,0.6) 91%)`
    }"
  >
    <view
      class="mb-[6px]"
      :style="{
        height: `${menuBottomInfo.height}px`,
        marginRight: `${menuBottomInfo.width +
          (systemInfo.windowWidth - menuBottomInfo.right)}px`
      }"
    >
      <slot></slot>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useStore } from "vuex";

import router from "@/utils/router";
const store = useStore();
const navHeight = computed(() => store.getters.getNavHeight);
const systemInfo = computed(() => store.getters.getSystemInfo);
const menuBottomInfo = computed(() => store.getters.getMenuButtonInfo);
</script>

<style lang="scss" scoped></style>
