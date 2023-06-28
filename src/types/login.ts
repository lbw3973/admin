export interface IUser {
  email: string;
  password?: string;
}

export interface IResponseErrorData404 {
  data: string;
  msg: string;
  status: number;
}

export interface IResponseErrorData400 {
  data: {
    key: string;
    value: string;
  };
  msg: string;
  status: number;
}

export interface ILoginedUserInfo {
  id: number;
  role: "USER" | "PB" | "ADMIN";
  name: string;
  propensity: string | null;
  isAdmin: boolean;
}
export interface IResponseLogin {
  config: IResponseLoginConfig;
  headers: {
    authorization: string;
  };
  data: IResponseLoginData;
}

interface IResponseLoginData {
  status: number;
  msg: string;
  data: {
    id: number;
    code: string | null;
  };
}

interface IResponseLoginConfig {
  data: string;
}
