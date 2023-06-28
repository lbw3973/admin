import Image from "next/image";
import profileImg from "/public/profile.svg";
import { showName } from "@/utils/userNameFormat";
import dayjs from "dayjs";
import { IReply } from "@/types/contents";
import ReReplyCard from "./ReReplyCard";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteReply } from "@/app/apis/contents";

function ReplyCard({ contentQueryKey, reply }: { contentQueryKey: [string, number]; reply: IReply }) {
  const { id, profile, name, createdAt, reReply, content } = reply;
  const queryClient = useQueryClient();
  const { mutate } = useMutation(deleteReply, {
    onSuccess: () => {
      queryClient.refetchQueries(contentQueryKey);
    },
  });
  return (
    <div className="mt-[33px]" key={id}>
      <div className="flex items-end text-xs">
        <Image className="mr-2 rounded-full" src={profile || profileImg} alt="프로필" width={18} height={18} />
        <span className="mr-2">{showName(name)} 님</span>
        <span className="flex-1">{dayjs(createdAt).format("YYYY-MM-DD HH:mm:ss")}</span>
        <button onClick={() => mutate(id)} className="rounded-md border-1 border-[#642626] px-2 py-1">
          삭제
        </button>
      </div>
      <div className="content">{content}</div>

      {reReply.map(rereply => (
        <ReReplyCard contentQueryKey={contentQueryKey} key={rereply.id} rereply={rereply} />
      ))}
    </div>
  );
}

export default ReplyCard;
