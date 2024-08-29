import { combineReducers } from "redux";
import campaignReducer from "./campaignReducer";
import authReducer from "./authReducer";

export default combineReducers({
  campaign: campaignReducer,
  auth: authReducer,
});
