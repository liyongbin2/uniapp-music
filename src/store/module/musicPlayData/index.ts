import {
  PlayStateEnum,
  MusicPlayDataType,
  SwitchMusicState,
  PlayListStateEnum
} from "./type";
export default {
  state: (): MusicPlayDataType => ({
    play: false,
    playState: PlayStateEnum.PAUSE,
    playListState: PlayListStateEnum.LIST_LOOP,
    musicList: [
      {
        title: "致爱丽丝",
        img: "https://web-assets.dcloud.net.cn/unidoc/zh/music-a.png",
        mp3:
          "https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-hello-uniapp/2cc220e0-c27a-11ea-9dfb-6da8e309e0d8.mp3"
      },
      {
        title: "水星记",
        img: "https://web-assets.dcloud.net.cn/unidoc/zh/music-a.png",
        mp3:
          "https://m701.music.126.net/20230301172609/954d929fa3e133bb5d8514bbef6f3e4e/jdyyaac/obj/w5rDlsOJwrLDjj7CmsOj/14096415708/a31a/d23b/2698/712be87b0af27cb224ee7b28e19a2d0b.m4a"
      },
      {
        title: "戒烟",
        img: "https://web-assets.dcloud.net.cn/unidoc/zh/music-a.png",
        mp3:
          "https://m801.music.126.net/20230301172946/a3633951af7674e17fcd5353035830ab/jdyyaac/obj/w5rDlsOJwrLDjj7CmsOj/18192766273/2475/f91c/a231/0ea11125803f7e46b6589ab79c450e16.m4a"
      }
    ],
    musicListHistory: [],
    curPlayMusicIndex: 0,
    durantion: 0,
    percent: 0,
    audio: null
  }),
  getters: {
    getPlay: (state: MusicPlayDataType) => state.play,
    getPlayState: (state: MusicPlayDataType) => state.playState,
    getPlayListState: (state: MusicPlayDataType) => state.playListState,
    getMusicList: (state: MusicPlayDataType) => state.musicList,
    getCurPlayMusicIndex: (state: MusicPlayDataType) => state.curPlayMusicIndex,
    getDurantion: (state: MusicPlayDataType) => state.durantion,
    getPercent: (state: MusicPlayDataType) => state.percent,
    getAudio: (state: MusicPlayDataType) => state.audio
  },
  mutations: {
    CHANGE_playState_MUTATIONS: (
      state: MusicPlayDataType,
      data: PlayStateEnum
    ) => {
      const { audio, curPlayMusicIndex, musicList, musicListHistory } = state;
      switch (data) {
        case PlayStateEnum.PLAY: {
          // 播放音乐
          if (!musicList[curPlayMusicIndex]) {
            audio.pause();
            data = PlayStateEnum.PAUSE;
            return;
          }
          audio.title = musicList[curPlayMusicIndex].title;
          audio.singer = "暂无";
          audio.coverImgUrl = musicList[curPlayMusicIndex].img;
          audio.src = musicList[curPlayMusicIndex].mp3;
          audio.play();
          state.playState = PlayStateEnum.PLAY;
          //  todo: 这里还要去重，后续再写
          // musicListHistory.push(musicList[curPlayMusicIndex]);
          state.play = true;
          return;
        }
        case PlayStateEnum.PAUSE: {
          audio.pause();
          state.play = false;
          return;
        }
        case PlayStateEnum.RESET: {
          // 重新播放当前歌曲
          audio.seek(0);
          return;
        }
        case PlayStateEnum.STOP: {
          audio.stop();
          return;
        }
        default: {
          break;
        }
      }
      state.playState = data;
    },
    CHANGE_musicList_MUTATIONS: (state: MusicPlayDataType, data: any[]) => {
      state.musicList = data;
    },
    CHANGE_CUR_PLAY_MUSIC_INDEX_MUTATIONS: (
      state: MusicPlayDataType,
      data: number
    ) => {
      state.curPlayMusicIndex = data;
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
          if (data) {
            commit("CHANGE_playState_MUTATIONS", PlayStateEnum.PLAY);
          } else {
            commit("CHANGE_playState_MUTATIONS", PlayStateEnum.PAUSE);
          }
          res("success");
        } else rej("addPlayAction fail: Not Data");
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
        } else rej("addPlayStateAction fail: Not Data");
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
        } else rej("addMusicListAction fail: Not Data");
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
        } else if (data < 0) rej("addPercentAction fail: Not Data");
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
        } else rej("addAudioAction fail: Not Data");
      });
    },
    switchMusicAction: (
      { commit, state }: any,
      data: SwitchMusicState
    ): Promise<string> => {
      return new Promise((res, rej) => {
        const musicList = state.musicList;
        const curPlayMusicIndex = state.curPlayMusicIndex;
        if(data === SwitchMusicState.NEXT) {
          // 下一首歌
          // 列表循环，播完列表就停止播放
          if(curPlayMusicIndex === musicList.length - 1) {
            // 已经是最后一首歌曲播放完毕了
          } else {
          }
        } else {
          // 上一首歌
        }
        // commit("CHANGE_CUR_PLAY_MUSIC_INDEX_MUTATIONS", 1);
        // res("success");
      });
    }
  }
};
