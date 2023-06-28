"use client";
import TableHeader from "@/components/users/TableHeader";
import { USER_TYPE } from "@/constants/enum";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { Pagination } from "antd";
import { getUserList } from "../apis/users";
import TableBody from "@/components/users/TableBody";
import { IUserInfo } from "@/types/users";

function Users() {
  const [totalData, setTotalData] = useState(0);
  const [nowPage, setNowPage] = useState(0);
  const [userType, setUserType] = useState(USER_TYPE.PB);
  const { data, isSuccess } = useQuery<unknown, AxiosError, IUserInfo>([userType, nowPage], () => {
    return getUserList({ type: userType, page: nowPage });
  });

  const onChange = (page: number) => {
    setNowPage(page - 1);
  };

  useEffect(() => {
    if (isSuccess && data) {
      setTotalData(data.totalElements);
    }
  }, [isSuccess, data]);

  return (
    <>
      <div
        className={`mx-auto mb-2.5 flex h-10 ${
          userType === USER_TYPE.PB ? "w-[853px]" : "w-[1084px]"
        } gap-4 text-sm font-bold`}
      >
        <button
          onClick={() => setUserType(USER_TYPE.PB)}
          className={`w-24 rounded-[8px] shadow-md ${
            userType === USER_TYPE.PB ? "bg-[#334E54] text-white" : "bg-white"
          }`}
        >
          PB
        </button>
        <button
          onClick={() => setUserType(USER_TYPE.USER)}
          className={`w-24 rounded-[8px] shadow-md ${
            userType === USER_TYPE.USER ? "bg-[#334E54] text-white" : "bg-white"
          }`}
        >
          투자자
        </button>
      </div>
      <div className={`mx-auto h-[750px] ${userType === USER_TYPE.PB ? "w-[853px]" : "w-[1084px]"} bg-white shadow-md`}>
        <div className="flex h-[583px] w-full border-b-1 border-[#E0E0E0]">
          <table className="h-fit table-fixed border-1">
            <TableHeader userType={userType} />
            {data?.list.map((item, index) => (
              <TableBody item={item} index={index + 1} key={index} userType={userType} page={nowPage} />
            ))}
          </table>
        </div>
        <Pagination className="py-2 text-center" onChange={onChange} total={totalData} defaultCurrent={1} />
      </div>
    </>
  );
}

export default Users;
