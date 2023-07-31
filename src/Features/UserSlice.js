import { createSlice, current } from "@reduxjs/toolkit";

export const UserSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    userAddress: [],
    token: null,
    refreshToken: null,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
    },
    logout: (state) => {
      state.user = null;
      localStorage.clear();
    },
    getUserAddress: (state, action) => {
      state.userAddress = action.payload;
    },
  },
});

export const { login, logout, getUserAddress } = UserSlice.actions;
export const selectUser = (state) => state.user;
export default UserSlice.reducer;
