import { createSlice } from "@reduxjs/toolkit";
import {
   addNewTopic,
   deleteTopic,
   getTopicById,
   getTopics,
   getTopicsByDoctorId,
} from "./topicsActions";

const initialState = {
   loading: false, // Checking if loading finish
   error: null, // Store Error msg get it from backend
   success: false, // Checking if auth is done
   topicsList: [], // Store response
   doctorTopics: [], // Contain only  Doctor's topics
   topic: {}, // topic by Id
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
      // Getting the topic by Id
      [getTopicById.pending]: (state) => {
         state.loading = true;
         state.error = null;
      },
      [getTopicById.fulfilled]: (state, { payload }) => {
         state.loading = false;
         state.success = true;
         state.topic = payload.data;
      },
      [getTopicById.rejected]: (state, { payload }) => {
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
      // Adding a new topic
      [addNewTopic.pending]: (state) => {
         state.loading = true;
         state.error = null;
      },
      [addNewTopic.fulfilled]: (state, { payload }) => {
         state.loading = false;
         state.success = true;
         state.doctorTopics.unshift(payload.data);
      },
      [addNewTopic.rejected]: (state, { payload }) => {
         state.loading = false;
         state.error = payload;
      },
      // Deletion the topic
      [deleteTopic.pending]: (state) => {
         state.loading = true;
         state.error = null;
      },
      [deleteTopic.fulfilled]: (state, { payload }) => {
         state.loading = false;
         state.success = true;
         state.doctorTopics = state.doctorTopics.filter(
            (e) => e.id !== payload
         );
      },
      [deleteTopic.rejected]: (state, { payload }) => {
         state.loading = false;
         state.error = payload;
      },
   },
});

export const {} = topicsSlice.actions;

export default topicsSlice.reducer;
