import { createSlice } from "@reduxjs/toolkit";
import { registerUser, userLogin } from "./authActions";

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
   reducers: {
      logout: (state) => {
         localStorage.clear();
         state.loading = false;
         state.userInfo = null;
         state.userToken = null;
         state.error = null;
      },
   },
   extraReducers: {
      // login user
      [userLogin.pending]: (state) => {
         state.loading = true;
         state.error = null;
      },
      [userLogin.fulfilled]: (state, { payload }) => {
         state.loading = false;
         state.userInfo = payload;
         localStorage.setItem("user", JSON.stringify(payload));
         state.userToken = payload.userToken;
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
         console.log(payload);
         state.loading = false;
         state.userInfo = payload;
         localStorage.setItem("user", JSON.stringify(payload));
         state.success = true; // registration successful
      },
      [registerUser.rejected]: (state, { payload }) => {
         state.loading = false;
         state.error = payload;
      },
   },
});

export const { logout, setCredentials } = authSlice.actions;

export default authSlice.reducer;
