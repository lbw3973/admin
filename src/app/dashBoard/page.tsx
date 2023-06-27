"use client";
import DoughnutChart from "@/components/dashBoard/DoughnutChart";
import JoinPbCount from "@/components/dashBoard/JoinPbCount";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import React from "react";
import { getDashBoardData } from "../apis/dashBoard";
import { IDashBoardData } from "@/types/dashBoard";

function DashBoard() {
  const { data, isLoading, isSuccess } = useQuery<unknown, AxiosError, IDashBoardData>({
    queryKey: ["joinList"],
    queryFn: getDashBoardData,
    refetchOnWindowFocus: false,
  });

  return (
    <div className="flex max-w-[900px] flex-wrap items-center justify-center gap-10">
      {data && (
        <>
          <DoughnutChart dashBoardData={data} />
          <JoinPbCount pbCount={data.pb} />
        </>
      )}
    </div>
  );
}

export default DashBoard;
