import { configureStore } from "@reduxjs/toolkit";
import boardReducer from "./boardSlice";

const store = configureStore({
  reducer: {
    boarddata: boardReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
