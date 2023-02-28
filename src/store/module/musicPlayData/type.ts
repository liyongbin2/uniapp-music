export enum PlayStateEnum {
  PLAY = "Play", // 播放
  STOP = "Stop", // 停止
  RESET = "Reset", // 重置
  SINGLE_LOOP = "Single Loop", // 单曲循环
  LIST_LOOP = "List Loop" // 循环列表
}

export type MusicPlayDataType = {
  play: boolean; // 播放音乐
  playState: PlayStateEnum; // 播放状态
  musicList: any[]; // 音乐列表
  curPlayMusic: any; // 当前播放的歌曲
  durantion: number; // 当前歌曲的播放时长
  percent: number; // 当前歌曲播放进度的百分比(0-100)
  audio: any; // 播放器实例
};
