export interface IJoinList {
  data: {
    status: number;
    msg: string;
    data: {
      curPage: number;
      empty: boolean;
      first: boolean;
      last: boolean;
      list: IJoinListData[];
      totalElements: number;
      totalPages: number;
    };
  };
}

export interface IJoinListData {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  branchName: string;
  career: number;
  speciality1: string;
  speciality2: string;
  businessCard: string;
}
