"use client";

import Authentication from "@/components/login/Authentication";
import DoubleInputForm from "@/components/login/DoubleInputForm";
import { useGetUserInfo } from "@/hooks/useGetUserInfo";
import { redirect } from "next/navigation";
import React, { useState } from "react";

function LoginPage() {
  const { isLogined: isLoginedUser, userLoading } = useGetUserInfo();
  if (isLoginedUser && !userLoading) {
    redirect("/");
  }
  const [isLogined, setIsLogined] = useState(false);
  return (
    <div className="mx-auto w-[500px] pt-40 text-black">
      {!isLogined ? <DoubleInputForm setIsLogined={setIsLogined} /> : <Authentication />}
    </div>
  );
}

export default LoginPage;
