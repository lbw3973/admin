import { AxiosError } from "axios";
import { instance } from "./axios";

export const getReservations = async (pageParam: number) => {
  try {
    const res = await instance.get("/admin/reservations", {
      params: { page: pageParam },
    });
    return res.data.data;
  } catch (error: any) {
    throw new AxiosError(error.response.data);
  }
};
