import { createSlice } from "@reduxjs/toolkit";
import CryptoJS from "crypto-js";
const key = "secretKey";

function getPsFromLocalStorage() {
  const encryptedPs = localStorage.getItem("ps");
  if (encryptedPs) {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedPs, key);
      const originalPs = bytes.toString(CryptoJS.enc.Utf8);
      return originalPs;
    } catch (error) {
      console.error("Error decrypting ps:", error);
      return null;
    }
  }
  return null;
}
const initialState = {
  token: localStorage.getItem("token") || null,
  modalRegister: false,
  modalLogin: false,
  modalResetPassword: false,
  phoneNumber: "",
  email: "",
  acount: "",
  user: null,
  ps: getPsFromLocalStorage(),
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      if (action.payload) {
        localStorage.setItem("token", action.payload);
      } else {
        localStorage.removeItem("token");
      }
      state.token = action.payload;
    },
    setModalRegister: (state, action) => {
      state.modalRegister = action.payload;
    },
    setModalLogin: (state, action) => {
      state.modalLogin = action.payload;
    },
    setModalResetPassword: (state, action) => {
      state.modalResetPassword = action.payload;
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
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setPs: (state, action) => {
      if (action.payload) {
        const encryptedPs = CryptoJS.AES.encrypt(
          action.payload,
          key
        ).toString();
        localStorage.setItem("ps", encryptedPs);
      } else {
        localStorage.removeItem("ps");
      }
      state.ps = action.payload;
    },
  },
});

export const {
  setToken,
  setModalRegister,
  setModalLogin,
  setModalResetPassword,
  setEmail,
  setPhoneNumber,
  setAcount,
  setUser,
  setPs
} = authSlice.actions;

export default authSlice.reducer;
