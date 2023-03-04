import { createSlice } from "@reduxjs/toolkit";
import { getTopics } from "./topicsActions";

const initialState = {
   loading: false, // Checking if loading finish
   error: null, // Store Error msg get it from backend
   success: false, // Checking if auth is done
   topicsList: null, // Store response
};

const topicsSlice = createSlice({
   name: "topics",
   initialState,
   reducers: {},
   extraReducers: {
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
   },
});

export const {} = topicsSlice.actions;

export default topicsSlice.reducer;
