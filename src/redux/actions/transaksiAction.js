import axios from "axios";
import toast from "react-hot-toast";

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
