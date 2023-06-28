import { removeCookie } from "@/utils/cookies";
import { userLogout } from "@/app/apis/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate } = useMutation(userLogout, {
    onSuccess: () => {
      removeCookie("Authorization");
      removeCookie("refreshToken");
      queryClient.resetQueries();
      router.replace("https://money-bridge.vercel.app/");
    },
  });

  return mutate;
};
