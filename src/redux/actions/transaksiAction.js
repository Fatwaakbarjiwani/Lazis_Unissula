import axios from "axios";
import toast from "react-hot-toast";
import { setSummary, setTransactionUser } from "../reducers/pembayaranReducer";

export const API_URL = import.meta.env.VITE_API_URL;

export const transaksi =
  (
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
        `${API_URL}/transaction/campaign/${campaignId}`,
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
        navigate(`/detailCampaign/${campaignId}`);
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
