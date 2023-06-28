import { getLoginedUserInfo } from "@/app/apis/auth";
import { ILoginedUserInfo } from "@/types/login";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useGetUserInfo = () => {
  const {
    data: userInfo,
    isLoading: userLoading,
    isSuccess: isLogined,
    isError: isLoginError,
  } = useQuery<ILoginedUserInfo, AxiosError>({
    queryKey: ["loginedUserInfo"],
    queryFn: getLoginedUserInfo,
    refetchOnWindowFocus: false,
  });

  return { userInfo, userLoading, isLogined, isLoginError };
};
