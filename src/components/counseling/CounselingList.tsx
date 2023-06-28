import { ICounselingListProps } from "@/types/counseling";

const TD_style = "border-r-1 border-b-1 border-[#E0E0E0]";
function CounselingList({ nowPage, reservationList, setSeeMore }: ICounselingListProps) {
  return (
    <>
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
    </>
  );
}

export default CounselingList;
