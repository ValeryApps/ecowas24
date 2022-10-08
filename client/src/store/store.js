import { configureStore } from "@reduxjs/toolkit";
import posts from "./reducers/post";
import auth from "./reducers/user";

export const store = configureStore({
  reducer: {
    posts,
    auth,
  },
});
