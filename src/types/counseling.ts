import { Dispatch, SetStateAction } from "react";

export interface IReservationListData {
  curPage: number;
  empty: boolean;
  first: boolean;
  last: false;
  list: IReservationList[];
  totalElements: number;
  totalPages: number;
}

export interface IReservationList {
  goal: "PROFIT" | "RISK" | "TAX" | "PRESERVATION";
  id: number;
  locationName: string;
  pb: { id: number; email: string; name: string; phoneNumber: string };
  user: { id: number; email: string; name: string; phoneNumber: string };
  process: "APPLY" | "CONFIRM" | "COMPLETE";
  question: string | null;
  review: string | null;
  status: string;
  time: string;
  type: "VISIT" | "CALL";
}

export type TReserveStatus = "예약신청" | "예약확정" | "상담완료" | "예약취소";

export interface ICounselingListProps {
  nowPage: number;
  reservationList: IReservationList[] | undefined;
  setSeeMore: Dispatch<SetStateAction<IReservationList | null>>;
}

export interface ISeeMoreProps {
  seeMore: IReservationList | null;
}
