<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const navHeight = computed(() => store.getters.getNavHeight);
onLaunch(() => {
  let systemInfo: any = {};
  uni.getSystemInfo({
    success: function(res) {
      systemInfo = res;
      store.dispatch("addSystemInfoAction", res);
    }
  });
  // #ifdef H5
  const menuBottomInfo = 0;
  // #endif
  // #ifdef MP-WEIXIN
  const menuBottomInfo = uni.getMenuButtonBoundingClientRect();
  // #endif
  console.log("查看胶囊信息1：", menuBottomInfo);
  store.dispatch("addmenuButtonInfoAction", menuBottomInfo);
  store.dispatch(
    "addNavHeightAction",
    (menuBottomInfo.top - systemInfo.statusBarHeight) * 2 +
      menuBottomInfo.height +
      systemInfo.statusBarHeight +
      2
  );
});
onShow(() => {
  console.log("App Show");
});
onHide(() => {
  console.log("App Hide");
});
</script>
<style lang="scss">
@import "tailwindcss/base";
@import "tailwindcss/utilities";
</style>
