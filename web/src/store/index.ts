import { configureStore } from "@reduxjs/toolkit";
import sharingSlice from "containers/Sharing/slice";
import notifierSlice from "utils/Notifier/slice";

const store = configureStore({
  reducer: {
    sharing: sharingSlice.reducer,
    notifier: notifierSlice.reducer
  }
})

export type RootState = ReturnType<typeof store.getState>

export default store
