import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const baseURL = "http://127.0.0.1:8000";

// Getting all topics
export const getTopics = createAsyncThunk(
   "topics/getTopics",
   async ({}, { rejectWithValue }) => {
      try {
         const config = {
            headers: {
               Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            },
         };

         const { data } = await axios.get(`${baseURL}/api/teme`, config);
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
// Getting doctor's topics
export const getTopicsByDoctorId = createAsyncThunk(
   "topics/getTopicsByDoctorId",
   async (doctorId, { rejectWithValue }) => {
      try {
         const config = {
            headers: {
               Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            },
         };

         const { data } = await axios.get(
            `${baseURL}/api/teme/coordonator/${doctorId}`,
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
// Adding a new topic
// export const addNewTopic = createAsyncThunk(
//    "topics/addNewTopic",
//    async (topic, { rejectWithValue }) => {
//       try {
//          const config = {
//             headers: {
//                Authorization: `Bearer ${localStorage.getItem("userToken")}`,
//             },
//          };

//          const { data } = await axios.get(
//             `${baseURL}/api/teme/coordonator/${doctorId}`,
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
