import { IReservationList } from "@/types/counseling";
import { useState } from "react";

const TH_STYLE = "border-r-1 border-[#E0E0E0] font-normal border-collapse";
const TD_style = "border-r-1 border-b-1 border-[#E0E0E0]";
function CounselingList({ nowPage, reservationList }: { nowPage: number; reservationList: IReservationList[] }) {
  return (
    <>
      <table className="h-fit w-1/2">
        <thead className="h-[52px] bg-[#425C6F] text-white">
          <tr>
            <th className={TH_STYLE}>No</th>
            <th className={TH_STYLE}>이메일</th>
            <th className={TH_STYLE}>이름</th>
            <th className={TH_STYLE}>전화번호</th>
          </tr>
        </thead>
        <tbody>
          {reservationList.map((item, index) => (
            <tr key={item.id} className="h-[52px] text-center">
              <td className={TD_style}>{nowPage * 10 + index + 1}</td>
              <td className={TD_style}>{item.user.email}</td>
              <td className={TD_style}>{item.user.name}</td>
              <td className={TD_style}>{item.user.phoneNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default CounselingList;
