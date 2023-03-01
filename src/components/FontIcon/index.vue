<template>
  <span
    @tap.native.stop="emit('click')"
    :class="
      `iconfont text-white ${className}`
    "
    :style="{
      fontSize: size,
      color
    }"
    v-html="icon"
  >
  </span>
</template>

<script setup lang="ts">
export type FontIconProps = {
  icon: string; // 图标代码
  size?: string; // 图标字体大小
  className?: string; // 类
  color?:string;
};
export type FontIconEmits = {
  (event: "click"): void;
};
withDefaults(
  defineProps<FontIconProps>(),
  {
    size: "48rpx",
    className: "",
    color: "inhert"
  }
);
const emit = defineEmits<
  FontIconEmits
>();
</script>

<style lang="scss" scoped></style>
