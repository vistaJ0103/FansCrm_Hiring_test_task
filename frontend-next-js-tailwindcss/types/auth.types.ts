import { IUser } from "./user.types";

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface IRegisterRequest extends ILoginRequest {
  userId?: string;
  name: string;
  email: string;
  password: string;
}

export interface ILoginResponse {
  token: string;
  user: IUser;
}
