import axios from "axios";
import toast from "react-hot-toast";
import {
  setBilling,
  setSummary,
  setTransactionUser,
  setVa,
} from "../reducers/pembayaranReducer";

export const API_URL = import.meta.env.VITE_API_URL;
export const API_URL_PAYMENT = import.meta.env.VITE_API_URL_PAYMENT;

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
        if (type !== "qris") {
          dispatch(getTransaction(data.vaNumber));
        }
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
export const getTransaction = (va) => async (dispatch, getState) => {
  try {
    const { token2 } = getState().pembayaran;
    const response = await axios.post(
      `${API_URL_PAYMENT}/billing`,
      {
        vaNumber: va,
        prefix: "02029",
      },
      {
        headers: {
          Authorization: `Bearer ${token2}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = response.data;
    dispatch(setBilling(data.data));
  } catch (error) {
    console.error("Error fetching transaction:", error.message);
  }
};
export const getToken2 = () => async (dispatch) => {
  try {
    const response = await axios.post(
      `${API_URL_PAYMENT}/getToken`,
      {
        username: "lazissultanagung",
        password: "sultanagung123",
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = response.data;

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
