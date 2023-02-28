import { useStore } from "vuex";

export default function() {
  const store = useStore();
  const audio = uni.getBackgroundAudioManager();
  audio.onTimeUpdate((res: any) => {
    // console.log("歌曲正在播放：",audio.currentTime);
    console.log("歌曲正在播放：", audio.duration);
    const percent = (audio.currentTime / audio.duration) * 100;
    store.dispatch("addPercentAction", percent);
  });
  return audio;
}
