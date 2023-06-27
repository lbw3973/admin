import { Dispatch, SetStateAction } from "react";

export interface IContentsListData {
  list: IContentsList[];
  totalElements: number;
  totalPages: number;
  curPage: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export interface IContentsList {
  id: number;
  title: string;
  pbName: string;
  companyLogo: string;
  career: number;
  tag1: string;
  tag2: string;
  msg: string;
  isBookmark: boolean;
}

export interface IContentsListProps {
  nowPage: number;
  contentsList: IContentsList[];
  setSeeContent: Dispatch<SetStateAction<IContentsList | null>>;
}
