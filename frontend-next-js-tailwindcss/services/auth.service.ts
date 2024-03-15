import http from "./api";
import { ILoginRequest, ILoginResponse, IRegisterRequest } from "../types";

class AuthService {
  async login(payload: ILoginRequest) {
    const res = await http.post<ILoginResponse>(`/login`, payload);
    return res.data;
  }

  async register(payload: IRegisterRequest) {
    const res = await http.post<ILoginResponse>(`/add-user`, payload);
    return res.data;
  }
}

export const authService = new AuthService();
