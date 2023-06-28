import { AxiosError } from "axios";
import { instance } from "./axios";

export const getNoticeList = async (pageParam: number) => {
  try {
    const res = await instance.get("/notices", {
      params: { page: pageParam },
    });
    return res.data.data;
  } catch (error: any) {
    throw new AxiosError(error);
  }
};
export interface CreateNoticeProps {
  title: string;
  content: string;
}

export interface UpdateNoticeProps extends CreateNoticeProps {
  id: number;
}

export const getNoticeDetail = async (id: number) => {
  try {
    const res = await instance.get(`/notice/${id}`);
    return res.data.data;
  } catch (error: any) {
    throw new AxiosError(error);
  }
};

export const createNoticeDetail = async ({ title, content }: CreateNoticeProps) => {
  try {
    const res = await instance.post("/admin/notice", {
      title,
      content,
    });
    return res.data;
  } catch (error: any) {
    throw new AxiosError(error);
  }
};

export const updateNoticeDetail = async ({ id, title, content }: UpdateNoticeProps) => {
  try {
    const res = await instance.patch(`/admin/notice/${id}`, {
      title,
      content,
    });
    return res.data;
  } catch (error: any) {
    throw new AxiosError(error);
  }
};

export const deleteNoticeDetail = async (id: number) => {
  try {
    const res = await instance.delete(`/admin/notice/${id}`);
    return res.data;
  } catch (error: any) {
    throw new AxiosError(error);
  }
};
