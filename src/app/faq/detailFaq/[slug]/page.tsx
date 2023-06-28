"use client";
import { UpdateFaqProps, deleteFaqDetail, getFaqitem } from "@/app/apis/faq";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import React from "react";

function DetailFaqPage({ params: { slug } }: { params: { slug: string } }) {
  const router = useRouter();

  const { data: detailFaq } = useQuery<UpdateFaqProps, AxiosError>(["faqItem"], () => getFaqitem(Number(slug)));

  const { mutate: deleteMutate } = useMutation(deleteFaqDetail, {
    onSuccess: () => {
      router.back();
    },
  });

  const deleteHandler = () => {
    deleteMutate(Number(slug));
  };
  const updateHandler = () => {
    router.push(`/faq/updateFaq/${slug}`);
  };

  if (!detailFaq) return;
  return (
    <div>
      <div className="w-full ">
        <div className="flex h-[52px] items-center justify-between bg-[#425C6F] p-4 text-white">
          <h3 className="mr-[6px] w-[40px] font-bold text-white">제목</h3>
          <div className="w-[820px] p-2 py-1 font-bold text-white">{detailFaq.title}</div>
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
        <div className="flex h-[52px] items-center justify-between border-t-1 border-background-normal bg-[#425C6F] p-4 ">
          <h3 className="mr-2 w-[40px] font-bold text-white">유형</h3>
          <div className="w-full p-2 py-1 font-bold text-white">{detailFaq.label}</div>
        </div>
        <div className="flex h-[614px] items-center justify-center p-4">
          <p className={"h-full"}>{detailFaq.content}</p>
        </div>
      </div>
    </div>
  );
}

export default DetailFaqPage;
