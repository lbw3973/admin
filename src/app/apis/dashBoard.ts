import { AxiosError } from "axios";
import { instance } from "./axios";

export const getDashBoardData = async () => {
  try {
    const res = await instance.get("/admin/reservations/count");
    return res.data.data;
  } catch (error: any) {
    throw new AxiosError(error);
  }
};
