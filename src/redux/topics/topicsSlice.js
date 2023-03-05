import { createSlice } from "@reduxjs/toolkit";
import { getTopics, getTopicsByDoctorId } from "./topicsActions";

const initialState = {
   loading: false, // Checking if loading finish
   error: null, // Store Error msg get it from backend
   success: false, // Checking if auth is done
   topicsList: [], // Store response
   doctorTopics: [], // Contain only  Doctor's topics
};

const topicsSlice = createSlice({
   name: "topics",
   initialState,
   reducers: {},
   extraReducers: {
      // Getting all topics
      [getTopics.pending]: (state) => {
         state.loading = true;
         state.error = null;
      },
      [getTopics.fulfilled]: (state, { payload }) => {
         state.loading = false;
         state.success = true;
         state.topicsList = payload.data;
      },
      [getTopics.rejected]: (state, { payload }) => {
         state.loading = false;
         state.error = payload;
      },
      // Getting doctor's topics
      [getTopicsByDoctorId.pending]: (state) => {
         state.loading = true;
         state.error = null;
      },
      [getTopicsByDoctorId.fulfilled]: (state, { payload }) => {
         state.loading = false;
         state.success = true;
         state.doctorTopics = payload.data;
      },
      [getTopicsByDoctorId.rejected]: (state, { payload }) => {
         state.loading = false;
         state.error = payload;
      },
   },
});

export const {} = topicsSlice.actions;

export default topicsSlice.reducer;
