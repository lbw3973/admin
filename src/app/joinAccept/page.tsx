"use client";
import TableBody from "@/components/joinAccept/TableBody";
import TableHeader from "@/components/joinAccept/TableHeader";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { AxiosError } from "axios";
import { getJoinList } from "../apis/joinAccept";
import { IJoinList } from "@/types/joinAccept";

function JoinAccept() {
  const { data, isLoading, isSuccess } = useQuery<unknown, AxiosError, IJoinList>({
    queryKey: ["joinList"],
    queryFn: getJoinList,
    refetchOnWindowFocus: false,
  });
  // console.log(data?.data.data.list);
  return (
    <>
      <table className="w-[1084px] border-1 border-[#E0E0E0] shadow-md">
        <TableHeader />
        {data?.data.data.list.map((item, index) => (
          <TableBody key={item.id} item={item} index={index + 1} />
        ))}
      </table>
      {data?.data.data.empty && (
        <div className="mt-20 w-[1084px] text-center text-2xl font-bold">현재 회원가입 승인 요청이 없습니다.</div>
      )}
    </>
  );
}

export default JoinAccept;
