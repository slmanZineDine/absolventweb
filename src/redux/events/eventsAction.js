import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const baseURL = "http://127.0.0.1:8000";

// Get All Student Events
export const getWorkspaceEvents = createAsyncThunk(
   "events/getWorkspaceEvents",
   async (studentId, { rejectWithValue }) => {
      try {
         const config = {
            headers: {
               Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            },
         };

         const { data } = await axios.get(
            `${baseURL}/api/event/student/${studentId}`,
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

// Add A New Event
export const addNewEvent = createAsyncThunk(
   "events/addNewEvent",
   async (eventInfo, { rejectWithValue }) => {
      try {
         const config = {
            headers: {
               Authorization: `Bearer ${localStorage.getItem("userToken")}`,
               "Content-Type": "application/json",
            },
         };

         const { data } = await axios.post(
            `${baseURL}/api/event`,
            eventInfo,
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
