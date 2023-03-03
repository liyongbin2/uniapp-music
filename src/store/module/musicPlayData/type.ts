export enum PlayStateEnum {
  PLAY = "Play", // 播放
  STOP = "Stop", // 停止
  PAUSE = "pause", // 暂停
  RESET = "Reset" // 重置
}

export enum PlayListStateEnum {
  SINGLE_LOOP = "Single Loop", // 单曲循环
  LIST_LOOP = "List Loop", // 循环列表
  LOOP = "loop", // 列表无限循环
  RANDOM = "random" // 随机播放
}

export enum SwitchMusicState {
  PRE = "pre",
  NEXT = "next"
}

export type PercentType = {
  percent: number;
  seek: boolean;
};

export type MusicPlayDataType = {
  play: boolean; // 播放音乐
  playState: PlayStateEnum; // 播放状态
  playListState: PlayListStateEnum; // 播放列表状态
  musicList: any[]; // 音乐列表
  musicListHistory: any[]; // 播放过的音乐列表
  curPlayMusicIndex: number; // 当前播放的歌曲的下标
  durantion: number; // 当前歌曲的播放时长
  percent: number; // 当前歌曲播放进度的百分比(0-100)
  audio: any; // 播放器实例
};
