import { useRouter } from "next/navigation";
import React from "react";
const TH_STYLE = "border-r-1 border-[#E0E0E0] font-bold border-collapse";
const TD_style = "border-r-1 border-b-1 border-[#E0E0E0]";

interface NoticeListProps {
  noticeList: NoticeProps[];
  nowPage: number;
  isNotice: boolean;
}

interface NoticeProps {
  id: number;
  date?: string;
  title: string;
  content: string;
  label?: string;
}

function ListSection({ noticeList, nowPage, isNotice }: NoticeListProps) {
  const router = useRouter();
  const onClick = (id: number) => {
    if (isNotice) {
      router.push(`/notice/detailNotice/${id}`);
    } else {
      router.push(`/faq/detailFaq/${id}`);
    }
  };

  return (
    <>
      <table className="h-fit w-full table-fixed">
        <thead className="h-[52px] bg-[#425C6F] text-white">
          <tr>
            <th className={`${TH_STYLE} w-[36px]`}>No</th>
            <th className={`${TH_STYLE} w-full`}>{isNotice ? "공지사항" : "FAQ"}</th>
            <th className={`${TH_STYLE} w-[140px]`}>{isNotice ? "작성일" : "유형"}</th>
          </tr>
        </thead>
        <tbody>
          {noticeList &&
            noticeList.map((item, index) => (
              <tr
                key={item.id}
                onClick={() => onClick(item.id)}
                className="h-[52px] cursor-pointer text-center hover:bg-background-primary"
              >
                <td className={TD_style}>{nowPage * 10 + index + 1}</td>
                <td className={TD_style}>{item.title}</td>
                <td className={TD_style}>{isNotice ? item.date : item.label}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}

export default ListSection;
