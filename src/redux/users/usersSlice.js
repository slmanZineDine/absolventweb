import { createSlice } from "@reduxjs/toolkit";
import { getStudentStatus } from "./uersAction";

const initialState = {
   loading: false, // Checking if loading finish
   error: null, // Store Error msg get it from backend
   success: false, // Checking if auth is done
   studentStatus: {}, // Status null => , 0 => Pending, 1 => Accepted, 2 => Finish, 3 => Rejected
};

const usersSlice = createSlice({
   name: "users",
   initialState,
   reducers: {},
   extraReducers: {
      // Get Student Status
      [getStudentStatus.pending]: (state) => {
         state.loading = true;
         state.success = false; // Reset a value every Request
         state.error = null; // Reset a value every Request
      },
      [getStudentStatus.fulfilled]: (state, { payload }) => {
         state.loading = false;
         state.success = true;
         state.studentStatus = payload.data;
         // Store Student Status inside localStorage
         localStorage.setItem(
            "studentStatus",
            JSON.stringify(state.studentStatus)
         );
      },
      [getStudentStatus.rejected]: (state, { payload }) => {
         state.loading = false;
         state.error = payload;
      },
   },
});

export const {} = usersSlice.actions;

export default usersSlice.reducer;
