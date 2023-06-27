export interface IDashBoard {
  data: IDashBoardData;
  msg: string;
  status: number;
}

export interface IDashBoardData {
  apply: number;
  complete: number;
  confirm: number;
  pb: number;
  review: number;
}
