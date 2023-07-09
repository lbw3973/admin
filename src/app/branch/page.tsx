"use client";
import CompanyItem from "@/components/branch/CompanyItem";
import { ICompanyLocationListData, ICompanyNameListData } from "@/types/branch";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { getCompanyList, getCompanyLocation } from "../apis/branch";
import LocationItem from "@/components/branch/LocationItem";
import RegisterForm from "@/components/branch/RegisterForm";

function Page() {
  const [company, setCompanyId] = useState<ICompanyNameListData>({ id: 0, name: "", logo: "" });
  const [keyword, setKeyword] = useState(company.name);

  const { data: companyList } = useQuery<any, unknown, ICompanyNameListData[], any>(["companyList"], getCompanyList);

  const { data: locationList } = useQuery<any, unknown, ICompanyLocationListData[], any>(
    ["companyLocation", company.id, keyword],
    () => getCompanyLocation(company.id, keyword),
  );

  return (
    <div className="flex h-[572px] w-full">
      <div className="h-fit w-[300px] table-fixed">
        <div className="h-[52px] bg-[#425C6F] text-white">
          <div className="w-[300px] border-collapse border-r-1 border-[#E0E0E0] text-center font-bold leading-[52px]">
            증권사 리스트
          </div>
        </div>
        <div className="h-[748px] overflow-y-scroll">
          <div className="text-center">
            {companyList &&
              companyList.map(item => (
                <CompanyItem key={item.id} company={item} setCompanyId={setCompanyId} setKeyword={setKeyword} />
              ))}
          </div>
        </div>
      </div>
      <div className="w-full">
        <h3 className="h-[52px] bg-[#425C6F] text-center leading-[52px] text-white">지점 리스트</h3>
        <div className="h-[520px] overflow-scroll">
          {company.id === 0 ? (
            <p className="mt-60 text-center">조회하실 증권사를 선택해주세요.</p>
          ) : (
            <>
              {locationList?.length ? (
                locationList?.map(item => <LocationItem key={item.id} location={item} />)
              ) : (
                <p className="mt-60 text-center">등록된 지점이 없습니다.</p>
              )}
            </>
          )}
        </div>
        {company.id !== 0 && <RegisterForm companyId={company.id} />}
      </div>
    </div>
  );
}

export default Page;
