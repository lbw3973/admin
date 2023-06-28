import { useGetUserInfo } from "@/hooks/useGetUserInfo";
import { useLogout } from "@/hooks/useLogout";
import Link from "next/link";
import React from "react";
import { FaHome, FaSignOutAlt } from "react-icons/fa";

function AdminInfoModal() {
  const logout = useLogout();
  const { userInfo, userLoading } = useGetUserInfo();

  if (!userInfo || userLoading) return null;
  return (
    <div className="grid h-[160px] w-[280px] grid-rows-[11fr_10fr] drop-shadow-md">
      <div className="gap-4 bg-primary-normal px-4 py-[30px]">
        <p className="flex items-center text-xl font-bold text-white">
          {userInfo.name}
          <span className="ml-2 inline-block rounded-md bg-primary-light px-2 py-1 text-xs">관리자</span>
        </p>
      </div>
      <div className="bg-white px-4 py-5 font-bold">
        <div className="mb-4 flex gap-3">
          <FaHome className="h-6 w-6" />
          <Link href="https://money-bridge.vercel.app/">머니브릿지로 돌아가기</Link>
        </div>
        <div className="flex gap-3">
          <FaSignOutAlt className="h-6 w-6" />
          <button onClick={() => logout()}>로그아웃</button>
        </div>
      </div>
    </div>
  );
}

export default AdminInfoModal;
