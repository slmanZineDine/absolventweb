import { createSlice } from "@reduxjs/toolkit";
import { registerUser, userLogin, userLogout } from "./authActions";

// initialize userToken from local storage
const userToken = localStorage.getItem("userToken")
   ? localStorage.getItem("userToken")
   : null;

const initialState = {
   loading: false, // Checking if loading finish
   userInfo: null, // Store response
   userToken, // Store Token
   error: null, // Store Error msg get it from backend
   success: false, // Checking if auth is done
};

const authSlice = createSlice({
   name: "user",
   initialState,
   reducers: {},
   extraReducers: {
      // login user
      [userLogin.pending]: (state) => {
         state.loading = true;
         state.error = null;
      },
      [userLogin.fulfilled]: (state, { payload }) => {
         state.loading = false;
         state.userInfo = payload;
         state.userToken = payload.token;
         state.success = true;
      },
      [userLogin.rejected]: (state, { payload }) => {
         state.loading = false;
         state.error = payload;
      },
      // register user
      [registerUser.pending]: (state) => {
         state.loading = true;
         state.error = null;
      },
      [registerUser.fulfilled]: (state, { payload }) => {
         state.loading = false;
         state.userInfo = payload;
         state.userToken = payload.token;
         state.success = true;
      },
      [registerUser.rejected]: (state, { payload }) => {
         state.loading = false;
         state.error = payload;
      },
      // logout user
      [userLogout.pending]: (state) => {
         state.loading = true;
      },
      [userLogout.fulfilled]: (state) => {
         state.loading = false;
         state.userToken = null;
         window.location.reload();
      },
   },
});

export const { logout, setCredentials } = authSlice.actions;

export default authSlice.reducer;
