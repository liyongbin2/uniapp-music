import { reactive } from "vue";
import { DirectionEnum, TouchedInfoType } from "./type";

// offsetX：偏移多少距离才算滑动
export default function(offsetX?: number = 10) {
  const touchInfo = reactive<TouchedInfoType>({
    startTime: 0, //按下的时间
    endTime: 0, // 抬起的时间
    timeDiff: 0, // 按下和抬起的时间差
    //按下的坐标
    startX: 0,
    startY: 0,
    // 抬起坐标
    endX: 0,
    endY: 0,
    direction: null, // 滑动方向
    isFast: false // 是否是快速左右滑动(一秒以内就是快速触摸)
  });
  const handleTouchStart = (e: any, func: Function) => {
    touchInfo.startTime = Date.now();
    touchInfo.startX = e.changedTouches[0].clientX;
    touchInfo.startY = e.changedTouches[0].clientY;
    func && func(e, touchInfo);
  };
  const handleTouched = (e: any, func: Function) => {
    touchInfo.endTime = Date.now();
    touchInfo.endX = e.changedTouches[0].clientX;
    touchInfo.endY = e.changedTouches[0].clientY;
    touchInfo.timeDiff = touchInfo.endTime - touchInfo.startTime;
    if (touchInfo.timeDiff < 1000) touchInfo.isFast = true;
    else touchInfo.isFast = false;
    //先判断用户滑动的距离  用[绝对值 ] 是否合法  合法：判断滑动的方向
    if (Math.abs(touchInfo.endX - touchInfo.startX) > offsetX) {
      //滑动方向  结束大于
      touchInfo.direction =
        touchInfo.endX - touchInfo.startX > 0
          ? DirectionEnum.RIGHT
          : DirectionEnum.LEFT;
    } else touchInfo.direction = null;
    func && func(e, touchInfo);
  };
  return {
    ...touchInfo,
    handleTouchStart,
    handleTouched
  };
}
