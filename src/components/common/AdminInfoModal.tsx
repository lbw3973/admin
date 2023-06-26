import Image from "next/image";
import React from "react";

function AdminInfoModal() {
  return (
    <div className="grid h-[220px] w-[280px] grid-rows-[11fr_10fr] drop-shadow-md">
      <div className="bg-primary-normal">
        <div className="flex items-center gap-4 px-4 py-[30px]">
          <div className="h-[60px] w-[60px] rounded-full bg-white">{/* <Image/> */}</div>
          <div className="flex flex-col  text-white">
            <p className="font-bold">권범준</p>
            <p>test@test.com</p>
          </div>
        </div>
      </div>
      <div className="bg-white px-4 py-5 font-bold">
        <div className="mb-4 flex gap-3">
          {/* <Image/> */}
          <div className="h-6 w-6 bg-black"></div>
          <p>머리브릿지로 돌아가기</p>
        </div>
        <div className="flex gap-3">
          {/* <Image/> */}
          <div className="h-6 w-6 bg-black"></div>
          <p>로그아웃</p>
        </div>
      </div>
    </div>
  );
}

export default AdminInfoModal;
