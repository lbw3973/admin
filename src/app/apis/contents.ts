import { AxiosError } from "axios";
import { instance } from "./axios";

export const getContents = async (page: number) => {
  try {
    const res = await instance.get("/boards", { params: { page } });
    return res.data.data;
  } catch (error: any) {
    return new AxiosError(error.response.data);
  }
};

export const getContentDetail = async (id: number) => {
  try {
    const res = await instance.get(`/auth/board/${id}`);
    return res.data.data;
  } catch (error: any) {
    return new AxiosError(error.response.data);
  }
};

export const deleteContent = async (id: number) => {
  try {
    const res = await instance.delete(`/admin/board/${id}`);
  } catch (error: any) {
    return new AxiosError(error.response.data);
  }
};

export const deleteReply = async (id: number) => {
  try {
    const res = await instance.delete(`/admin/reply/${id}`);
  } catch (error: any) {
    return new AxiosError(error.response.data);
  }
};

export const deleteReReply = async (id: number) => {
  try {
    const res = await instance.delete(`/admin/rereply/${id}`);
  } catch (error: any) {
    return new AxiosError(error.response.data);
  }
};
