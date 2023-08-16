import { instance } from "./axios";

export const getUserList = async ({
  type,
  page,
  keyword,
  searchType,
}: {
  type: string;
  page: number;
  keyword: string;
  searchType: string;
}) => {
  const res = await instance.get(`/admin/${type.toLowerCase()}s`, {
    params: {
      page,
      keyword,
      type: searchType,
    },
  });
  return res.data.data;
};

export const withdrawUser = async ({ type, id }: { type: string; id: number }) => {
  const res = await instance.delete(`/admin/${type.toLowerCase()}/${id}`);
  return res.data;
};

export const setAdminPermission = async ({ id, accept }: { id: number; accept: boolean }) => {
  const res = await instance.post(`/admin/user/${id}?admin=${accept}`);
  return res.data;
};
