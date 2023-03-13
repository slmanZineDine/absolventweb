import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const baseURL = "http://127.0.0.1:8000";

// Get Student Status
export const getStudentStatus = createAsyncThunk(
   "users/getStudentStatus",
   async ({}, { rejectWithValue }) => {
      try {
         const config = {
            headers: {
               Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            },
         };

         const { data } = await axios.get(
            `${baseURL}/api/student/statue`,
            config
         );
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
