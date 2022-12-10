import { configureStore } from "@reduxjs/toolkit";
import shareSlice from "store/shareSlice";

const store = configureStore({
  reducer: {
    share: shareSlice.reducer
  }
})

export type RootState = ReturnType<typeof store.getState>

export default store
