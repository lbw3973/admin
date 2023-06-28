"use client";
import TableBody from "@/components/joinAccept/TableBody";
import TableHeader from "@/components/joinAccept/TableHeader";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { getJoinList } from "../apis/joinAccept";
import { IJoinList } from "@/types/joinAccept";
import { Pagination } from "antd";

function JoinAccept() {
  const [totalData, setTotalData] = useState(0);
  const [nowPage, setNowPage] = useState(0);
  const { data, isSuccess } = useQuery<unknown, AxiosError, IJoinList>(["joinList", nowPage], () => {
    return getJoinList(nowPage);
  });

  const onChange = (page: number) => {
    setNowPage(page - 1);
  };

  useEffect(() => {
    if (isSuccess && data) {
      setTotalData(data.totalElements);
    }
  }, [isSuccess]);

  return (
    <div className="mx-auto h-full w-[1084px] bg-white shadow-md">
      <div className="flex h-[587px] w-full border-b-1 border-[#E0E0E0]">
        <table className="h-fit table-fixed border-1">
          <TableHeader />
          {data?.list.map((item, index) => (
            <TableBody key={item.id} item={item} index={index + 1} page={nowPage} />
          ))}
        </table>
        {data?.empty && (
          <div className="mt-20 w-[1084px] text-center text-2xl font-bold">현재 회원가입 승인 요청이 없습니다.</div>
        )}
      </div>
      <Pagination className="py-2 text-center" onChange={onChange} defaultCurrent={1} total={totalData} />
    </div>
  );
}

export default JoinAccept;
