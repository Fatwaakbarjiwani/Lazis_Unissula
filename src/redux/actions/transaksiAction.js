import axios from "axios";
// import toast from "react-hot-toast";
import Swal from "sweetalert2";
import {
  setBilling,
  setSummary,
  setTransactionUser,
  setVa,
} from "../reducers/pembayaranReducer";
import { getMe3 } from "./authAction";

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
          method: methode === "qris" ? "QRIS" : "VA",
        }
      );
      if (response) {
        const data = response.data;
        dispatch(setVa(data.vaNumber));
        if (methode === "qris") {
          await dispatch(getMe3(data.vaNumber));
          if (name) localStorage.setItem("qris_name", name);
          if (phoneNumber) localStorage.setItem("qris_phone", phoneNumber);
          if (message) localStorage.setItem("qris_message", message);
          await dispatch(getQr());
          navigate(`/loadQris/${campaignId}`);
        } else {
          navigate(`/pembayaranVa/${campaignId}`);
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
      "/billing",
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
    dispatch(setBilling(data));
    return data;
  } catch (error) {
    console.error("Error fetching transaction:", error.message);
    return null;
  }
};

export const getQr = () => async (dispatch, getState) => {
  try {
    const username = "bimaqris";
    const password = "jatengQr1$4j1b";
    const basicAuth = `Basic ${btoa(`${username}:${password}`)}`;
    const { token3 } = getState().pembayaran;

    const response = await axios.post(
      "/api-bima/getLink",
      {
        token: token3,
      },
      {
        headers: {
          Authorization: basicAuth,
          "Content-Type": "application/json",
        },
      }
    );

    if (response) {
      const data = response.data;
      const qrisLink = data?.["data"];
      if (qrisLink) {
        localStorage.setItem("qris_link", qrisLink);
        localStorage.setItem("qris_link_created_at", String(Date.now()));
      }
      return qrisLink;
    } else {
      Swal.fire({
        title: response.data["message"],
        text: "GAGAL",
        icon: "error",
      });
      return null;
    }
  } catch (error) {
    Swal.fire({
      title: error.response.data.message,
      text: "GAGAL",
      icon: "error",
    });
    return null;
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
