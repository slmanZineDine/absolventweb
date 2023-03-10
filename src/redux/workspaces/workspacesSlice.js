import { createSlice } from "@reduxjs/toolkit";
import { createWorkspace, getWaitingWorkspace } from "./workspacesActions";

const initialState = {
   loading: false, // Checking if loading finish
   error: null, // Store Error msg get it from backend
   success: false, // Checking if auth is done
   waitingWorkspaces: [],
};

const workspacesSlice = createSlice({
   name: "workspaces",
   initialState,
   reducers: {},
   extraReducers: {
      // Create New Workspace
      [createWorkspace.pending]: (state) => {
         state.loading = true;
         state.success = false; // Reset a value every Request
         state.error = null; // Reset a value every Request
      },
      [createWorkspace.fulfilled]: (state, { payload }) => {
         state.loading = false;
         state.success = true;
      },
      [createWorkspace.rejected]: (state, { payload }) => {
         state.loading = false;
         state.error = payload;
      },

      // // Get Workspace that 0 Status
      [getWaitingWorkspace.pending]: (state) => {
         state.loading = true;
         state.success = false; // Reset a value every Request
         state.error = null; // Reset a value every Request
      },
      [getWaitingWorkspace.fulfilled]: (state, { payload }) => {
         state.loading = false;
         state.success = true;
         state.waitingWorkspaces = payload.data;
      },
      [getWaitingWorkspace.rejected]: (state, { payload }) => {
         state.loading = false;
         state.error = payload;
      },
   },
});

export const {} = workspacesSlice.actions;

export default workspacesSlice.reducer;
