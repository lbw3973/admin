"use client";
import { USER_TYPE } from "@/constants/enum";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import React, { MouseEvent, useEffect, useState } from "react";
import { Input, Pagination } from "antd";
import { getUserList } from "../apis/users";
import { IUserInfo } from "@/types/users";
import PbTableHeader from "@/components/users/PbTableHeader";
import PbTableBody from "@/components/users/PbTableBody";
import UserTableHeader from "@/components/users/UserTableHeader";
import UserTableBody from "@/components/users/UserTableBody";

function Users() {
  const [totalData, setTotalData] = useState(0);
  const [nowPage, setNowPage] = useState(0);
  const [userType, setUserType] = useState(USER_TYPE.PB);
  const [selectValue, setSelectValue] = useState("name");
  const [inputSearch, setInputSearch] = useState("");
  const [inputType, setInputType] = useState("text");
  const [debouncedInputSearch, setDebouncedInputSearch] = useState("");

  const [inputPlaceHolderText, setInputPlaceHolderText] = useState("이름으로 검색해주세요.");
  const { data, isSuccess } = useQuery<unknown, AxiosError, IUserInfo>(
    [userType, nowPage, debouncedInputSearch],
    () => {
      return getUserList({ type: userType, page: nowPage, keyword: debouncedInputSearch, searchType: selectValue });
    },
  );

  const handleTypeChange = (e: MouseEvent<HTMLButtonElement>) => {
    const button = e.target as HTMLButtonElement;
    setUserType(button.id as USER_TYPE);
    setNowPage(0);
  };

  const onChange = (page: number) => {
    setNowPage(page - 1);
  };

  const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectValue(e.target.value);

    switch (e.target.value) {
      case "name":
        setInputPlaceHolderText("이름으로 검색해주세요.");
        setInputType("text");
        break;
      case "email":
        setInputPlaceHolderText("이메일로 검색해주세요.");
        setInputType("email");
        break;
      case "phoneNumber":
        setInputPlaceHolderText("전화번호로 검색해주세요.");
        setInputType("number");
        break;
    }
  };

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputSearch(e.target.value);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedInputSearch(inputSearch);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [inputSearch]);

  useEffect(() => {
    if (isSuccess && data) {
      setTotalData(data.totalElements);
    }
  }, [isSuccess, data, inputSearch]);
  return (
    <>
      <div className={`my-2.5 ml-2.5 flex h-10 w-[1084px] items-center gap-4 pt-3  text-sm font-bold`}>
        <button
          id={`${USER_TYPE.PB}`}
          onClick={handleTypeChange}
          className={`h-8 w-24 rounded-[8px] shadow-md ${
            userType === USER_TYPE.PB ? "bg-[#334E54] text-white" : "bg-white"
          }`}
        >
          PB
        </button>
        <button
          id={`${USER_TYPE.USER}`}
          onClick={handleTypeChange}
          className={`h-8 w-24 rounded-[8px] shadow-md ${
            userType === USER_TYPE.USER ? "bg-[#334E54] text-white" : "bg-white"
          }`}
        >
          투자자
        </button>
        <select name="" id="" onChange={handleChangeSelect}>
          <option value="name">이름</option>
          <option value="email">이메일</option>
          <option value="phoneNumber">전화번호</option>
        </select>
        <input
          onChange={handleSearchInput}
          type={inputType}
          placeholder={inputPlaceHolderText}
          className="w-[400px] p-2"
        />
      </div>
      <div className={`mx-auto h-[750px] w-[1084px] bg-white shadow-md`}>
        <div className="flex h-[583px] w-full border-b-1 border-[#E0E0E0]">
          {userType === "PB" ? (
            <table className="table-fixed h-fit border-1">
              <PbTableHeader userType={userType} />
              {data?.list.map((item, index) => (
                <PbTableBody item={item} index={index + 1} key={index} userType={userType} page={nowPage} />
              ))}
            </table>
          ) : (
            <table className="table-fixed h-fit border-1">
              <UserTableHeader userType={userType} />
              {data?.list.map((item, index) => (
                <UserTableBody item={item} index={index + 1} key={index} userType={userType} page={nowPage} />
              ))}
            </table>
          )}
        </div>
        <Pagination className="py-2 text-center" onChange={onChange} total={totalData} defaultCurrent={nowPage} />
      </div>
    </>
  );
}

export default Users;
