export interface ICompanyNameListData {
  id: number;
  name: string;
  logo: string;
}

export interface IReqBranch {
  companyId: number;
  name: string;
  address: string;
  specificAddress: string;
}

export interface ICompanyLocationListData {
  id: number;
  name: string;
  roadAddress: string;
  streetAddress: string;
}

export interface ICompanyForm {
  name: string;
  logo: FileList;
}
