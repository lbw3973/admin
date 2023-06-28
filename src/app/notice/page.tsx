"use client";

import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Pagination } from "antd";
import ListSection from "@/components/common/ListSection";
import { getNoticeList } from "../apis/notice";
import { useRouter } from "next/navigation";

function NoticePage() {
  const router = useRouter();

  const [totalData, setTotalData] = useState(0);
  const [nowPage, setNowPage] = useState(0);
  const { data: noticeList, isSuccess } = useQuery(["notice"], () => {
    return getNoticeList(nowPage);
  });

  const onChange = (page: number) => {
    setNowPage(page - 1);
  };
  console.log(noticeList);
  useEffect(() => {
    if (isSuccess && noticeList) {
      setTotalData(noticeList.totalElements);
    }
  }, [isSuccess]);
  const createHandler = () => {
    router.push(`/notice/createNotice`);
  };
  if (!noticeList) return;
  return (
    <div>
      <ListSection noticeList={noticeList.list} nowPage={nowPage} isNotice={true} />
      <Pagination className="py-2 text-center" onChange={onChange} defaultCurrent={1} total={totalData} />
      <div className="flex justify-end mx-4">
        <button
          onClick={createHandler}
          className="h-[40px] w-[100px] rounded-sm bg-[#425C6F] font-bold text-white hover:bg-primary-normal"
        >
          작성하기
        </button>
      </div>
    </div>
  );
}

export default NoticePage;
