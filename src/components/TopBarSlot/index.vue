<!-- 自定义顶部时用到 -->
<template>
  <view class="container flex flex-col justify-end" :style="containerStyle">
    <view
      class="mb-[6px] box-border"
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
export type TopBarSlotPropsType = {
  customStyle: object;
}

const props = defineProps<TopBarSlotPropsType>()

const store = useStore();
const systemInfo = computed(() => store.getters.getSystemInfo);
const menuBottomInfo = computed(() => store.getters.getMenuButtonInfo);
const navHeight = computed(() => store.getters.getNavHeight);
const containerStyle = ref<any>({
  height: `${navHeight.value}px`,
  background: `linear-gradient(180deg, rgba(41,28,37,0.6) 14%, rgba(34,27,35,0.6) 91%)`,
  // #ifdef H5
  marginTop: "30rpx",
  // #endif
  ...props.customStyle
});
</script>

<style lang="scss" scoped></style>
