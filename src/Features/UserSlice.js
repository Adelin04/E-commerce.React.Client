import { createSlice } from "@reduxjs/toolkit";

export const UserSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
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
  },
});

export const { login, logout } = UserSlice.actions;
export const selectUser = (state) => state.user;
export default UserSlice.reducer;
