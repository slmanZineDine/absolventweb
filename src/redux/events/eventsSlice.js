import { createSlice } from "@reduxjs/toolkit";
import {
   addNewEvent,
   deleteEvent,
   editeEvent,
   getEventById,
   getStudentEvents,
   getWorkspaceEvents,
} from "./eventsAction";

const initialState = {
   loading: false, // Checking if loading finish
   error: null, // Store Error msg get it from backend
   success: false, // Checking if auth is done
   workspaceEvents: [], // All workspace Events
   eventById: [], // Exactly Event By Its Id
};

const eventsSlice = createSlice({
   name: "events",
   initialState,
   reducers: {},
   extraReducers: {
      // Add All Workspace Events
      [getWorkspaceEvents.pending]: (state) => {
         state.loading = true;
         state.success = false; // Reset a value every Request
         state.error = null; // Reset a value every Request
      },
      [getWorkspaceEvents.fulfilled]: (state, { payload }) => {
         state.loading = false;
         state.success = true;
         state.workspaceEvents = payload.data;
         // Sorting Events by last update
         state.workspaceEvents.sort((a, b) => {
            const firEleDate = new Date(a["updated_at"]);
            const secEleDate = new Date(b["updated_at"]);
            return +secEleDate - +firEleDate;
         });
      },
      [getWorkspaceEvents.rejected]: (state, { payload }) => {
         state.loading = false;
         state.error = payload;
      },

      // Get Student's Events
      [getStudentEvents.pending]: (state) => {
         state.loading = true;
         state.success = false; // Reset a value every Request
         state.error = null; // Reset a value every Request
      },
      [getStudentEvents.fulfilled]: (state, { payload }) => {
         state.loading = false;
         state.success = true;
         state.workspaceEvents = payload.data;
         // Sorting Events by last update
         state.workspaceEvents.sort((a, b) => {
            const firEleDate = new Date(a["updated_at"]);
            const secEleDate = new Date(b["updated_at"]);
            return +secEleDate - +firEleDate;
         });
      },
      [getStudentEvents.rejected]: (state, { payload }) => {
         state.loading = false;
         state.error = payload;
      },

      // Get Event By Id
      [getEventById.pending]: (state) => {
         state.loading = true;
         state.success = false; // Reset a value every Request
         state.error = null; // Reset a value every Request
      },
      [getEventById.fulfilled]: (state, { payload }) => {
         state.loading = false;
         state.success = true;
         state.eventById = payload.data;
      },
      [getEventById.rejected]: (state, { payload }) => {
         state.loading = false;
         state.error = payload;
      },

      // Add A New Event
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

      // Edite An Event
      [editeEvent.pending]: (state) => {
         state.loading = true;
         state.success = false; // Reset a value every Request
         state.error = null; // Reset a value every Request
      },
      [editeEvent.fulfilled]: (state) => {
         state.loading = false;
         state.success = true;
      },
      [editeEvent.rejected]: (state, { payload }) => {
         state.loading = false;
         state.error = payload;
      },

      // Delete An Event
      [deleteEvent.pending]: (state) => {
         state.loading = true;
         state.success = false; // Reset a value every Request
         state.error = null; // Reset a value every Request
      },
      [deleteEvent.fulfilled]: (state) => {
         state.loading = false;
         state.success = true;
      },
      [deleteEvent.rejected]: (state, { payload }) => {
         state.loading = false;
         state.error = payload;
      },
   },
});

export const {} = eventsSlice.actions;

export default eventsSlice.reducer;
