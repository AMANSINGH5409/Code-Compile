import { configureStore } from "@reduxjs/toolkit";
import compilerReducer from "./slices/compilerSlice";

export const store = configureStore({
  reducer: {
    compiler: compilerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
