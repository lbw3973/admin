import { AxiosError } from "axios";
import { instance } from "./axios";
import { IUser } from "@/types/login";

export const userLogin = async (user: IUser) => {
  const res = await instance.post("/backoffice/login ", user);
  return res;
};

export const getLoginedAdminInfo = async () => {
  try {
    const res = await instance.get("/auth/account");
    return res.data.data;
  } catch (error: any) {
    throw new AxiosError(error.response.data);
  }
};
export const userLogout = async () => {
  try {
    const res = await instance.post("/auth/logout");
    return res.data.data;
  } catch (error: any) {
    throw new AxiosError(error.response.data.data.value);
  }
};
export const getLoginedUserInfo = async () => {
  try {
    const res = await instance.get("/auth/account");
    return res.data.data;
  } catch (error: any) {
    throw new AxiosError(error.response.data);
  }
};

export const joinAuthentication = async (email: string) => {
  const res = await instance.post("/email/authentication", { email: email });
  return res.data;
};
