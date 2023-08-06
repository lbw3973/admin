import { reservationGoal, reservationProcess, reservationType, statusBackground } from "@/constants/reservationTexts";
import { IReservationList, TReserveStatus } from "@/types/counseling";
import React from "react";

const BUTTON_STYLE = "mb-3 rounded-md px-4 py-2 text-xs font-bold text-white";
const H4_STYLE = "px-4 text-xs font-bold leading-8 text-white";
const CARD_STYLE = "mb-4 overflow-hidden rounded-md shadow-md";
const LI_STYLE = "flex w-full justify-between py-1 text-xs";
function SeeMoreCards({ seeMore }: { seeMore: IReservationList }) {
  const { user, pb, time, type, locationName, goal, status, process, createdAt } = seeMore;
  const reservTime = reservationType[type];
  const reservGoal = reservationGoal[goal];
  const reservStatus = status === "CANCEL" ? "예약취소" : (reservationProcess[process] as TReserveStatus);
  const reservBackground = statusBackground[reservStatus];

  return (
    <article className="w-full px-12 py-6">
      <div className="flex items-center justify-between">
        <p className={`${BUTTON_STYLE} ${reservBackground}`}>{reservStatus}</p>
        <p>신청일 : {createdAt}</p>
      </div>
      <div className={CARD_STYLE}>
        <h4 className={`bg-[#425C6F] ${H4_STYLE}`}>상담 정보</h4>
        <ul className="w-full px-4 py-1">
          <li className={LI_STYLE}>
            <span className="font-bold">상담 신청 시간</span>
            <span>{time || "상담 시간 미정"}</span>
          </li>
          <li className={LI_STYLE}>
            <span className="font-bold">상담 유형</span>
            <span>{reservTime}</span>
          </li>
          <li className={LI_STYLE}>
            <span className="font-bold">상담 장소</span>
            <span>{locationName || "상담 장소 미정"}</span>
          </li>
          <li className={LI_STYLE}>
            <span className="font-bold">상담 목적</span>
            <span>{reservGoal}</span>
          </li>
        </ul>
      </div>
      <div className={CARD_STYLE}>
        <h4 className={`bg-secondary-heavy ${H4_STYLE}`}>고객 정보</h4>
        <ul className="w-full px-4 py-1">
          <li className={LI_STYLE}>
            <span className="font-bold">이메일</span>
            <span>{user.email}</span>
          </li>
          <li className={LI_STYLE}>
            <span className="font-bold">이름</span>
            <span>{user.name}</span>
          </li>
          <li className={LI_STYLE}>
            <span className="font-bold">전화번호</span>
            <span>{user.phoneNumber}</span>
          </li>
        </ul>
      </div>
      <div className={CARD_STYLE}>
        <h4 className={`bg-primary-normal ${H4_STYLE}`}>PB 정보</h4>
        <ul className="w-full px-4 py-1">
          <li className={LI_STYLE}>
            <span className="font-bold">이메일</span>
            <span>{pb.email}</span>
          </li>
          <li className={LI_STYLE}>
            <span className="font-bold">이름</span>
            <span>{pb.name}</span>
          </li>
          <li className={LI_STYLE}>
            <span className="font-bold">전화번호</span>
            <span>{pb.phoneNumber}</span>
          </li>
        </ul>
      </div>
    </article>
  );
}

export default SeeMoreCards;
