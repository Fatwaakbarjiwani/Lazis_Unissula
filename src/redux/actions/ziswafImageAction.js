import axios from "axios";

// Base URL dari environment atau config
const baseURL =
  import.meta.env.VITE_API_URL || "https://skyconnect.lazis-sa.org";

// Action types
export const GET_ZISWAF_IMAGE_REQUEST = "GET_ZISWAF_IMAGE_REQUEST";
export const GET_ZISWAF_IMAGE_SUCCESS = "GET_ZISWAF_IMAGE_SUCCESS";
export const GET_ZISWAF_IMAGE_FAILURE = "GET_ZISWAF_IMAGE_FAILURE";

// Action untuk mendapatkan semua gambar ziswaf
export const getZiswafImages = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ZISWAF_IMAGE_REQUEST });

    const response = await axios.get(`${baseURL}/ziswaf-image/get-all`);

    dispatch({
      type: GET_ZISWAF_IMAGE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ZISWAF_IMAGE_FAILURE,
      payload:
        error.response?.data?.message ||
        "Terjadi kesalahan saat mengambil data gambar",
    });
  }
};
