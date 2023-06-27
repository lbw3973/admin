"use client";
import { Pagination } from "antd";
import React, { useEffect, useState } from "react";
import { deleteContent, getContents } from "../apis/contents";
import { IContentsList, IContentsListData } from "@/types/contents";
import { AxiosError } from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ContentsList from "../../components/contents/ContentsList";
import SeeContentCard from "@/components/contents/SeeContentCard";

const TH_STYLE = "border-r-1 border-[#E0E0E0] font-normal border-collapse";
function Contents() {
  const [contentId, setContentId] = useState<number | null>(null);
  const [totalData, setTotalData] = useState(0);
  const [nowPage, setNowPage] = useState(0);
  const queryClient = useQueryClient();
  const { data, isSuccess } = useQuery<IContentsListData, AxiosError>(["contentsList", nowPage], () => {
    return getContents(nowPage);
  });
  const { mutate: deletePost } = useMutation(deleteContent, {
    onSuccess: () => {
      queryClient.refetchQueries(["contentsList"]);
      setContentId(null);
    },
  });
  const onChange = (page: number) => {
    setNowPage(page - 1);
  };

  useEffect(() => {
    if (isSuccess && data) {
      setTotalData(data.totalElements);
    }
  }, [data]);

  return (
    <>
      <div className="flex h-[572px] w-full border-b-1 border-[#E0E0E0]">
        <table className="h-fit w-1/2 table-fixed">
          <thead className="h-[52px] bg-[#425C6F] text-white">
            <tr>
              <th className={`${TH_STYLE} w-[36px]`}>No</th>
              <th className={`${TH_STYLE} w-[276px]`}>게시글 명</th>
              <th className={`${TH_STYLE} w-[73px]`}>작성자</th>
            </tr>
          </thead>
          <tbody>
            {data && <ContentsList nowPage={nowPage} contentsList={data.list} setContentId={setContentId} />}
          </tbody>
        </table>
        <div className="w-1/2 justify-self-end border-l-1 border-[#E0E0E0]">
          <div className="flex h-[52px] items-center justify-between bg-[#425C6F] px-4">
            <h3 className=" text-white">자세히 보기</h3>

            {contentId && (
              <div>
                <button
                  onClick={() => deletePost(contentId)}
                  className="mr-4 rounded-md bg-[#642626] px-4 py-1 text-sm text-white"
                >
                  삭제
                </button>
                <button
                  onClick={() => setContentId(null)}
                  className="rounded-md bg-background-primary px-4 py-1 text-sm"
                >
                  닫기
                </button>
              </div>
            )}
          </div>
          <div className="h-[520px] overflow-scroll p-10">
            {contentId ? (
              <SeeContentCard contentId={contentId} />
            ) : (
              <p className="mt-60 text-center">조회하실 게시글을 선택해주세요.</p>
            )}
          </div>
        </div>
      </div>
      <Pagination className="py-2 text-center" onChange={onChange} defaultCurrent={1} total={totalData} />
    </>
  );
}

export default Contents;
