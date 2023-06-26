import axios, { AxiosError } from "axios";
import { getCookie, setCookie } from "@/utils/cookies";
import { reissueToken } from "./joinAccept";

const createInstance = (ContentType: string) => {
  const instance = axios.create({
    // TODO: env
    timeout: 3000,
    baseURL: process.env.NEXT_PUBLIC_API_KEY,
    headers: {
      "Content-Type": ContentType,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
    withCredentials: true,
  });

  instance.interceptors.request.use(
    request => {
      const token = getCookie("Authorization");
      if (token) request.headers["Authorization"] = `${token}`;
      return request;
    },
    (error: AxiosError) => {
      console.log(error);
      return Promise.reject(error);
    },
  );

  instance.interceptors.response.use(
    response => {
      return response;
    },
    async error => {
      const {
        config,
        response: { status, data },
      } = error;
      if (status === 401) {
        if (data.msg === "unAuthorized") {
          const originalRequest = config;
          const { data } = await reissueToken();
          // 새로운 토큰 저장
          setCookie("Authorization", data.headers.authorization);
          return axios(originalRequest);
        }
      }

      return Promise.reject(error);
    },
  );
  return instance;
};
export const instance = createInstance("application/json");
export const formInstance = createInstance("multipart/form-data");
