import {
  GET_MITRA_REQUEST,
  GET_MITRA_SUCCESS,
  GET_MITRA_FAILURE,
} from "../actions/mitraAction";

const initialState = {
  loading: false,
  error: null,
  data: [],
};

const mitraReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MITRA_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case GET_MITRA_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload,
      };

    case GET_MITRA_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        data: [],
      };

    default:
      return state;
  }
};

export default mitraReducer;
