import { getContentDetail } from "@/app/apis/contents";
import { IContentDetail } from "@/types/contents";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Image from "next/image";
import React from "react";
import dayjs from "dayjs";
import ReplyCard from "./ReplyCard";

function SeeContentCard({ contentId }: { contentId: number }) {
  const { data, isSuccess } = useQuery<IContentDetail, AxiosError>(["content", contentId], () =>
    getContentDetail(contentId),
  );

  if (!data || !isSuccess) return null;

  const { tag1, tag2, thumbnail, title, createdAt, content, reply } = data;
  console.log(reply);
  return (
    <article>
      <div className="relative h-[460px]">
        <Image src={thumbnail} fill alt="PB 프로필" />
      </div>
      <div className="mt-6">
        <div className="text-xs font-bold">
          <span>
            {tag1}・{tag2}
          </span>
        </div>
        <p className="mb-3 text-2xl font-bold">{title}</p>
        <p className="font-xs flex-1">{dayjs(createdAt).format("YYYY. MM. DD")}</p>
        <div className="mb-[103px] text-sm">
          <p className="break-keep">{content}</p>
        </div>
      </div>
      <div className="flex">
        <div className="mb-[16px] flex-1 text-base font-bold">댓글 {reply.length}개</div>
      </div>
      {reply.map(reply => (
        <ReplyCard contentQueryKey={["content", contentId]} key={reply.id} reply={reply} />
      ))}
    </article>
  );
}

export default SeeContentCard;
