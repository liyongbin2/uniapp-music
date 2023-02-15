/*
   跳转页面
   url: 跳转地址
   isErrGoToIndex： 发生错误时是否跳转到首页(默认不跳转)
   errPath: 跳转发生错误时需要跳转到的页面（默认首页）
   */
export const push = (
  url: string,
  isErrGoToIndex: Boolean = false,
  errPath: string = "/pages/index/index"
): Promise<any> => {
  return new Promise((res, rej) => {
    uni.navigateTo({
      url,
      success: successs => {
        res(successs);
      },
      fail: err => {
        if (isErrGoToIndex) {
          uni.navigateTo({
            url: errPath
          });
        }
        rej(err);
      },
      animationType: "pop-in",
      animationDuration: 200
    });
  });
};

export const redirect = (
  url: string,
  isErrGoToIndex: Boolean = false,
  errPath: string = "/pages/index/index"
): Promise<any> => {
  return new Promise((res, rej) => {
    uni.redirectTo({
      url,
      success: successs => {
        res(successs);
      },
      fail: err => {
        if (isErrGoToIndex) {
          uni.reLaunch({
            url: errPath
          });
        }
        rej(err);
      }
    });
  });
};

export const back = (
  delta: number = 1,
  isErrGoToIndex: Boolean = true,
  errPath: string = "/pages/index/index"
): Promise<any> => {
  return new Promise((res, rej) => {
    uni.navigateBack({
      delta,
      success: success => {
        res(success);
      },
      fail: err => {
        console.log("返回失败：", err);
        if(isErrGoToIndex) {
          uni.reLaunch({
            url: errPath
          });
        }
        rej(err);
      }
    });
  });
};
/**
 * 获取当前页面路由元信息
 */
export const getRoute = async () => {
  return new Promise((res, rej) => {
    try {
      const pages = getCurrentPages();
      const currentPageInfo = pages[pages.length - 1]; // 当前路由信息
      res(currentPageInfo);
    } catch (err) {
      rej(err);
    }
  });
};
