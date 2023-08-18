"use client";
import { UpdateFaqProps, getFaqitem, updateFaqDetail } from "@/app/apis/faq";
const ContentEditor = dynamic(() => import("@/components/common/ContentEditor"), {
  ssr: false,
});
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useEffect, useState } from "react";

function UpdateFaqPage({ params: { slug } }: { params: { slug: string } }) {
  const [createState, setCreateState] = useState({ id: Number(slug), title: "", content: "", label: "" });
  const router = useRouter();

  const { data: detailFaq } = useQuery<UpdateFaqProps, AxiosError>(["faqItem"], () => getFaqitem(Number(slug)));

  const { mutate: updateMutate } = useMutation(updateFaqDetail, {
    onSuccess: () => {
      router.back();
    },
  });

  const titleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const createdTitle = e.target.value;
    setCreateState(prevState => ({ ...prevState, title: createdTitle }));
  };

  const labelChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const createdContent = e.target.value;
    setCreateState(prevState => ({ ...prevState, label: createdContent }));
  };

  const cancelHandler = () => {
    router.back();
  };

  const createHandler = () => {
    updateMutate(createState);
  };

  const updateContent = (data: string) => {
    setCreateState({ ...createState, content: data });
  };

  useEffect(() => {
    if (!detailFaq) return;
    setCreateState({ ...detailFaq });
  }, [detailFaq]);

  if (!detailFaq) return;
  return (
    <div>
      <div className="w-full ">
        <div className="flex h-[52px] items-center justify-between bg-[#425C6F] p-4 ">
          <span className="mr-3 w-[40px] font-bold text-white">제목</span>
          <input className="w-full p-2 py-1 font-bold" defaultValue={detailFaq.title} onChange={titleChangeHandler} />
          <div className="ml-5 w-[300px] ">
            <button
              onClick={cancelHandler}
              className="h-[40px] w-[100px] rounded-sm bg-white font-bold text-black hover:bg-background-primary"
            >
              취소
            </button>
            <button
              onClick={createHandler}
              className="ml-3 h-[40px] w-[100px] rounded-sm bg-white font-bold text-black hover:bg-background-primary"
            >
              수정
            </button>
          </div>
        </div>
        <div className="flex h-[52px] items-center justify-between border-1 border-background-primary bg-[#425C6F] p-4 ">
          <span className="mr-[3px] w-[40px] font-bold text-white">유형</span>
          <input className="w-full p-2 py-1 font-bold" defaultValue={detailFaq.label} onChange={labelChangeHandler} />
        </div>
        <ContentEditor initialState={createState.content} updateContent={updateContent} />
      </div>
    </div>
  );
}

export default UpdateFaqPage;
