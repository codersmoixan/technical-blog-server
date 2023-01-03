import { configureStore } from "@reduxjs/toolkit";
import sharingSlice from "containers/Sharing/sharingSlice";

const store = configureStore({
  reducer: {
    sharing: sharingSlice.reducer
  }
})

export type RootState = ReturnType<typeof store.getState>

export default store
