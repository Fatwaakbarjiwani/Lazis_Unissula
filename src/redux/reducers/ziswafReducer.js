import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  categoryZiswaf: [],
  detailZiswaf: [],
  detailFitrah: [],
  nominalFitrah: [],
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
    setDetailFitrah: (state, action) => {
      state.detailFitrah = action.payload;
    },
    setNominalFitrah: (state, action) => {
      state.nominalFitrah = action.payload;
    },
  },
});

export const {
  setCategoryZiswaf,
  setDetailZiswaf,
  setDetailFitrah,
  setNominalFitrah,
} = authSlice.actions;

export default authSlice.reducer;
