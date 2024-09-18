import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  buttonPage: "",
};
const authSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    setButtonPage: (state, action) => {
      state.buttonPage = action.payload;
    },
  },
});

export const { setButtonPage } = authSlice.actions;

export default authSlice.reducer;
