import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import topicsSlice from "./topics/topicsSlice";
import workspacesSlice from "./workspaces/workspacesSlice";

const store = configureStore({
   reducer: {
      auth: authSlice,
      topics: topicsSlice,
      workspaces: workspacesSlice,
   },
});

export default store;
