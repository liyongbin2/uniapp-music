<script setup lang="ts">
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'
import {computed} from "vue"
import {useStore} from "vuex"

const store = useStore()

const navHeight = computed(() => store.getters.getNavHeight)
onLaunch(() => {
  uni.getSystemInfo({
  	success: function(res) {
      store.dispatch("addSystemInfoAction",res)
      store.dispatch("addNavHeightAction",(res?.statusBarHeight ?? 0) * (750 / res.windowWidth))
  	}
  });
  const menuBottomInfo = uni.getMenuButtonBoundingClientRect();
  console.log("查看胶囊信息1：",menuBottomInfo);
  store.dispatch("addmenuButtonInfoAction",menuBottomInfo)
})
onShow(() => {
  console.log('App Show')
})
onHide(() => {
  console.log('App Hide')
})
</script>
<style lang="scss">
@import "tailwindcss/base";
@import "tailwindcss/utilities";
</style>
