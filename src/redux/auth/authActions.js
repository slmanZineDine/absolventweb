import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const baseURL = "http://127.0.0.1:8000";

export const userLogin = createAsyncThunk(
   "user/login",
   async ({ email, password }, { rejectWithValue }) => {
      try {
         const config = {
            headers: {
               "Content-Type": "application/json",
            },
         };

         const { data } = await axios.post(
            `${baseURL}/api/login`,
            { email, password },
            config
         );

         // store user's token in local storage
         localStorage.setItem("userToken", data.token);

         return data;
      } catch (error) {
         // return custom error message from API if any
         if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message);
         } else {
            return rejectWithValue(error.message);
         }
      }
   }
);

export const registerUser = createAsyncThunk(
   "api/register",
   async (userRegInfo, { rejectWithValue }) => {
      try {
         const config = {
            headers: {
               "Content-Type": "application/json",
            },
         };

         const { data } = await axios.post(
            `${baseURL}/api/register`,
            userRegInfo,
            config
         );

         // store user's token in local storage
         localStorage.setItem("userToken", data.token);

         return data;
      } catch (error) {
         if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message);
         } else {
            return rejectWithValue(error.message);
         }
      }
   }
);
