import { userLogin } from "@/app/apis/auth";
import { useAuthenticationStore } from "@/store/authenticationStore";
import { IModalContent } from "@/types/common";
import { IResponseErrorData400, IResponseErrorData404 } from "@/types/login";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useLogin = (
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setModalContent: React.Dispatch<React.SetStateAction<IModalContent>>,
  setIsLogined: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const queryClient = useQueryClient();
  const { setCode } = useAuthenticationStore();

  const { mutate } = useMutation(userLogin, {
    onSuccess: data => {
      queryClient.setQueryData(["login"], data);
      setIsLogined(true);
      setCode(data.data.data.code);
    },
    onError: (err: AxiosError) => {
      const errorStatus = err.response?.status;

      if (errorStatus === 400) {
        const errorData = err.response?.data as IResponseErrorData400;
        setModalContent({
          content: errorData.data.value,
          confirmText: "재입력",
          confirmFn: () => {
            setIsOpen(false);
          },
        });
      } else if (errorStatus === 404) {
        const errorData = err.response?.data as IResponseErrorData404;
        setModalContent({
          content: errorData.data,
          confirmText: "재입력",
          confirmFn: () => {
            setIsOpen(false);
          },
        });
      } else if (errorStatus === 500) {
        setModalContent({
          content: "일시적인 오류가 발생했습니다.",
          confirmText: "재입력",
          confirmFn: () => {
            setIsOpen(false);
          },
        });
      }

      setIsOpen(true);
    },
  });

  return mutate;
};
