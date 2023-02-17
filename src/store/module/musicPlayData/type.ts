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
};
