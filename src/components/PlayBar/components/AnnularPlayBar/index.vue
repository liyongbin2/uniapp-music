<template>
  <view class="container" @tap="playOrStopMusic">
    <canvas
      id="canvas"
      canvas-id="canvas"
      :style="{
        width: `${canvasWidth}rpx`,
        height: `${canvasHeight}rpx`
      }"
    ></canvas>
  </view>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance, onMounted, ref, nextTick } from "vue";
import { useStore } from "vuex";

const store = useStore();
const isPlay = computed(() => store.getters.getPlay);
const percent = computed(() => store.getters.getPercent);
const ctx = ref<any>(null);
const canvasWidth = ref<number>(100);
const canvasHeight = ref<number>(100);
const radius = ref<number>(10);
const startAngle = ref<number>((3 * Math.PI) / 2);
const endAngle = ref<number>(0);
const timer = ref<any>(null);
const circlePositonX = ref<number>(canvasWidth.value / 4); // 圆心x坐标
const circlePositonY = ref<number>(canvasHeight.value / 4); // 圆心y坐标

onMounted(() => {
  init();
});

function init() {
  const _this = getCurrentInstance() as any;
  ctx.value = uni.createCanvasContext("canvas", _this);
  drawCircle(ctx.value);
}
function drawCircle(ctx: any) {
  ctx.beginPath();
  ctx.arc(
    circlePositonX.value,
    circlePositonY.value,
    radius.value,
    0,
    2 * Math.PI
  );
  ctx.setStrokeStyle("#999999");
  ctx.setLineWidth(1);
  ctx.stroke();
  if (isPlay.value) drawPlayBtn(ctx);
  else drawStopBtn(ctx);
  ctx.save();
  ctx.draw();
}
function drawRing(ctx: any, percent: number) {
  console.log("绘制进度",percent);
  const anglePerSec = (2 * Math.PI) / (100 / percent);
  endAngle.value = startAngle.value + anglePerSec;
  ctx.beginPath();
  ctx.arc(
    circlePositonX.value,
    circlePositonY.value,
    radius.value,
    startAngle.value,
    endAngle.value
  );
  ctx.setStrokeStyle("#ffffff");
  ctx.setLineWidth(1);
  ctx.stroke();
  ctx.draw(true);
}
function drawStopBtn(ctx: any) {
  // 等边三角形边长
  const b = 7;
  const a = Math.abs((b / 2) * Math.tan((30 * Math.PI) / 180));
  const c = Math.abs(b / 2 / Math.cos((30 * Math.PI) / 180));
  console.log("a,b,c", a, b, c);
  ctx.beginPath();
  ctx.moveTo(
    Math.round(circlePositonX.value - a),
    circlePositonY.value - b / 2
  );
  ctx.lineTo(
    Math.round(circlePositonX.value - a),
    circlePositonY.value + b / 2
  );
  ctx.lineTo(Math.round(circlePositonX.value + c), circlePositonY.value);
  ctx.closePath();
  ctx.fillStyle = "#ffffff";
  ctx.fill();
}
function drawPlayBtn(ctx: any) {
  const a = 2.4;
  const b = 8;
  ctx.beginPath();
  ctx.moveTo(circlePositonX.value - a, circlePositonY.value - b / 2);
  ctx.lineTo(circlePositonX.value - a, circlePositonY.value + b / 2);
  ctx.moveTo(circlePositonX.value + a, circlePositonY.value - b / 2);
  ctx.lineTo(circlePositonX.value + a, circlePositonY.value + b / 2);
  ctx.setStrokeStyle("#ffffff");
  ctx.setLineWidth(2);
  ctx.stroke();
}
async function playOrStopMusic() {
  await store.dispatch("addPlayAction", !isPlay.value);
  drawCircle(ctx.value);
  if(isPlay.value) {
    if(timer.value)clearInterval(timer.value)
    timer.value = setInterval(() => {
      drawRing(ctx.value, percent.value);
      if (percent.value > 100) clearInterval(timer.value);
    }, 1000);
  } 
  
}
</script>

<style lang="scss" scoped>
.container {
}
</style>
