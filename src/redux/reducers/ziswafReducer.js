import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  categoryZiswaf: [],
};
const authSlice = createSlice({
  name: "ziswaf",
  initialState,
  reducers: {
    setCategoryZiswaf: (state, action) => {
      state.categoryZiswaf = action.payload;
    },
  },
});

export const { setCategoryZiswaf } = authSlice.actions;

export default authSlice.reducer;
