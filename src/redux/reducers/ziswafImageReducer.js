import {
  GET_ZISWAF_IMAGE_REQUEST,
  GET_ZISWAF_IMAGE_SUCCESS,
  GET_ZISWAF_IMAGE_FAILURE,
} from "../actions/ziswafImageAction";

const initialState = {
  loading: false,
  error: null,
  images: [],
};

const ziswafImageReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ZISWAF_IMAGE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case GET_ZISWAF_IMAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        images: action.payload,
      };

    case GET_ZISWAF_IMAGE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        images: [],
      };

    default:
      return state;
  }
};

export default ziswafImageReducer;
