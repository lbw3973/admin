export interface IUserInfo {
  curPage: number;
  empty: boolean;
  first: boolean;
  last: boolean;
  list: IUserInfoData[];
  totalElements: number;
  totalPages: number;
}

export interface IUserInfoData {
  email: string;
  id: number;
  isAdmin: boolean;
  name: string;
  phoneNumber: string;
}
