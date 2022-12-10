import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "store/index";
import type { EmptyObject } from "src/tb.types"
import type { MenuItem } from "components/common/Menu";

type ShareState = {
  checkedMenu: MenuItem | EmptyObject
}

const initialState: ShareState = {
  checkedMenu: {}
}

const shareSlice = createSlice({
  name: 'share',
  initialState,
  reducers: {
    checkedMenuAction(state, action) {
      state.checkedMenu = action.payload
    }
  }
})

export const { checkedMenuAction } = shareSlice.actions
export const getCheckedMenu = (state: RootState) => state.share.checkedMenu

export default shareSlice
