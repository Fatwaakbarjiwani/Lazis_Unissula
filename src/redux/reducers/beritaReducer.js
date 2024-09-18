import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  allBerita: [],
  topBerita: [],
  detailBerita: [],
  categoryBerita: [],
  totalPageNumberBerita: 0,
};
const authSlice = createSlice({
  name: "berita",
  initialState,
  reducers: {
    setAllBerita: (state, action) => {
      state.allBerita = action.payload;
    },
    setTopBerita: (state, action) => {
      state.topBerita = action.payload;
    },
    setDetailBerita: (state, action) => {
      state.detailBerita = action.payload;
    },
    setCategoryBerita: (state, action) => {
      state.categoryBerita = action.payload;
    },
    setTotalPageNumberBerita: (state, action) => {
      state.totalPageNumberBerita = action.payload;
    },
  },
});

export const {
  setAllBerita,
  setTopBerita,
  setDetailBerita,
  setCategoryBerita,
  setTotalPageNumberBerita,
} = authSlice.actions;

export default authSlice.reducer;
