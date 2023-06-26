"use client";
import TableBody from "@/components/joinAccept/TableBody";
import TableHeader from "@/components/joinAccept/TableHeader";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { AxiosError } from "axios";
import { getJoinList } from "../apis/joinAccept";
import { IJoinList } from "@/types/joinAccept";

function JoinAccept() {
  const { data, isLoading, isSuccess } = useQuery<unknown, AxiosError, IJoinList>({
    queryKey: ["joinList"],
    queryFn: getJoinList,
    refetchOnWindowFocus: false,
  });
  console.log(data?.data.data.page.list);
  return (
    // <table className="border-1 border-[#E0E0E0]">\
    <>
      <table className="w-[1084px] border-1 border-[#E0E0E0]">
        <TableHeader />
        {data?.data.data.page.list.map(item => (
          <TableBody key={item.id} item={item} />
        ))}
      </table>
      {data?.data.data.page.empty && (
        <div className="mt-20 w-[1084px] text-center text-2xl font-bold">현재 회원가입 승인 요청이 없습니다.</div>
      )}
    </>
  );
}

export default JoinAccept;
