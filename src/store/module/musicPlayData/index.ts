import {
  PlayStateEnum,
  MusicPlayDataType
} from "./type"
export default {
  state: (): MusicPlayDataType => ({
    play: false,
    playState: PlayStateEnum.STOP,
    musicList: []
  }),
  getters: {
    getPlay: (state: MusicPlayDataType) => state.play,
    getPlayState: (state: MusicPlayDataType) => state.playState,
    getMusicList: (state: MusicPlayDataType) => state.musicList
  },
  mutations: {
    CHANGE_play_MUTATIONS: (state: MusicPlayDataType, data: boolean) => {
      if (state.play !== data) state.play = data;
    },
    CHANGE_playState_MUTATIONS: (
      state: MusicPlayDataType,
      data: PlayStateEnum
    ) => {
      if(data === PlayStateEnum.STOP || data === PlayStateEnum.RESET) state.play = false
      else state.play = true
      state.playState = data;
    },
    CHANGE_musicList_MUTATIONS: (state: MusicPlayDataType, data: any[]) => {
      state.musicList = data;
    }
  },
  actions: {
    addPlayAction: (
      { commit }: { commit: Function },
      data: boolean
    ): Promise<string> => {
      return new Promise((res, rej) => {
        if (typeof data === "boolean") {
          commit("CHANGE_play_MUTATIONS", data);
          res("success");
        } else rej("fail: Not Data");
      });
    },
    addPlayStateAction: (
      { commit }: { commit: Function },
      data: PlayStateEnum
    ): Promise<string> => {
      return new Promise((res, rej) => {
        if (data) {
          commit("CHANGE_playState_MUTATIONS", data);
          res("success");
        } else rej("fail: Not Data");
      });
    },
    addMusicListAction: (
      { commit }: { commit: Function },
      data: any[]
    ): Promise<string> => {
      return new Promise((res, rej) => {
        if (data) {
          commit("CHANGE_musicList_MUTATIONS", data);
          res("success");
        } else rej("fail: Not Data");
      });
    }
  }
};
