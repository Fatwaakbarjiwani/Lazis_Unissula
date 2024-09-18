import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  pageNumber: localStorage.getItem("pageNumber")
    ? parseInt(localStorage.getItem("pageNumber"), 10)
    : 1,
  totalPageNumber: 0,
  allCampaign: [],
  campaignBySearch: [],
  allCampaignEmergency: [],
  detailCampaign: [],
  allCampaignCategory: [],
  allMessage: [],
  aamiinId: [],
  searchCampaign: "",
};
const authSlice = createSlice({
  name: "campaign",
  initialState,
  reducers: {
    setPageNumber: (state, action) => {
      if (action.payload) {
        const pageNumber = parseInt(action.payload, 10);
        localStorage.setItem("pageNumber", pageNumber);
      } else {
        localStorage.removeItem("pageNumber");
      }
      state.pageNumber = action.payload ? parseInt(action.payload, 10) : null;
    },
    setTotalPageNumber: (state, action) => {
      state.totalPageNumber = action.payload;
    },
    setAllCampaign: (state, action) => {
      state.allCampaign = action.payload;
    },
    setCampaignBySearch: (state, action) => {
      state.campaignBySearch = action.payload;
    },
    setAllCampaignEmergency: (state, action) => {
      state.allCampaignEmergency = action.payload;
    },
    setDetailCampaign: (state, action) => {
      state.detailCampaign = action.payload;
    },
    setAllCampaignCategory: (state, action) => {
      state.allCampaignCategory = action.payload;
    },
    setAllMessage: (state, action) => {
      state.allMessage = action.payload;
    },
    setAamiinId: (state, action) => {
      state.aamiinId = action.payload;
    },
    setSearchCampaign: (state, action) => {
      state.searchCampaign = action.payload;
    },
  },
});

export const {
  setPageNumber,
  setTotalPageNumber,
  setAllCampaign,
  setCampaignBySearch,
  setAllCampaignEmergency,
  setDetailCampaign,
  setAllCampaignCategory,
  setAllMessage,
  setAamiinId,
  setSearchCampaign,
} = authSlice.actions;

export default authSlice.reducer;
