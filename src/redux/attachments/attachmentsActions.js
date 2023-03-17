import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const baseURL = "http://127.0.0.1:8000";

// Uploade File
export const uploadeFile = createAsyncThunk(
   "attachments/UploadeFile",
   async (fileInfo, { rejectWithValue }) => {
      try {
         const config = {
            headers: {
               Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            },
         };

         const { data } = await axios.post(
            `${baseURL}/api/upload-file`,
            fileInfo,
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

// Getting File
export const getFile = createAsyncThunk(
   "attachments/getFile",
   async (eventId, { rejectWithValue }) => {
      try {
         const config = {
            headers: {
               Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            },
         };

         const { data } = await axios.get(
            `${baseURL}/api/get-file/${eventId}`,
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

// Remove File
// export const removeFile = createAsyncThunk(
//    "attachments/removeFile",
//    async (eventId, { rejectWithValue }) => {
//       try {
//          const config = {
//             headers: {
//                Authorization: `Bearer ${localStorage.getItem("userToken")}`,
//             },
//          };

//          const { data } = await axios.get(
//             `${baseURL}/api/get-file/${eventId}`,
//             config
//          );
//          return data;
//       } catch (error) {
//          // return custom error message from API if any
//          if (error.response && error.response.data.message) {
//             return rejectWithValue(error.response.data.message);
//          } else {
//             return rejectWithValue(error.message);
//          }
//       }
//    }
// );
