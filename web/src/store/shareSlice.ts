import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "store/index";
import type { EmptyObject } from "src/tb.types"
import type { MenuItem } from "components/Menu";

type ShareState = {
  checkedMenu: MenuItem | EmptyObject;
  parentMenu: MenuItem | EmptyObject;
}

const initialState: ShareState = {
  checkedMenu: {},
  parentMenu: {},
}

const shareSlice = createSlice({
  name: 'share',
  initialState,
  reducers: {
    checkedMenuAction(state, action) {
      state.checkedMenu = action.payload
      if (action.payload.child) {
        state.parentMenu = action.payload
      }
    }
  }
})

export const { checkedMenuAction } = shareSlice.actions

export const getCheckedMenu = (state: RootState) => state.share.checkedMenu
export const getParentMenu = (state: RootState) => state.share.parentMenu

export default shareSlice
