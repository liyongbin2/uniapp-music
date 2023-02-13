/**
 * @des 防抖 ，多次只执行最后一次
 * @param func 需要包装的函数
 * @param delay 延迟时间，单位ms
 * @param immediate 是否默认执行一次(第一次不延迟)
 */
export const debounced = (
  func: Function,
  delay: number = 500,
  immediate: boolean = false
): any => {
  let timer: NodeJS.Timeout;
  console.log(func);
  return (...args: any) => {
    if (immediate) {
      func.apply(this, args);
      immediate = false;
      return;
    }
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};
