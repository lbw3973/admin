import { deleteLocation } from "@/app/apis/branch";
import { ICompanyLocationListData } from "@/types/branch";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";

function LocationItem({ location }: { location: ICompanyLocationListData }) {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(deleteLocation, {
    onSuccess: () => {
      queryClient.refetchQueries(["companyLocation"]);
    },
  });
  const handleDelete = () => {
    mutate(location.id);
  };
  return (
    <div className="flex h-[52px] w-full border-collapse items-center justify-between border-b-1 border-[#E0E0E0] px-4">
      <div>
        <p>{location.name}</p>
        <p>{location.roadAddress}</p>
      </div>
      <button onClick={handleDelete} className="h-10 rounded-md bg-primary-normal px-2 text-sm text-white">
        지점 삭제
      </button>
    </div>
  );
}

export default LocationItem;
