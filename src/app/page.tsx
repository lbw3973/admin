"use client";
import DoughnutChart from "@/components/dashBoard/DoughnutChart";
import JoinPbCount from "@/components/dashBoard/JoinPbCount";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import React from "react";
import { IDashBoardData } from "@/types/dashBoard";
import { getDashBoardData } from "./apis/dashBoard";

function Home() {
  const { data, isLoading, isSuccess } = useQuery<unknown, AxiosError, IDashBoardData>({
    queryKey: ["joinList"],
    queryFn: getDashBoardData,
    refetchOnWindowFocus: false,
  });

  return (
    <div className="flex h-full w-full items-center justify-center gap-10">
      {data && (
        <div className="flex gap-10">
          <DoughnutChart dashBoardData={data} />
          <JoinPbCount pbCount={data.pb} />
        </div>
      )}
    </div>
  );
}

export default Home;
