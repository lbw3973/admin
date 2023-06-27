import { AxiosError } from "axios";
import { instance } from "./axios";

export const getReservations = async () => {
  try {
    const res = await instance.get("/admin/reservations");
    return res.data.data;
  } catch (error: any) {
    throw new AxiosError(error.response.data);
  }
};
