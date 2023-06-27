import { ISeeMoreProps } from "@/types/counseling";
import SeeMoreCards from "./SeeMoreCards";

function SeeMore({ seeMore, setSeeMore }: ISeeMoreProps) {
  return (
    <div className="w-1/2 justify-self-end border-l-1 border-[#E0E0E0]">
      <div className="flex h-[52px] items-center justify-between bg-[#425C6F] px-4">
        <h3 className=" text-white">자세히 보기</h3>
        <button onClick={() => setSeeMore(null)} className="rounded-md bg-background-primary px-4 py-1 text-sm">
          닫기
        </button>
      </div>
      {seeMore ? (
        <SeeMoreCards seeMore={seeMore} />
      ) : (
        <p className="mt-60 text-center">조회하실 상담 내역을 선택해주세요.</p>
      )}
    </div>
  );
}

export default SeeMore;
