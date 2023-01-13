import { configureStore } from "@reduxjs/toolkit";
import sharingSlice from "containers/Sharing/slice";
import notifierSlice from "utils/../components/Snackbar/slice";
import appSlice from "containers/App/slice";

const store = configureStore({
  reducer: {
    sharing: sharingSlice.reducer,
    notifier: notifierSlice.reducer,
    app: appSlice.reducer
  }
})

export type RootState = ReturnType<typeof store.getState>

export default store
