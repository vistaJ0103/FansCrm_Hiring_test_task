import { IRegisterRequest, IUser } from "@/types";
import http from "./api";

class UserService {
  async getAll() {
    const res = await http.get<any[]>(`/getAllUser`);
    return res.data;
  }
  async getUserById(id: number) {
    const res = await http.get<IUser>(`/get-user/${id}`);
    return res.data;
  }
  async userupdate(payload: IRegisterRequest) {
    const res = await http.patch<IRegisterRequest>(`/user/update`, payload);
    return res.data;
  }
}

export const userService = new UserService();
