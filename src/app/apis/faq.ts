import { AxiosError } from "axios";
import { instance } from "./axios";

export const getFaqList = async (pageParam: number) => {
  try {
    const res = await instance.get("/faqs", {
      params: { page: pageParam },
    });
    return res.data.data;
  } catch (error: any) {
    throw new AxiosError(error);
  }
};

export const getFaqitem = async (id: number) => {
  try {
    const res = await instance.get(`/faq/${id}`);
    return res.data.data;
  } catch (error: any) {
    throw new AxiosError(error);
  }
};

interface CreateFaqProps {
  title: string;
  content: string;
  label: string;
}

export interface UpdateFaqProps extends CreateFaqProps {
  id: number;
}

export const createFaqDetail = async ({ title, content, label }: CreateFaqProps) => {
  try {
    const res = await instance.post("/admin/faq", {
      title,
      content,
      label,
    });
  } catch (error: any) {
    throw new AxiosError(error);
  }
};

export const updateFaqDetail = async ({ id, title, content, label }: UpdateFaqProps) => {
  try {
    const res = await instance.patch(`/admin/faq/${id}`, {
      title,
      content,
      label,
    });
  } catch (error: any) {
    throw new AxiosError(error);
  }
};

export const deleteFaqDetail = async (id: number) => {
  try {
    const res = await instance.delete(`/admin/faq/${id}`);
  } catch (error: any) {
    throw new AxiosError(error);
  }
};
