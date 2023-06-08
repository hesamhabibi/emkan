import { createSlice } from "@reduxjs/toolkit";

export const CollapseSlice = createSlice({
  name: "collapse",
  initialState: {
    value: {},
  },
  reducers: {
    open: (state, action) => {
      state.value[action.payload] = true;
    },
    close: (state, action) => {
      state.value[action.payload] = false;
    },
    toggle: (state, action) => {
      state.value[action.payload] = !state.value[action.payload];
    },
    init: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { open, close, init, toggle } = CollapseSlice.actions;

export default CollapseSlice.reducer;
