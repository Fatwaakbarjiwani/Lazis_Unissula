import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  pageNumber: 1,
};
const authSlice = createSlice({
  name: "campaign",
  initialState,
  reducers: {
    setPageNumber: (state, action) => {
      state.pageNumber = action.payload;
    },
  },
});

export const {
  setPageNumber,
} = authSlice.actions;

export default authSlice.reducer;
