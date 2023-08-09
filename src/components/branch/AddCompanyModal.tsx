import { addCompany } from "@/app/apis/branch";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import React, { ChangeEvent, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

const BUTTON_STYLE =
  "mb-4 block h-fit w-[220px] cursor-pointer rounded-[8px] border-1 border-gray-normal px-5 py-2 text-center text-xs font-bold";

type Props = {
  handleCloseModal: () => void;
};
function AddCompanyModal({ handleCloseModal }: Props) {
  const queryClient = useQueryClient();
  const [nowLogo, setNowLogo] = useState<string>("");
  const { handleSubmit, register, getValues, setValue } = useForm();
  const validate = getValues("companyName") && getValues("logo");
  const { mutate } = useMutation(addCompany, {
    onSuccess: () => {
      queryClient.refetchQueries(["companyList"]);
      handleCloseModal();
    },
  });
  const handleLogoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = (e.target.files as FileList)[0];
    const url = URL.createObjectURL(file);

    setNowLogo(url);
    setValue("logo", file);
  };

  const onSubmit = (data: FieldValues) => {
    const formData = new FormData();
    const { companyName, logo } = data;
    formData.append("companyInDTO", new Blob([JSON.stringify({ companyName })], { type: "application/json" }));
    formData.append("logo", logo);
    mutate(formData);
  };

  return (
    <form className="mt-16 px-10" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="mb-4 text-xl font-bold">등록할 증권사 정보를 입력해주세요</h2>
      <div className="mb-8 flex items-center justify-between">
        <span className="mr-10 w-[100px] font-bold text-primary-normal">증권사명</span>
        <input
          {...register("companyName")}
          className="flex-1 border-b-1 py-2"
          placeholder="등록할 증권사명을 입력해주세요"
        />
      </div>
      <div className="mb-8 flex justify-between">
        <span className="mr-10 w-[100px] font-bold text-primary-normal">증권사 로고</span>
        <div className="flex flex-1 justify-between">
          <div>
            <label className={`${BUTTON_STYLE} bg-primary-light text-white`} htmlFor="logo">
              이미지 찾기
            </label>
            <input
              id="logo"
              {...register("logo")}
              className="hidden"
              type="file"
              accept="image/*"
              onChange={handleLogoChange}
            />
          </div>
          <div className="relative h-[200px] w-[200px] border-1 border-gray-normal">
            {nowLogo && <Image src={nowLogo} alt="증권사 이미지" fill className="object-contain" />}
          </div>
        </div>
      </div>
      <button
        disabled={!validate}
        className={`w-full rounded-md py-4 font-bold ${
          validate ? " bg-primary-normal text-white" : "bg-button-inactive"
        }`}
      >
        등록하기
      </button>
    </form>
  );
}

export default AddCompanyModal;
