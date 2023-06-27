import { instance } from "./axios";

export const getUserList = async ({ type, page }: { type: string; page: number }) => {
  const res = await instance.get(`/admin/members?type=${type.toLowerCase()}&page=${page}`);
  return res.data.data;
};
