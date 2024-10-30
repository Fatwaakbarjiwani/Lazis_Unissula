import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  buttonPage: "Home",
  summary: [],
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
  },
});

export const { setButtonPage, setSummary } = authSlice.actions;

export default authSlice.reducer;
