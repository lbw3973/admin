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
