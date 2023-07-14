"use client";
import TableHeader from "@/components/users/TableHeader";
import { USER_TYPE } from "@/constants/enum";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import React, { MouseEvent, useEffect, useState } from "react";
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

  const handleTypeChange = (e: MouseEvent<HTMLButtonElement>) => {
    const button = e.target as HTMLButtonElement;
    setUserType(button.id as USER_TYPE);
    setNowPage(0);
  };

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
      <div className={`my-2.5 ml-2.5 flex h-10 w-[1084px] gap-4 text-sm font-bold `}>
        <button
          id={`${USER_TYPE.PB}`}
          onClick={handleTypeChange}
          className={`w-24 rounded-[8px] shadow-md ${
            userType === USER_TYPE.PB ? "bg-[#334E54] text-white" : "bg-white"
          }`}
        >
          PB
        </button>
        <button
          id={`${USER_TYPE.USER}`}
          onClick={handleTypeChange}
          className={`w-24 rounded-[8px] shadow-md ${
            userType === USER_TYPE.USER ? "bg-[#334E54] text-white" : "bg-white"
          }`}
        >
          투자자
        </button>
      </div>
      <div className={`mx-auto h-[750px] w-[1084px] bg-white shadow-md`}>
        <div className="flex h-[583px] w-full border-b-1 border-[#E0E0E0]">
          <table className="h-fit table-fixed border-1">
            <TableHeader userType={userType} />
            {data?.list.map((item, index) => (
              <TableBody item={item} index={index + 1} key={index} userType={userType} page={nowPage} />
            ))}
          </table>
        </div>
        <Pagination className="py-2 text-center" onChange={onChange} total={totalData} defaultCurrent={nowPage} />
      </div>
    </>
  );
}

export default Users;
