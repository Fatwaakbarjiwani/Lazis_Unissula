import axios from "axios";

// Base URL dari environment atau config
const baseURL =
  import.meta.env.VITE_API_URL || "https://skyconnect.lazis-sa.org";

// Action types
export const GET_MITRA_REQUEST = "GET_MITRA_REQUEST";
export const GET_MITRA_SUCCESS = "GET_MITRA_SUCCESS";
export const GET_MITRA_FAILURE = "GET_MITRA_FAILURE";

// Action untuk mendapatkan semua data mitra
export const getMitra = () => async (dispatch) => {
  try {
    dispatch({ type: GET_MITRA_REQUEST });

    const response = await axios.get(`${baseURL}/mitra/get-all`);

    dispatch({
      type: GET_MITRA_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_MITRA_FAILURE,
      payload:
        error.response?.data?.message ||
        "Terjadi kesalahan saat mengambil data mitra",
    });
  }
};
