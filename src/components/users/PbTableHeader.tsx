import { USER_TYPE } from "@/constants/enum";

const TH_STYLE = "rounded-[1px] h-[52px] border-r-1 border-b-1 border-[#E0E0E0] font-normal";

function PbTableHeader({ userType }: { userType: USER_TYPE }) {
  return (
    <thead className="bg-[#425C6F] text-white">
      <tr>
        <th className={`${TH_STYLE} w-[52px] border-l-1`}>No</th>
        <th className={`${TH_STYLE} w-[132px] border-l-1`}>가입일</th>
        <th className={`${TH_STYLE} w-[210px]`}>이메일</th>
        <th className={`${TH_STYLE} w-[120px]`}>이름</th>
        <th className={`${TH_STYLE} w-[200px]`}>전화번호</th>
        <th className={`${TH_STYLE} w-[88px]`}>회원 유형</th>
        <th className={`${TH_STYLE} w-[200px]`}>증권사 지점</th>
        <th className={`${TH_STYLE} w-[60px]`}>명함 확인</th>
        <th className={`${TH_STYLE} w-[60px]`}>탈퇴</th>
      </tr>
    </thead>
  );
}

export default PbTableHeader;
