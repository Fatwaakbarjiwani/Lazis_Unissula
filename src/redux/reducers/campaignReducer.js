import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  pageNumber: localStorage.getItem("pageNumber")
    ? parseInt(localStorage.getItem("pageNumber"), 10)
    : 1,
  totalPageNumber: 0,
  totalPageNumberMessage: 0,
  allCampaign: [],
  campaignBySearch: [],
  allCampaignEmergency: [],
  detailCampaign: [],
  allCampaignCategory: [],
  allMessage: [],
  donatur: [],
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
    setTotalPageNumberMessage: (state, action) => {
      state.totalPageNumberMessage = action.payload;
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
    setDonatur: (state, action) => {
      state.donatur = action.payload;
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
  setTotalPageNumberMessage,
  setAllCampaign,
  setCampaignBySearch,
  setAllCampaignEmergency,
  setDetailCampaign,
  setAllCampaignCategory,
  setAllMessage,
  setDonatur,
  setAamiinId,
  setSearchCampaign,
} = authSlice.actions;

export default authSlice.reducer;
