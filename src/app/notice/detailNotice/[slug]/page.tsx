"use client";
import { UpdateNoticeProps, deleteNoticeDetail, getNoticeDetail } from "@/app/apis/notice";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import React from "react";

function DetailNoticePage({ params: { slug } }: { params: { slug: string } }) {
  const router = useRouter();

  const { data: detailNotice } = useQuery<UpdateNoticeProps, AxiosError>(["noticeItem"], () =>
    getNoticeDetail(Number(slug)),
  );

  const { mutate: deleteMutate } = useMutation<null, AxiosError, number>(deleteNoticeDetail, {
    onSuccess: () => {
      router.back();
    },
  });

  const deleteHandler = () => {
    deleteMutate(Number(slug));
  };
  const updateHandler = () => {
    router.push(`/notice/updateNotice/${slug}`);
  };

  if (!detailNotice) return;
  return (
    <div>
      <div className="w-full ">
        <div className="flex h-[52px] items-center justify-between bg-[#425C6F] p-4 text-white">
          <h3 className="font-bold ">{detailNotice.title}</h3>
          <div className="justify-self-end">
            <button
              onClick={updateHandler}
              className="mx-3 h-[40px] w-[80px] rounded-sm bg-white font-bold text-black hover:bg-background-primary"
            >
              수정
            </button>
            <button
              onClick={deleteHandler}
              className="h-[40px] w-[80px] rounded-sm bg-white font-bold text-black hover:bg-background-primary"
            >
              삭제
            </button>
          </div>
        </div>
        <div
          className="flex h-[614px] items-center justify-center p-4"
          dangerouslySetInnerHTML={{ __html: detailNotice.content }}
        />
      </div>
    </div>
  );
}

export default DetailNoticePage;
