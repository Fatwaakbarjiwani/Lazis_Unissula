import axios from "axios";
import toast from "react-hot-toast";
import {
  setBilling,
  setSummary,
  setTransactionUser,
  setVa,
} from "../reducers/pembayaranReducer";

export const API_URL = import.meta.env.VITE_API_URL;

export const transaksi =
  (
    type,
    methode,
    name,
    phoneNumber,
    email,
    transactionAmount,
    message,
    campaignId,
    navigate
  ) =>
  async (dispatch) => {
    try {
      const response = await axios.post(
        `${API_URL}/billing/${type}/${campaignId}`,
        {
          username: name,
          phoneNumber: phoneNumber,
          email: email,
          transactionAmount: transactionAmount,
          message: message,
        }
      );
      if (response) {
        toast.success("Proses transaksi berhasil");
        navigate(
          `/${
            methode === "qris" ? "pembayaranQris" : "pembayaranVa"
          }/${campaignId}`
        );
        // dispatch(setBilling(response.data));
        const data = response.data;

        dispatch(setVa(data.vaNumber));
      }
    } catch (error) {
      console.error("Error fetching campaign data:", error);
    }
  };
export const getTransactionUser = () => async (dispatch, getState) => {
  const { token } = getState().auth;
  try {
    const response = await axios.get(`${API_URL}/transaction/donaturHistory`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = response.data;
    dispatch(setTransactionUser(data));
  } catch (error) {
    return;
  }
};
export const getTransaction = (va) => async (dispatch) => {
  try {
    const response = await axios.post(
      `https://donasi.lazisybwsa.cloudsmartech.com/billing`,
      {
        // Body JSON yang dikirim
        vaNumber: va,
        prefix: "02029",
      },
      {
        headers: {
          Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsYXppc3N1bHRhbmFndW5nIiwiaWF0IjoxNzM2MjM3MTI3LCJleHAiOjE3MzYyNDA3Mjd9.lKMM-1Py6F3y00fl_IvZBLLQRmKXRKEbxlzSV-qQxU4`,
          "Content-Type": "application/json", // Pastikan content-type JSON
        },
      }
    );

    const data = response.data;

    // Log data untuk verifikasi
    console.log(data);

    // Dispatch hasil ke Redux
    dispatch(setBilling(data));
  } catch (error) {
    // Log error agar lebih mudah debug
    console.error("Error fetching transaction:", error.message);
  }
};

export const getSummary = (type) => async (dispatch) => {
  try {
    dispatch(setSummary([]));
    const response = await axios.get(`${API_URL}/summary/${type}`);
    const data = response.data;
    dispatch(setSummary(data));
  } catch (error) {
    console.error("Error fetching all yiswaf category", error);
  }
};
