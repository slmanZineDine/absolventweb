import { createSlice } from "@reduxjs/toolkit";
import { addNewEvent, getWorkspaceEvents } from "./eventsAction";

const initialState = {
   loading: false, // Checking if loading finish
   error: null, // Store Error msg get it from backend
   success: false, // Checking if auth is done
   workspaceEvents: [], // All workspace Events
};

const eventsSlice = createSlice({
   name: "events",
   initialState,
   reducers: {},
   extraReducers: {
      // Add New Event
      [getWorkspaceEvents.pending]: (state) => {
         state.loading = true;
         state.success = false; // Reset a value every Request
         state.error = null; // Reset a value every Request
      },
      [getWorkspaceEvents.fulfilled]: (state, { payload }) => {
         state.loading = false;
         state.success = true;
         state.workspaceEvents = payload.data;
      },
      [getWorkspaceEvents.rejected]: (state, { payload }) => {
         state.loading = false;
         state.error = payload;
      },

      // Add New Event
      [addNewEvent.pending]: (state) => {
         state.loading = true;
         state.success = false; // Reset a value every Request
         state.error = null; // Reset a value every Request
      },
      [addNewEvent.fulfilled]: (state) => {
         state.loading = false;
         state.success = true;
      },
      [addNewEvent.rejected]: (state, { payload }) => {
         state.loading = false;
         state.error = payload;
      },
   },
});

export const {} = eventsSlice.actions;

export default eventsSlice.reducer;
