import {
  PlayStateEnum,
  MusicPlayDataType,
  SwitchMusicState,
  PlayListStateEnum,
  PercentType
} from "./type";

function playMusic(audio: any, music: any): void {
  const { title, img, mp3 } = music;
  audio.title = title;
  audio.singer = "暂无";
  audio.coverImgUrl = img;
  audio.src = mp3;
  audio.play();
}
export default {
  state: (): MusicPlayDataType => ({
    play: false,
    playState: PlayStateEnum.PAUSE,
    playListState: PlayListStateEnum.LIST_LOOP,
    musicList: [
      {
        title: "水星记",
        img: "https://web-assets.dcloud.net.cn/unidoc/zh/music-a.png",
        mp3:
          "https://m701.music.126.net/20230302150853/24cd2f6b18a6ffd40ff1926d8b3afa62/jdyyaac/obj/w5rDlsOJwrLDjj7CmsOj/14096415708/a31a/d23b/2698/712be87b0af27cb224ee7b28e19a2d0b.m4a"
      },
      {
        title: "致爱丽丝",
        img: "https://web-assets.dcloud.net.cn/unidoc/zh/music-a.png",
        mp3:
          "https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-hello-uniapp/2cc220e0-c27a-11ea-9dfb-6da8e309e0d8.mp3"
      }

      // {
      //   title: "戒烟",
      //   img: "https://web-assets.dcloud.net.cn/unidoc/zh/music-a.png",
      //   mp3:
      //     "https://m801.music.126.net/20230302150823/eb56469b2d833ad3cd9e9f257d111fd6/jdyyaac/obj/w5rDlsOJwrLDjj7CmsOj/18192766273/2475/f91c/a231/0ea11125803f7e46b6589ab79c450e16.m4a"
      // }
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
      console.log("查看提交的PlayStateEnum",data);
      switch (data) {
        case PlayStateEnum.PLAY: {
          if (!musicList[curPlayMusicIndex]) {
            console.log("暂停1");
            audio.pause();
            data = PlayStateEnum.PAUSE;
            state.play = false;
            return;
          }
          console.log("播放");
          playMusic(audio, musicList[curPlayMusicIndex]);
          state.playState = PlayStateEnum.PLAY;
          //  todo: 这里还要去重，后续再写
          // musicListHistory.push(musicList[curPlayMusicIndex]);
          state.play = true;
          return;
        }
        case PlayStateEnum.PAUSE: {
          console.log("暂停");
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
          state.play = false;
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
      const { audio, musicList } = state;
      playMusic(audio, musicList[data]);
    },
    CHANGE_PERCENT_MUTATIONS: (
      state: MusicPlayDataType,
      data: number | PercentType
    ) => {
      let isSeek = false;
      let percent = 0;
      if (typeof data !== "number") {
        percent = data.percent;
        isSeek = data.seek;
      } else percent = data;
      if (isSeek) {
        const { audio, playState, musicList, curPlayMusicIndex } = state;
        let duration = audio.duration;
        if (playState !== PlayStateEnum.PLAY) {
          playMusic(audio, musicList[curPlayMusicIndex]);
          if (!duration) duration = audio.duration;
          state.playState = PlayStateEnum.PLAY;
        }
        audio.seek((duration * percent) / 100);
      }
      state.percent = percent;
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
      data: number | PercentType
    ): Promise<string> => {
      return new Promise((res, rej) => {
        if (data) {
          let percent = 0;
          let isSeek = false;
          if (typeof data === "object") {
            percent = data.percent;
            isSeek = data.seek;
          }
          commit("CHANGE_PERCENT_MUTATIONS", { percent, seek: isSeek });
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
        console.log("切换歌曲");
        const musicList = state.musicList;
        const playListState = state.playListState;
        const curPlayMusicIndex = state.curPlayMusicIndex;
        if (data === SwitchMusicState.NEXT) {
          // 下一首歌
          // 列表循环，播完列表就停止播放
          if (
            curPlayMusicIndex === musicList.length - 1 &&
            (playListState === PlayListStateEnum.LIST_LOOP ||
              playListState === PlayListStateEnum.LOOP)
          ) {
            // 已经是最后一首歌曲播放完毕了
            if (playListState === PlayListStateEnum.LOOP)
              commit("CHANGE_CUR_PLAY_MUSIC_INDEX_MUTATIONS", 0);
            else commit("CHANGE_playState_MUTATIONS", PlayStateEnum.PAUSE);
          } else {
            commit(
              "CHANGE_CUR_PLAY_MUSIC_INDEX_MUTATIONS",
              curPlayMusicIndex + 1
            );
            res("success");
          }
          if (playListState === PlayListStateEnum.RANDOM) {
          }
        } else if (data === SwitchMusicState.PRE) {
          // 上一首歌
          if (curPlayMusicIndex === 0) {
            commit(
              "CHANGE_CUR_PLAY_MUSIC_INDEX_MUTATIONS",
              musicList.length - 1
            );
          } else
            commit(
              "CHANGE_CUR_PLAY_MUSIC_INDEX_MUTATIONS",
              curPlayMusicIndex - 1
            );
        } else rej("switchMusicAction fail:error type");
      });
    }
  }
};
