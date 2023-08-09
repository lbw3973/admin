import { updateCompany } from "@/app/apis/branch";
import { ICompanyNameListData } from "@/types/branch";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import React, { ChangeEvent, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

type Props = {
  handleCloseModal: () => void;
  company: ICompanyNameListData;
};

const BUTTON_STYLE =
  "mb-4 block h-fit w-[220px] cursor-pointer rounded-[8px] border-1 border-gray-normal px-5 py-2 text-center text-xs font-bold";
function EditCompanyModal({ handleCloseModal, company }: Props) {
  const queryClient = useQueryClient();
  const { id, name, logo } = company;
  const [nowLogo, setNowLogo] = useState<string>(logo);
  const { register, setValue, handleSubmit, watch } = useForm({
    defaultValues: { companyName: name, logo } as { companyName: string; logo: File | string },
  });
  const isDisabled = watch("companyName") === name && watch("logo") === logo;
  const { mutate } = useMutation(updateCompany, {
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
    if (logo !== nowLogo) {
      formData.append("logo", logo);
    }
    if (name !== companyName) {
      const companyInDTO = { companyName };
      formData.append("companyInDTO", new Blob([JSON.stringify(companyInDTO)], { type: "application/json" }));
    }
    mutate({ id, formData });
  };

  return (
    <form className="mt-16 px-10" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-8 flex items-center justify-between">
        <span className="mr-10 w-[100px] font-bold text-primary-normal">증권사명</span>
        <input
          {...register("companyName")}
          className="flex-1 border-b-1 py-2"
          placeholder="수정할 증권사명을 입력해주세요"
          defaultValue={name}
        />
      </div>
      <div className="mb-8 flex justify-between">
        <span className="mr-10 w-[100px] font-bold text-primary-normal">증권사 로고</span>
        <div className="flex flex-1 justify-between">
          <div>
            <button onClick={() => setNowLogo(logo)} className={BUTTON_STYLE}>
              원래 사진으로 돌아가기
            </button>
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
            <Image src={nowLogo} alt={name} fill className="object-contain" />
          </div>
        </div>
      </div>
      <button
        disabled={isDisabled}
        className={`w-full rounded-md ${
          isDisabled ? "bg-button-inactive" : "bg-primary-normal  text-white"
        } py-4 font-bold`}
      >
        수정하기
      </button>
    </form>
  );
}

export default EditCompanyModal;
