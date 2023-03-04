import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import topicsSlice from "./topics/topicsSlice";

const store = configureStore({
   reducer: {
      auth: authSlice,
      topics: topicsSlice,
   },
});

export default store;
