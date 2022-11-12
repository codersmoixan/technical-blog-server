import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "./index";

const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    count: 0
  },
  reducers: {
    increment(state) {
      state.count += 1
    }
  }
})

export const { increment } = counterSlice.actions

export const getCounter = (state: RootState) => state.counter.count

export default counterSlice
