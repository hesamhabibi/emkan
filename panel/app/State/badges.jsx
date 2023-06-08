import { createSlice } from "@reduxjs/toolkit";

export const badges = createSlice({
  name: "badges",
  initialState: {
    value: {},
  },
  reducers: {
    increment: (state, action) => {
      state.value[action.payload] += 1;
    },
    decrement: (state, action) => {
      state.value[action.payload] -= 1;
    },
    init: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { increment, decrement, init } = badges.actions;

export default badges.reducer;
