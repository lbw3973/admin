"use client";
import React, { Dispatch, FormEvent, MouseEvent, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useLogin } from "@/hooks/useLogin";
import ButtonModal from "../common/ButtonModal";
import Image from "next/image";
import alert from "/public/assets/images/alert.svg";
import correct from "/public/assets/images/correct.svg";
import { IModalContent } from "@/types/common";
import { yup_email, yup_password } from "@/constants/yupSchema";

function DoubleInputForm({ setIsLogined }: { setIsLogined: Dispatch<SetStateAction<boolean>> }) {
  const [isOpen, setIsOpen] = useState(false);

  const modalContents_Default = {
    content: "일시적인 오류가 발생했습니다.",
    confirmText: "확인",
    confirmFn: () => {
      setIsOpen(false);
    },
  };
  const [modalContent, setModalContent] = useState<IModalContent>(modalContents_Default);
  const login = useLogin(setIsOpen, setModalContent, setIsLogined);

  const schema = yup.object().shape({
    email: yup_email,
    password: yup_password,
  });

  const {
    register,
    formState: { errors, isValid, dirtyFields },
    resetField,
    getValues,
  } = useForm({ mode: "all", resolver: yupResolver(schema), defaultValues: { email: "", password: "" } });

  const handleClear = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const button = e.target as HTMLButtonElement;
    const inputEl = button.previousElementSibling as HTMLInputElement;
    resetField(inputEl.name as "email" | "password", { defaultValue: "" });
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    login({ email: getValues("email"), password: getValues("password") });
  };

  return (
    <div>
      <p>안녕하세요,</p>
      <p>
        <span className="text-xl font-bold leading-7 text-primary-normal">MONEY BRIDGE </span>관리자 페이지입니다.
      </p>
      <form className="mx-auto mt-6" onSubmit={onSubmit}>
        <div className="mb-2.5">
          <h2 className="mb-4 mt-6 text-sm font-bold leading-5">이메일</h2>

          <div className="relative flex items-center">
            <input
              type="text"
              className={`form_input ${errors.email ? "warnning" : dirtyFields.email ? "entering" : ""} `}
              {...register("email")}
              autoFocus
            />
            {dirtyFields.email && (
              <>
                <button
                  type="button"
                  className="input_button bg-[url('/assets/images/clear.svg')]"
                  tabIndex={-1}
                  onClick={handleClear}
                ></button>
                <Image src={errors.email ? alert : correct} alt="input_status" className="input_status" />
              </>
            )}
          </div>
          <div className="h-[18px] pl-2">
            <span className={`text-xs leading-[18px] ${errors.email ? "text-status-alert" : "text-status-positive"}`}>
              {dirtyFields.email ? "@를 포함하여 작성해 주세요." : ""}
            </span>
          </div>
        </div>
        <div className="mb-2.5">
          <h2 className="mb-4 mt-6 text-sm font-bold leading-5">비밀번호</h2>
          <div className="relative flex items-center">
            <input
              type="password"
              className={`form_input ${errors.password ? "warnning" : ""} ${dirtyFields.password ? "entering" : ""}`}
              {...register("password")}
            />
            {dirtyFields.password && (
              <>
                <button
                  type="button"
                  className="input_button bg-[url('/assets/images/clear.svg')]"
                  tabIndex={-1}
                  onClick={handleClear}
                ></button>
                <Image src={errors.password ? alert : correct} alt="input_status" className="input_status" />
              </>
            )}
          </div>
          <div className="h-[18px] pl-2">
            <span
              className={`text-xs leading-[18px] ${errors.password ? "text-status-alert" : "text-status-positive"}`}
            >
              {dirtyFields.password ? "영문+숫자 조합으로 8자 이상 입력해 주세요." : ""}
            </span>
          </div>
        </div>
        <button
          className={`mt-4 h-14 w-full rounded-[8px] ${isValid ? "bg-primary-normal" : "bg-background-disabled"} ${
            isValid ? "cursor-pointer" : "cursor-not-allowed"
          }`}
          onClick={onSubmit}
          disabled={!isValid}
        >
          <span className={`text-xl font-bold leading-7 ${isValid ? "text-white" : "text-gray-heavy"}`}>로그인</span>
        </button>
      </form>
      {isOpen && (
        <ButtonModal modalContents={modalContent} isOpen={isOpen} setIsOpen={setIsOpen}>
          <p>정보를 확인해 주세요.</p>
        </ButtonModal>
      )}
    </div>
  );
}

export default DoubleInputForm;
