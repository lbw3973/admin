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
  setContentId: Dispatch<SetStateAction<number | null>>;
}

export interface IContentDetail {
  id: number;
  isBookmark: boolean;
  thumbnail: string;
  tag1: string;
  tag2: string;
  title: string;
  createdAt: string;
  pbId: number;
  name: string;
  profile: string;
  speciality1: string | null;
  speciality2: string | null;
  career: number;
  content: string;
  reply: IReply[];
}

export interface IReply {
  authorId: number;
  content: string;
  createdAt: string;
  id: number;
  name: string;
  profile: string | null;
  reReply: IReReply[];
}
export interface IReReply {
  authorId: number;
  content: string;
  createdAt: string;
  id: number;
  name: string;
  profile: string | null;
  role: string;
  uniqueValue: number;
}
