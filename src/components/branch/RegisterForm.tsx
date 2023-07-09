import { registerBranch } from "@/app/apis/branch";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { FormEvent, useState } from "react";
import { useForm } from "react-hook-form";

function RegisterForm({ companyId }: { companyId: number }) {
  const [isError, setIsError] = useState(false);
  const queryClient = useQueryClient();

  const { register, getValues, reset } = useForm();

  const { mutate } = useMutation(registerBranch, {
    onSuccess: () => {
      queryClient.refetchQueries(["companyLocation"]);
      setIsError(false);
      reset();
    },
    onError: () => {
      setIsError(true);
    },
  });
  const handleRegister = (e: FormEvent) => {
    e.preventDefault();
    mutate({
      companyId: companyId,
      name: getValues("name"),
      address: getValues("address"),
      specificAddress: getValues("specificAddress"),
    });
  };
  return (
    <div className="h-[228px] p-4">
      <form onSubmit={handleRegister}>
        <div className="mb-3 flex items-center">
          <label className="w-[80px]">지점명</label>
          <input className="form_input" {...register("name")} />
        </div>
        <div className="mb-3 flex items-center">
          <label className="w-[80px]">지점 주소</label>
          <input className="form_input" {...register("address")} />
        </div>
        <div className="mb-3 flex items-center">
          <label className="w-[80px]">상세 주소</label>
          <input className="form_input" {...register("specificAddress")} />
        </div>
        <div className="flex w-full">
          {isError && <p className="text-sm text-status-alert">정확한 도로명/지번 주소로 입력해주세요.</p>}
          <button className="ml-auto rounded-md bg-primary-normal px-8 py-2 text-white">지점 등록</button>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
