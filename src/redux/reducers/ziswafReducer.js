import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  categoryZiswaf: [],
  detailZiswaf: [],
};
const authSlice = createSlice({
  name: "ziswaf",
  initialState,
  reducers: {
    setCategoryZiswaf: (state, action) => {
      state.categoryZiswaf = action.payload;
    },
    setDetailZiswaf: (state, action) => {
      state.detailZiswaf = action.payload;
    },
  },
});

export const { setCategoryZiswaf, setDetailZiswaf } = authSlice.actions;

export default authSlice.reducer;
