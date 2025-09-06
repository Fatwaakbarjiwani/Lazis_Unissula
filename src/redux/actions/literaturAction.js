import axios from "axios";

// Base URL dari environment atau config
const baseURL =
  import.meta.env.VITE_API_URL || "https://skyconnect.lazis-sa.org";

// Action types
export const GET_LITERATUR_REQUEST = "GET_LITERATUR_REQUEST";
export const GET_LITERATUR_SUCCESS = "GET_LITERATUR_SUCCESS";
export const GET_LITERATUR_FAILURE = "GET_LITERATUR_FAILURE";

// Action untuk mendapatkan data literatur berdasarkan nama
export const getLiteraturByName = (name) => async (dispatch) => {
  try {
    dispatch({ type: GET_LITERATUR_REQUEST });

    const response = await axios.get(
      `${baseURL}/literatur/get-by-literatur-name?name=${encodeURIComponent(
        name
      )}`
    );

    dispatch({
      type: GET_LITERATUR_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_LITERATUR_FAILURE,
      payload:
        error.response?.data?.message ||
        "Terjadi kesalahan saat mengambil data literatur",
    });
  }
};
