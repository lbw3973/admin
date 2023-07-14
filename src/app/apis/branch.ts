import { IReqBranch } from "@/types/branch";
import { instance } from "./axios";

export const registerBranch = async (data: IReqBranch) => {
  const res = await instance.post("/admin/branch", data);
  return res.data;
};

export const getCompanyList = async () => {
  const res = await instance.get("/companies");
  return res.data.data.list;
};

export const getCompanyLocation = async (id: number, keyword: string) => {
  const res = await instance.get(`/branch?companyId=${id}&keyword=${keyword}`);
  return res.data.data.list;
};

export const deleteLocation = async (id: number) => {
  const res = await instance.delete(`/admin/branch/${id}`);
  return res.data;
};

export const editLocation = async ({ id, data }: { id: number; data: IReqBranch }) => {
  const res = await instance.patch(`/admin/branch/${id}`, data);
  return res.data;
};
