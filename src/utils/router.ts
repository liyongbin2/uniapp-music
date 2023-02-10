class Router {
  private static _instance: Router;
  constructor() {}
  private static instance() {
    if (!this._instance) this._instance = new Router();
    return this._instance;
  }
  /*
   跳转页面
   url: 跳转地址
   isErrGoToIndex： 发生错误时是否跳转到首页(默认不跳转)
   errPath: 跳转发生错误时需要跳转到的页面（默认首页）
   */
  async push(
    url: string,
    isErrGoToIndex: Boolean = false,
    errPath: string = "/pages/index/index"
  ): Promise<any> {
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
  }

  async redirect(
    url,
    isErrGoToIndex: Boolean = false,
    errPath: string = "/pages/index/index"
  ): Promise<any> {
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
  }

  async back(url): Promise<any> {
    return new Promise((res, rej) => {
      uni.navigateBack({
        url,
        success: success => {
          res(success);
        },
        fail: err => {
          rej(err);
        }
      });
    });
  }
  /**
   * 获取当前页面路由元信息
   */
  async getRoute() {
    return new Promise((res, rej) => {
      try {
        const pages = getCurrentPages();
        const currentPageInfo = pages[pages.length - 1]; // 当前路由信息
        res(currentPageInfo);
      } catch (err) {
        rej(err);
      }
    });
  }
}

export default Router.instance();
