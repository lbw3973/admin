"use client";
import CounselingList from "@/components/counseling/CounselingList";
import SeeMore from "@/components/counseling/SeeMore";
import { useQuery } from "@tanstack/react-query";
import { Pagination } from "antd";
import React, { useEffect, useState } from "react";
import { getReservations } from "../apis/reservations";
import { IReservationList, IReservationListData } from "@/types/counseling";
import { AxiosError } from "axios";

function Counseling() {
  const [seeMore, setSeeMore] = useState<IReservationList | null>(null);
  const [totalData, setTotalData] = useState(0);
  const [nowPage, setNowPage] = useState(0);
  const { data, isSuccess } = useQuery<IReservationListData, AxiosError>(["reservationList", nowPage], () => {
    return getReservations(nowPage);
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
    <>
      <div className="flex h-[572px] w-full border-b-1 border-[#E0E0E0]">
        <CounselingList nowPage={nowPage} reservationList={data?.list} setSeeMore={setSeeMore} />
        <SeeMore seeMore={seeMore} setSeeMore={setSeeMore} />
      </div>
      <Pagination className="py-2 text-center" onChange={onChange} defaultCurrent={1} total={totalData} />
    </>
  );
}

export default Counseling;
