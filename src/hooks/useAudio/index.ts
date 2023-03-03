import { useStore } from "vuex";
import {PlayStateEnum,PlayListStateEnum,SwitchMusicState} from "@/store/module/musicPlayData/type"

export default function() {
  const store = useStore();
  const audio = uni.getBackgroundAudioManager();
  audio.onTimeUpdate(() => {
    // console.log("歌曲正在播放：",audio.currentTime);
    // console.log("歌曲正在播放：", audio.duration);
    const percent = (audio.currentTime / audio.duration) * 100;
    store.dispatch("addPercentAction", percent);
  });
  audio.onPause(() => {
     store.dispatch("addPlayStateAction",PlayStateEnum.PAUSE)
  })
  audio.onError(() => {
    console.log("播放错误");
     store.dispatch("addPlayStateAction",PlayStateEnum.STOP)
  })
  audio.onEnded(() => {
    console.log("播放自然结束");  
    store.dispatch("switchMusicAction",SwitchMusicState.NEXT)
  });
  audio.onStop(() => {
    console.log("停止播放");
    store.dispatch("addPlayStateAction",PlayStateEnum.STOP)
  });
  return audio;
}
