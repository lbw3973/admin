import { AxiosError } from "axios";
import { instance } from "./axios";

export const getLoginedAdminInfo = async () => {
  try {
    const res = await instance.get("/auth/account");
    return res.data.data;
  } catch (error: any) {
    throw new AxiosError(error.response.data);
  }
};
