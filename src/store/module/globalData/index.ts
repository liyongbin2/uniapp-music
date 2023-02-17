import { GlobalDataType } from "./type";

export default {
  state: (): GlobalDataType => ({
    navHeight: 0, // 导航栏高度
    systemInfo: {},
    menuButtonInfo: {}
  }),
  getters: {
    getNavHeight: (state: any) => state.navHeight,
    getSystemInfo: (state: any) => state.systemInfo,
    getMenuButtonInfo: (state: any) => state.menuButtonInfo
  },
  mutations: {
    CHANGE_NAVHEIGHT_MUTATION: (state: GlobalDataType, data: number) => {
      state.navHeight = data;
    },
    CHANGE_SYSTEM_INFO_MUTATAION: (state: GlobalDataType, data: number) => {
      state.systemInfo = data;
    },
    CHANGE_MENE_BUTTON_INFO_MUTATAION: (
      state: GlobalDataType,
      data: number
    ) => {
      state.menuButtonInfo = data;
    }
  },
  actions: {
    addSystemInfoAction(
      { commit }: { commit: Function },
      data: number
    ): Promise<string> {
      return new Promise((res, rej) => {
        if (data) {
          commit("CHANGE_SYSTEM_INFO_MUTATAION", data);
          res("success");
        } else rej("fail");
      });
    },
    addNavHeightAction(
      { commit }: { commit: Function },
      data: number
    ): Promise<string> {
      return new Promise((res, rej) => {
        if (typeof data === "number") {
          commit("CHANGE_NAVHEIGHT_MUTATION", data);
          res("success");
        } else rej("fail");
      });
    },
    addmenuButtonInfoAction(
      { commit }: { commit: Function },
      data: number
    ): Promise<string> {
      return new Promise((res, rej) => {
        if (data) {
          commit("CHANGE_MENE_BUTTON_INFO_MUTATAION", data);
          res("success");
        } else rej("fail");
      });
    }
  }
};
