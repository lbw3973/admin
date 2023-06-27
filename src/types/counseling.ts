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
  goal: string;
  id: number;
  locationName: string;
  pb: { id: number; email: string; name: string; phoneNumber: string };
  user: { id: number; email: string; name: string; phoneNumber: string };
  process: string;
  question: string | null;
  review: string | null;
  status: string;
  time: string;
  type: string;
}
