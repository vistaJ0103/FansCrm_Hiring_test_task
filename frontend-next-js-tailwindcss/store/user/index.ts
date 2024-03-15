import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../index";
import { IUser } from "../../types";

export interface UserState {
  user: IUser;
  isLogin: boolean;
}

const initialState: UserState = {
  user: {
    _id: "",
    name: "",
    email: "",
    phoneNumber: "",
  },
  isLogin:
    typeof localStorage !== "undefined" && localStorage.getItem("token")
      ? true
      : false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    initUser: (state) => {
      state.user = {
        _id: "",
        name: "",
        email: "",
        phoneNumber: "",
      };
    },
    updateUser: (state, action) => {
      state.user = action.payload;
    },
    updateName: (state, action) => {
      state.user.name = action.payload;
    },
    logIn: (state, action) => {
      localStorage.setItem("token", action.payload);
      return {
        ...state,
        isLogin: true,
      };
    },
    logOut: (state) => {
      state.user = {
        _id: "",
        name: "",
        email: "",
        phoneNumber: "",
      };
      state.isLogin = false;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {},
});

export const { initUser, updateUser, updateName, logIn, logOut } =
  userSlice.actions;
export const selectUser = (state: RootState) => state.user;
export default userSlice.reducer;
