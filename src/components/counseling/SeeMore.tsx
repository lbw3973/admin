import { ISeeMoreProps } from "@/types/counseling";
import SeeMoreCards from "./SeeMoreCards";

function SeeMore({ seeMore }: ISeeMoreProps) {
  return (
    <>
      {seeMore ? (
        <SeeMoreCards seeMore={seeMore} />
      ) : (
        <p className="mt-60 text-center">조회하실 상담 내역을 선택해주세요.</p>
      )}
    </>
  );
}

export default SeeMore;
