import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "@/src/store";
import type { EmptyObject } from "@/src/tb.types"

type NotifierState = {
  notifications: any[]
}

const initialState: NotifierState = {
  notifications: [],
}

const notifierSlice = createSlice({
  name: 'notifier',
  initialState,
  reducers: {
    enqueueSnackbar(state, action) {
      state.notifications = [
        ...state.notifications,
        action.payload
      ]
    },
    closeSnackbar(state, action) {
      state.notifications = state.notifications.map(notification => (
        (action.payload.dismissAll || notification.key === action.payload.key)
          ? { ...notification, dismissed: true }
          : { ...notification }
      ))
    },
    removeSnackbar(state, action) {
      state.notifications = state.notifications.filter(
        notification => notification.key !== action.payload.key,
      )
    }
  }
})

export const { enqueueSnackbar, closeSnackbar, removeSnackbar } = notifierSlice.actions

export default notifierSlice
