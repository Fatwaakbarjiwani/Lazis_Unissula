import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  buttonPage: "Home",
  summary: [],
  slides: [],
};
const authSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    setButtonPage: (state, action) => {
      state.buttonPage = action.payload;
    },
    setSummary: (state, action) => {
      state.summary = action.payload;
    },
    setSlides: (state, action) => {
      state.slides = action.payload;
    },
  },
});

export const { setButtonPage, setSummary, setSlides } = authSlice.actions;

export default authSlice.reducer;
