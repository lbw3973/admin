import { IReReply } from "@/types/contents";
import Image from "next/image";
import { showName } from "@/utils/userNameFormat";
import dayjs from "dayjs";
import profileImg from "/public/profile.svg";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteReReply } from "@/app/apis/contents";

function ReReplyCard({ contentQueryKey, rereply }: { contentQueryKey: [string, number]; rereply: IReReply }) {
  const { id, profile, name, createdAt, content } = rereply;
  const queryClient = useQueryClient();
  const { mutate } = useMutation(deleteReReply, {
    onSuccess: () => {
      queryClient.refetchQueries(contentQueryKey);
    },
  });

  return (
    <div className="ml-auto mt-[33px] flex w-[90%] flex-col" key={id}>
      <div className="mb-2 flex text-xs">
        <Image className="mr-2 rounded-full" src={profile || profileImg} alt="프로필" width={18} height={18} />
        <span className="mr-2">{showName(name)} 님</span>
        <span className="flex-1">{dayjs(createdAt).format("YYYY-MM-DD HH:mm:ss")}</span>
        <button onClick={() => mutate(id)} className="rounded-md border-1 border-[#642626] px-2 py-1">
          삭제
        </button>
      </div>
      <p className="content">{content}</p>
    </div>
  );
}

export default ReReplyCard;
