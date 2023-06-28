"use client";
import { UpdateNoticeProps, getNoticeDetail, updateNoticeDetail } from "@/app/apis/notice";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";

function UpdateNoticePage({ params: { slug } }: { params: { slug: string } }) {
  const [updateState, setUpdateState] = useState({ id: Number(slug), title: "", content: "" });
  const router = useRouter();

  const { data: detailFaq } = useQuery<UpdateNoticeProps, AxiosError>(["noticeItem"], () =>
    getNoticeDetail(Number(slug)),
  );

  const { mutate: updateMutate } = useMutation<null, AxiosError, UpdateNoticeProps>(updateNoticeDetail, {
    onSuccess: data => {
      console.log(data);
      router.back();
    },
  });

  const titleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const updatedTitle = e.target.value;
    setUpdateState(prevState => ({ ...prevState, title: updatedTitle }));
  };

  const contentChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const updatedContent = e.target.value;
    setUpdateState(prevState => ({ ...prevState, content: updatedContent }));
  };

  const deleteHandler = () => {
    router.back();
  };

  const updateHandler = () => {
    updateMutate(updateState);
  };

  if (!detailFaq) return;
  return (
    <div>
      <div className="w-full ">
        <div className="flex h-[52px] items-center justify-between bg-[#425C6F] p-4 ">
          <input defaultValue={detailFaq.title} className="w-full p-2 py-1 font-bold" onChange={titleChangeHandler} />
          <div className="ml-5 w-[280px] ">
            <button
              onClick={deleteHandler}
              className="h-[40px] w-[100px] rounded-sm bg-white font-bold text-black hover:bg-background-primary"
            >
              취소
            </button>
            <button
              onClick={updateHandler}
              className="ml-3 h-[40px] w-[100px] rounded-sm bg-white font-bold text-black hover:bg-background-primary"
            >
              수정
            </button>
          </div>
        </div>
        <div className="flex h-[614px] items-center justify-center p-4">
          <textarea
            defaultValue={detailFaq.content}
            onChange={contentChangeHandler}
            className={"h-full w-full"}
            name=""
            id=""
            cols={30}
            rows={10}
          ></textarea>
        </div>
      </div>
    </div>
  );
}

export default UpdateNoticePage;
