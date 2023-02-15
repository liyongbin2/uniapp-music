<template>
  <view class="container" v-if="openPop">
    <view class="overlay overflow-visible" @tap="handleClosePop"></view>
    <view
      :class="
        `relative pop rounded-md pop-${PopupPositionEnum[position]} ${animationName}`
      "
      :style="style"
    >
      <slot></slot>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, nextTick } from "vue";

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
  duration?: number;
};

const props = withDefaults(defineProps<PopupType>(), {
  open: false,
  position: "center",
  customStyle: null,
  officeTop: "50%",
  duration: 500
});
const emits = defineEmits(["close"]);

const openPop = ref<boolean>(false);
const animationName = ref<string>("");
const cStyle = ref<any>({
  top: props.position === PopupPositionEnum.center ? props.officeTop : "0",
  ...props.customStyle
});
const style = computed(() => ({
  ...cStyle.value,
  animationTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
  animationDuration: props.duration + "ms"
}));
onMounted(() => {
  openPop.value = props.open;
  console.log("查看style",style.value);
});

watch(
  () => props.open,
  async curOpen => {
    if (curOpen) {
      openPop.value = true;
      cStyle.value["animationDirection"] = "normal";
    } else {
      cStyle.value["animationDirection"] = "reverse";
    }
    animationName.value = `scale-in-${PopupPositionEnum[props.position]}`;
    await nextTick();
    setTimeout(() => {
      animationName.value = "";
      if (!curOpen) openPop.value = false;
    }, props.duration);
  }
);

function handleClosePop() {
  emits("close", false);
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
.pop-left {
  left: 0;
  top: 0;
  bottom: var(--window-bottom);
  min-width: 300rpx;
  background-color: #ffffff;
}
.pop-right {
  right: 0;
  top: 0;
  bottom: var(--window-bottom);
  min-width: 300rpx;
  background-color: #ffffff;
}
.pop-bottom {
  left: 0;
  bottom: 0;
  min-height: 300rpx;
  background-color: #ffffff;
}
.container {
  @apply fixed inset-0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999999;
  .overlay {
    width: 100%;
    height: 100%;
  }
  .pop {
    @apply absolute;
  }
}
</style>
