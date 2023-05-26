import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./authSlice";
import usersSlice from "./usersSlice";
import chatSlice from "./chatSlice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    users: usersSlice.reducer,
    chat: chatSlice.reducer,
  },
});

export default store;
