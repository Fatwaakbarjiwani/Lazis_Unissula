import axios from "axios";

// Base URL dari environment atau config
const baseURL =
  import.meta.env.VITE_API_URL || "https://skyconnect.lazis-sa.org";

// Action types
export const GET_DETAIL_SUMMARY_REQUEST = "GET_DETAIL_SUMMARY_REQUEST";
export const GET_DETAIL_SUMMARY_SUCCESS = "GET_DETAIL_SUMMARY_SUCCESS";
export const GET_DETAIL_SUMMARY_FAILURE = "GET_DETAIL_SUMMARY_FAILURE";

// Action untuk mendapatkan detail summary berdasarkan type
export const getDetailSummary = (type) => async (dispatch) => {
  try {
    dispatch({ type: GET_DETAIL_SUMMARY_REQUEST });

    const response = await axios.get(
      `${baseURL}/dashboardImage/detail-summary?type=${type}`
    );

    dispatch({
      type: GET_DETAIL_SUMMARY_SUCCESS,
      payload: {
        type,
        data: response.data,
      },
    });
  } catch (error) {
    dispatch({
      type: GET_DETAIL_SUMMARY_FAILURE,
      payload:
        error.response?.data?.message ||
        "Terjadi kesalahan saat mengambil data",
    });
  }
};

// Action untuk mendapatkan semua data informasi sekaligus
export const getAllInformasiData = () => async (dispatch) => {
  const types = ["donatur", "penyaluran", "penghimpunan", "penerima-manfaat"];

  try {
    dispatch({ type: GET_DETAIL_SUMMARY_REQUEST });

    const promises = types.map((type) =>
      axios.get(`${baseURL}/dashboardImage/detail-summary?type=${type}`)
    );

    const responses = await Promise.all(promises);

    const data = {};
    types.forEach((type, index) => {
      data[type] = responses[index].data;
    });

    dispatch({
      type: GET_DETAIL_SUMMARY_SUCCESS,
      payload: {
        type: "all",
        data,
      },
    });
  } catch (error) {
    dispatch({
      type: GET_DETAIL_SUMMARY_FAILURE,
      payload:
        error.response?.data?.message ||
        "Terjadi kesalahan saat mengambil data",
    });
  }
};
