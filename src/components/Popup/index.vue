<template>
  <view class="container" v-if="openPop">
    <view class="overlay" @tap="handleClosePop"></view>
    <view
      :class="`pop rounded-md pop-${PopupPositionEnum[position]}`"
      :style="cStyle"
    >
      <slot></slot>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

enum PopupPositionEnum {
  center = "center",
  left = "left",
  right = "right",
  bottom = "bottom"
}
type PopupType = {
  open: boolean;
  position?: string;
  customStyle?: object | null;
  officeTop?: string | null | undefined;
};

const props = withDefaults(defineProps<PopupType>(), {
  open: false,
  position: "center",
  customStyle: null,
  officeTop: "50%"
});
const emits = defineEmits(["update:open"]);
const cStyle = ref<any>({
  top: props.officeTop,
  ...props.customStyle
});
const openPop = computed(() => props.open);

function handleClosePop() {
  console.log("点击关闭");
  emits("update:open", false);
}
</script>

<style lang="scss" scoped>
.pop-center {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  min-width: 300rpx;
  min-height: 300rpx;
  background-color: #ffffff;
}

.container {
  @apply fixed inset-0;
  background-color: rgba(0, 0, 0, 0.5);
  .overlay {
    width: 100%;
    height: 100%;
  }
  .pop {
    @apply absolute;
    padding: 20rpx;
  }
}
</style>
