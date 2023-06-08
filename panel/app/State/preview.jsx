import { createSlice } from "@reduxjs/toolkit"

export const preview = createSlice({
  name: "preview",
  initialState: {
    value: "",
  },
  reducers: {
    showImage: (state, action) => {
      state.value = action.payload
    },
    destroyImage: (state, action) => {
      state.value = ""
    },
  },
})

export const { showImage, destroyImage } = preview.actions

export default preview.reducer
