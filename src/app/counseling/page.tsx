"use client";
import CounselingList from "@/components/counseling/CounselingList";
import SeeMore from "@/components/counseling/SeeMore";
import { useQuery } from "@tanstack/react-query";
import { Pagination } from "antd";
import React, { useEffect, useState } from "react";
import { getReservations } from "../apis/reservations";
import { IReservationList, IReservationListData } from "@/types/counseling";
import { AxiosError } from "axios";

const TH_STYLE = "border-r-1 border-[#E0E0E0] font-normal border-collapse";
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
        <table className="h-fit w-1/2 table-fixed">
          <thead className="h-[52px] bg-[#425C6F] text-white">
            <tr>
              <th className={`${TH_STYLE} w-[36px]`}>No</th>
              <th className={`${TH_STYLE} w-[276px]`}>이메일</th>
              <th className={`${TH_STYLE} w-[73px]`}>이름</th>
              <th className={`${TH_STYLE} w-[156px]`}>전화번호</th>
            </tr>
          </thead>
          <tbody>
            <CounselingList nowPage={nowPage} reservationList={data?.list} setSeeMore={setSeeMore} />
          </tbody>
        </table>{" "}
        <div className="w-1/2 justify-self-end border-l-1 border-[#E0E0E0]">
          <div className="flex h-[52px] items-center justify-between bg-[#425C6F] px-4">
            <h3 className=" text-white">자세히 보기</h3>
            <button onClick={() => setSeeMore(null)} className="rounded-md bg-background-primary px-4 py-1 text-sm">
              닫기
            </button>
          </div>
          <SeeMore seeMore={seeMore} />
        </div>
      </div>
      <Pagination className="py-2 text-center" onChange={onChange} defaultCurrent={1} total={totalData} />
    </>
  );
}

export default Counseling;
