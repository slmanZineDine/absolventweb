import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import eventsSlice from "./events/eventsSlice";
import topicsSlice from "./topics/topicsSlice";
import workspacesSlice from "./workspaces/workspacesSlice";

const store = configureStore({
   reducer: {
      auth: authSlice,
      topics: topicsSlice,
      workspaces: workspacesSlice,
      events: eventsSlice,
   },
});

export default store;
