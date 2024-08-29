import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  modalRegister: false,
  modalLogin: false,
  phoneNumber: "",
  email: "",
  acount: "",
};
const authSlice = createSlice({
  name: "campaign",
  initialState,
  reducers: {
    setModalRegister: (state, action) => {
      state.modalRegister = action.payload;
    },
    setModalLogin: (state, action) => {
      state.modalLogin = action.payload;
    },
    setPhoneNumber: (state, action) => {
      state.phoneNumber = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setAcount: (state, action) => {
      state.acount = action.payload;
    },
  },
});

export const {
  setModalRegister,
  setModalLogin,
  setEmail,
  setPhoneNumber,
  setAcount,
} = authSlice.actions;

export default authSlice.reducer;
