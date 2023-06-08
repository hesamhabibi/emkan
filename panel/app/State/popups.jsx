import { createSlice } from "@reduxjs/toolkit";

export const PopupSlice = createSlice({
  name: "popups",
  initialState: {
    value: {},
  },
  reducers: {
    openPopup: (state, action) => {
      state.value[action.payload] = true;
    },
    closePopup: (state, action) => {
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

export const { openPopup, closePopup } = PopupSlice.actions;

export default PopupSlice.reducer;
