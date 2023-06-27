import { instance } from "./axios";
import { AxiosError } from "axios";

export const reissueToken = async () => {
  try {
    const res = await instance.post("/reissue");
    return res;
  } catch (error: any) {
    throw new AxiosError(error.response.data);
  }
};

export const getJoinList = async (pageParam: number) => {
  try {
    const res = await instance.get("/admin/pbs", { params: { page: pageParam } });
    return res;
  } catch (error: any) {
    throw new AxiosError(error);
  }
};

export const AccpetJoinPB = async ({ approve, id }: { approve: boolean; id: string }) => {
  try {
    const res = await instance.post(`admin/pb/${id}?approve=${approve}`);
    return res;
  } catch (error: any) {
    throw new AxiosError(error);
  }
};
