import { createSlice } from "@reduxjs/toolkit";
import CryptoJS from "crypto-js";
const key = "secretKey";

const initialState = {
  nml: getNmlFromLocalStorage(),
  va: localStorage.getItem("va") || null,
  token2: localStorage.getItem("sgh") || null,
  token3: localStorage.getItem("qc") || null,
  methode: "",
  transactionUser: [],
  summary: [],
  billing: [],
  vaNumber: [],
  typePembayaran: localStorage.getItem("type") || null,
  qris: [],
  waktu: localStorage.getItem("time") || null,
};
function getNmlFromLocalStorage() {
  const encryptedNml = localStorage.getItem("nml");
  if (encryptedNml) {
    // Decrypt nilai nml sebelum mengembalikannya
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedNml, key);
      const originalNml = bytes.toString(CryptoJS.enc.Utf8);
      return originalNml;
    } catch (error) {
      // Handle kesalahan dekripsi
      console.error("Error decrypting nml:", error);
      return null;
    }
  }
  return null;
}

const authSlice = createSlice({
  name: "pembayaran",
  initialState,
  reducers: {
    setVa: (state, action) => {
      if (action.payload) {
        localStorage.setItem("va", action.payload);
      } else {
        localStorage.removeItem("va");
      }
      state.va = action.payload;
    },
    setTypePembayaran: (state, action) => {
      if (action.payload) {
        localStorage.setItem("type", action.payload);
      } else {
        localStorage.removeItem("type");
      }
      state.typePembayaran = action.payload;
    },
    setToken2: (state, action) => {
      if (action.payload) {
        localStorage.setItem("sgh", action.payload);
      } else {
        localStorage.removeItem("sgh");
      }
      state.token2 = action.payload;
    },
    setToken3: (state, action) => {
      if (action.payload) {
        localStorage.setItem("qc", action.payload);
      } else {
        localStorage.removeItem("qc");
      }
      state.token3 = action.payload;
    },
    setWaktu: (state, action) => {
      if (action.payload) {
        localStorage.setItem("time", action.payload);
      } else {
        localStorage.removeItem("time");
      }
      state.waktu = action.payload;
    },
    setNml: (state, action) => {
      if (action.payload) {
        // Enkripsi nilai nml sebelum menyimpannya
        const encryptedNml = CryptoJS.AES.encrypt(
          action.payload,
          key
        ).toString();
        localStorage.setItem("nml", encryptedNml);
      } else {
        localStorage.removeItem("nml");
      }
      state.nml = action.payload;
    },
    setMethode: (state, action) => {
      state.methode = action.payload;
    },
    setTransactionUser: (state, action) => {
      state.transactionUser = action.payload;
    },
    setSummary: (state, action) => {
      state.summary = action.payload;
    },
    setBilling: (state, action) => {
      state.billing = action.payload;
    },
    setVaNumber: (state, action) => {
      state.vaNumber = action.payload;
    },
    setQris: (state, action) => {
      state.qris = action.payload;
    },
  },
});

export const {
  setNml,
  setMethode,
  setTransactionUser,
  setSummary,
  setBilling,
  setQris,
  setVa,
  setVaNumber,
  setToken2,
  setToken3,
  setTypePembayaran,
  setWaktu,
} = authSlice.actions;

export default authSlice.reducer;
