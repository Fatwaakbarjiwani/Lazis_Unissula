import {
  GET_DETAIL_SUMMARY_REQUEST,
  GET_DETAIL_SUMMARY_SUCCESS,
  GET_DETAIL_SUMMARY_FAILURE,
} from "../actions/informasiAction";

const initialState = {
  loading: false,
  error: null,
  data: {
    donatur: [],
    penyaluran: [],
    penghimpunan: [],
    "penerima-manfaat": [],
  },
};

const informasiReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DETAIL_SUMMARY_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case GET_DETAIL_SUMMARY_SUCCESS:
      if (action.payload.type === "all") {
        return {
          ...state,
          loading: false,
          error: null,
          data: action.payload.data,
        };
      } else {
        return {
          ...state,
          loading: false,
          error: null,
          data: {
            ...state.data,
            [action.payload.type]: action.payload.data,
          },
        };
      }

    case GET_DETAIL_SUMMARY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        data: {
          donatur: [],
          penyaluran: [],
          penghimpunan: [],
          "penerima-manfaat": [],
        },
      };

    default:
      return state;
  }
};

export default informasiReducer;
