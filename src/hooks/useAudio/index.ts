import { useStore } from "vuex";
import {PlayStateEnum,PlayListStateEnum,SwitchMusicState} from "@/store/module/musicPlayData/type"

export default function() {
  const store = useStore();
  const audio = uni.getBackgroundAudioManager();
  audio.onTimeUpdate((res: any) => {
    // console.log("歌曲正在播放：",audio.currentTime);
    // console.log("歌曲正在播放：", audio.duration);
    const percent = (audio.currentTime / audio.duration) * 100;
    store.dispatch("addPercentAction", percent);
  });
  audio.onEnded((res: any) => {
    console.log("自然播放结束", res);
    const musicList = store.getters.getMusicList
    const curPlayMusicIndex = store.getters.getCurPlayMusicIndex
    const playListState = store.getters.getPlayState
    if(playListState === PlayListStateEnum.LIST_LOOP) {
      // 列表循环，播完列表就停止播放
      if(curPlayMusicIndex === musicList.length - 1) {
        // 已经是最后一首歌曲播放完毕了
        store.dispatch("addPlayAction",false)
      } else {
        store.dispatch("switchMusicAction",SwitchMusicState.NEXT)
      }
    }
  });
  audio.onStop((res: any) => {
    console.log("停止播放");
  });
  return audio;
}
