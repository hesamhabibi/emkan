import { createSlice } from "@reduxjs/toolkit"

export const TabSlice = createSlice({
  name: "tabs",
  initialState: {
    value: {},
  },
  reducers: {
    switchTab: (state, action) => {
      state.value[action.payload.id] = action.payload.data
    },
    resetTab: (state, action) => {
      state.value[action.payload] = { tab: 0 }
    },
  },
})

export const { switchTab, resetTab } = TabSlice.actions

export default TabSlice.reducer
