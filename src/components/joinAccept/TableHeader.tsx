const TH_STYLE = "rounded-[1px] h-[52px] border-r-1 border-b-1 border-[#E0E0E0] font-normal";

function TableHeader() {
  return (
    <thead className="bg-[#425C6F] text-white">
      <tr>
        <th className={`${TH_STYLE} w-[52px] border-l-1`}>No</th>
        <th className={`${TH_STYLE} w-[170px]`}>이메일</th>
        <th className={`${TH_STYLE} w-[90px]`}>이름</th>
        <th className={`${TH_STYLE} w-[132px]`}>전화번호</th>
        <th className={`${TH_STYLE} w-[160px]`}>지점명</th>
        <th className={`${TH_STYLE} w-[120px]`}>명함 확인</th>
        <th className={`${TH_STYLE} w-[212px]`}>승인 및 거절</th>
      </tr>
    </thead>
  );
}

export default TableHeader;
