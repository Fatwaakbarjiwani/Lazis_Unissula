import { combineReducers } from "redux";
import campaignReducer from "./campaignReducer";
import authReducer from "./authReducer";
import pageReducer from "./pageReducer";
import pembayaranReducer from "./pembayaranReducer";
import beritaReducer from "./beritaReducer";
import ziswafReducer from "./ziswafReducer";

export default combineReducers({
  campaign: campaignReducer,
  auth: authReducer,
  page: pageReducer,
  pembayaran: pembayaranReducer,
  berita: beritaReducer,
  ziswaf: ziswafReducer,
});
