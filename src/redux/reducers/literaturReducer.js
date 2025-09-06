import {
  GET_LITERATUR_REQUEST,
  GET_LITERATUR_SUCCESS,
  GET_LITERATUR_FAILURE,
} from "../actions/literaturAction";

const initialState = {
  loading: false,
  error: null,
  data: [],
};

const literaturReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LITERATUR_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_LITERATUR_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case GET_LITERATUR_FAILURE:
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

export default literaturReducer;
