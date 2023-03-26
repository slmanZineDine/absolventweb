import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   workspaceInfo: { tema_id: null, coordonator_id: null }, // Store Creation Workpace Info
   searchMode: false, // To Determine If Shoud Reset Pagination To Start Point
   searchMethod: "", // Specify The Serach Method
};

const globalSlice = createSlice({
   name: "global",
   initialState,
   reducers: {
      setWorkspaceInfo(state, { payload }) {
         state.workspaceInfo.tema_id = payload.tema_id;
         state.workspaceInfo.coordonator_id = payload.coordonator_id;
      },
      setSearchMode(state, { payload }) {
         state.searchMode = payload;
      },
      setSearchMethod(state, { payload }) {
         state.searchMethod = payload;
      },
   },
   extraReducers: {},
});

export const { setWorkspaceInfo, setSearchMode, setSearchMethod } =
   globalSlice.actions;

export default globalSlice.reducer;
