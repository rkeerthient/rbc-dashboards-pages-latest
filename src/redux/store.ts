import { configureStore } from "@reduxjs/toolkit";
import mySlice from "./dashboardDataSlice";

export const store = configureStore({
  reducer: {
    dashboardSlice: mySlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
