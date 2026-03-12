import { configureStore } from "@reduxjs/toolkit";
import orgChartReducer from "./slices/orgChartSlice";

export const store = configureStore({
  reducer: {
    orgChart: orgChartReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
