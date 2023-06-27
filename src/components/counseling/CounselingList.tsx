import { IReservationList } from "@/types/counseling";
import { Dispatch, SetStateAction } from "react";

const TH_STYLE = "border-r-1 border-[#E0E0E0] font-normal border-collapse";
const TD_style = "border-r-1 border-b-1 border-[#E0E0E0]";
function CounselingList({
  nowPage,
  reservationList,
  setSeeMore,
}: {
  nowPage: number;
  reservationList: IReservationList[] | undefined;
  setSeeMore: Dispatch<SetStateAction<IReservationList | null>>;
}) {
  return (
    <>
      <table className="h-fit w-1/2 table-fixed">
        <thead className="h-[52px] bg-[#425C6F] text-white">
          <tr>
            <th className={`${TH_STYLE} w-[36px]`}>No</th>
            <th className={`${TH_STYLE} w-[276px]`}>이메일</th>
            <th className={`${TH_STYLE} w-[73px]`}>이름</th>
            <th className={`${TH_STYLE} w-[156px]`}>전화번호</th>
          </tr>
        </thead>
        <tbody>
          {reservationList &&
            reservationList.map((item, index) => (
              <tr
                key={item.id}
                onClick={() => {
                  setSeeMore(item);
                }}
                className="h-[52px] cursor-pointer text-center hover:bg-background-primary"
              >
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
