import { createSlice } from "@reduxjs/toolkit";

export const CollapseSlice = createSlice({
  name: "modals",
  initialState: {
    value: {},
  },
  reducers: {
    openModal: (state, action) => {
      state.value[action.payload] = true;
    },
    closeModal: (state, action) => {
      state.value[action.payload] = false;
    },
    // toggle: (state, action) => {
    //   state.value[action.payload] = !state.value[action.payload];
    // },
    // init: (state, action) => {
    //   state.value = action.payload;
    // },
  },
});

export const { openModal, closeModal } = CollapseSlice.actions;

export default CollapseSlice.reducer;
