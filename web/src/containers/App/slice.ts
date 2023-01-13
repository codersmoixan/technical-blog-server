import {createSlice} from "@reduxjs/toolkit";
import type { RootState } from "store/index"

const initialState = {
  speedDial: ''
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    changeSpeedDial(state, action) {
      state.speedDial = action.payload
    },
    clearSpeedDial(state) {
      state.speedDial = ''
    }
  }
})

export const { changeSpeedDial, clearSpeedDial } = appSlice.actions

export const selectSpeedDial = (state: RootState) => state.app.speedDial

export default appSlice
