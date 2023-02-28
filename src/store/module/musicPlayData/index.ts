import { PlayStateEnum, MusicPlayDataType } from "./type";
export default {
  state: (): MusicPlayDataType => ({
    play: false,
    playState: PlayStateEnum.STOP,
    musicList: [],
    curPlayMusic: "",
    durantion: 0,
    percent: 0,
    audio: null,
  }),
  getters: {
    getPlay: (state: MusicPlayDataType) => state.play,
    getPlayState: (state: MusicPlayDataType) => state.playState,
    getMusicList: (state: MusicPlayDataType) => state.musicList,
    getCurPlayMusic: (state: MusicPlayDataType) => state.curPlayMusic,
    getDurantion: (state: MusicPlayDataType) => state.durantion,
    getPercent: (state: MusicPlayDataType) => state.percent,
    getAudio: (state: MusicPlayDataType) => state.audio,
  },
  mutations: {
    CHANGE_play_MUTATIONS: (state: MusicPlayDataType, data: boolean) => {
      if (state.play !== data) state.play = data;
      const {
        audio
      } = state
      if(data) {
        // 播放音乐
        audio.title = '致爱丽丝';
        audio.singer = '暂无';
        audio.coverImgUrl = 'https://web-assets.dcloud.net.cn/unidoc/zh/music-a.png';
        audio.src = 'https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-hello-uniapp/2cc220e0-c27a-11ea-9dfb-6da8e309e0d8.mp3';
        audio.play()
      } else {
        audio.pause()
      }
    },
    CHANGE_playState_MUTATIONS: (
      state: MusicPlayDataType,
      data: PlayStateEnum
    ) => {
      if (data === PlayStateEnum.STOP || data === PlayStateEnum.RESET)
        state.play = false;
      else state.play = true;
      state.playState = data;
    },
    CHANGE_musicList_MUTATIONS: (state: MusicPlayDataType, data: any[]) => {
      state.musicList = data;
    },
    CHANGE_CUR_PLAY_MUSIC_MUTATIONS: (state: MusicPlayDataType, data: any) => {
      state.curPlayMusic = data;
    },
    CHANGE_PERCENT_MUTATIONS: (state: MusicPlayDataType, data: number) => {
      state.percent = data;
    },
    CHANGE_AUDIO_MUTATIONS: (state: MusicPlayDataType, data: number) => {
      state.audio = data;
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
    },
    addPercentAction: (
      { commit }: { commit: Function },
      data: number
    ): Promise<string> => {
      return new Promise((res, rej) => {
        if (data) {
          commit("CHANGE_PERCENT_MUTATIONS", data);
          res("success");
        } else rej("fail: Not Data");
      });
    },
    addAudioAction: (
      { commit }: { commit: Function },
      data: any
    ): Promise<string> => {
      return new Promise((res, rej) => {
        if (data) {
          commit("CHANGE_AUDIO_MUTATIONS", data);
          res("success");
        } else rej("fail: Not Data");
      });
    }
  }
};
