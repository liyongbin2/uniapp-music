export enum DirectionEnum {
  LEFT = "left",
  RIGHT = "right"
}
export type TouchedInfoType = {
  startTime: number;
  endTime: number;
  timeDiff: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  direction: DirectionEnum | null;
  isFast: boolean;
};
