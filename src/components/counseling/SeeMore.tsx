import React from "react";

const BUTTON_STYLE = "mb-3 rounded-md px-4 py-2 text-xs font-bold text-white";
const H4_STYLE = "px-4 text-xs font-bold leading-8 text-white";
const CARD_STYLE = "mb-4 overflow-hidden rounded-md shadow-md";
const LI_STYLE = "flex w-full justify-between py-1 text-xs";
function SeeMore() {
  return (
    <div className="w-1/2 border-l-1 border-[#E0E0E0]">
      <h3 className="h-[52px] bg-[#425C6F] px-4 leading-[52px] text-white">자세히 보기</h3>
      <article className="w-full px-12 py-6">
        <button className={`${BUTTON_STYLE} bg-status-alert`}>신규예약</button>
        <div className={CARD_STYLE}>
          <h4 className={`bg-[#425C6F] ${H4_STYLE}`}>상담 정보</h4>
          <ul className="w-full px-4 py-1">
            <li className={LI_STYLE}>
              <span className="font-bold">상담 신청 시간</span>
              <span>2023년 6월 20일 오전 1시 30분</span>
            </li>
            <li className={LI_STYLE}>
              <span className="font-bold">상담 유형</span>
              <span>방문상담</span>
            </li>
            <li className={LI_STYLE}>
              <span className="font-bold">상담 장소</span>
              <span>kb증권 강남중앙점</span>
            </li>
            <li className={LI_STYLE}>
              <span className="font-bold">상담 목적</span>
              <span>투자 수익 창출</span>
            </li>
          </ul>
        </div>
        <div className={CARD_STYLE}>
          <h4 className={`bg-secondary-heavy ${H4_STYLE}`}>고객 정보</h4>
          <ul className="w-full px-4 py-1">
            <li className={LI_STYLE}>
              <span className="font-bold">이메일</span>
              <span>test@test.com</span>
            </li>
            <li className={LI_STYLE}>
              <span className="font-bold">이름</span>
              <span>홍홍홍</span>
            </li>
            <li className={LI_STYLE}>
              <span className="font-bold">전화번호</span>
              <span>010-2222-3333</span>
            </li>
          </ul>
        </div>
        <div className={CARD_STYLE}>
          <h4 className={`bg-primary-normal ${H4_STYLE}`}>PB 정보</h4>
          <ul className="w-full px-4 py-1">
            <li className={LI_STYLE}>
              <span className="font-bold">이메일</span>
              <span>test@test.com</span>
            </li>
            <li className={LI_STYLE}>
              <span className="font-bold">이름</span>
              <span>홍홍홍</span>
            </li>
            <li className={LI_STYLE}>
              <span className="font-bold">전화번호</span>
              <span>010-2222-3333</span>
            </li>
          </ul>
        </div>
      </article>
    </div>
  );
}

export default SeeMore;
