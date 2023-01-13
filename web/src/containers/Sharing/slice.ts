import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "@/src/store";
import type { EmptyObject } from "@/src/tb.types"
import type { MenuItem } from "components/Menu";

type SharingState = {
  checkedMenu: MenuItem | EmptyObject;
  parentMenu: MenuItem | EmptyObject;
}

const initialState: SharingState = {
  checkedMenu: {},
  parentMenu: {},
}

const sharingSlice = createSlice({
  name: 'sharing',
  initialState,
  reducers: {
    checkedMenuAction(state, action) {
      state.checkedMenu = action.payload
    },
    parentMenuAction(state, action) {
      if (action.payload) {
        state.parentMenu = action.payload
      }
    }
  }
})

export const { checkedMenuAction, parentMenuAction } = sharingSlice.actions

export const selectCheckedMenu = (state: RootState) => state.sharing.checkedMenu
export const selectParentMenu = (state: RootState) => state.sharing.parentMenu

export default sharingSlice
