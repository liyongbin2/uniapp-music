<template>
  <view class="content">
    <view class="text-pink-900">当前系统主题123:{{ themeRef }}</view>
    <TabBar />
  </view>
</template>

<script setup lang="ts">
import TabBar from "@/components/TabBar";
import { ref, onBeforeUnmount } from "vue";
const title = ref("Hello");
const themeRef = ref(uni.getSystemInfoSync().theme);
// #ifdef MP
uni.onThemeChange(({ theme }: { theme: "dark" | "light" }) => {
  themeRef.value = theme;
});
// #endif
onBeforeUnmount(() => {
  // #ifdef MP
  uni.offThemeChange(() => {});
  // #endif
});
</script>

<style lang="scss" scoped>
.test {
  @apply flex items-center justify-center h-[100px] w-[100px] rounded-[40px] bg-[#123456] bg-opacity-[0.54] text-[#ffffff] #{!important};
}
</style>
