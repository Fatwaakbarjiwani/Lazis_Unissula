import axios from "axios";
import {
  setAllCampaign,
  setAllCampaignCategory,
  setAllCampaignEmergency,
  setAllMessage,
  setCampaignBySearch,
  setDetailCampaign,
  setDistribution,
  setDonatur,
  setRincian,
  setTotalPageNumber,
  setTotalPageNumberMessage,
} from "../reducers/campaignReducer";
export const API_URL = import.meta.env.VITE_API_URL;

export const getAllCampaign = (pageNumber) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${API_URL}/campaign/get-active-and-approved-campaign?page=${pageNumber}`
    );
    const data = response.data;
    dispatch(setAllCampaign(data.content));
    dispatch(setTotalPageNumber(data.totalPages));
  } catch (error) {
    console.error("Error fetching campaign data:", error);
  }
};
export const getSearchCampaign = (name) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${API_URL}/campaign/campaign-name?campaignName=${name}`
    );
    const data = response.data;
    dispatch(setCampaignBySearch(data.content));
    dispatch(setTotalPageNumber(data.totalPages));
  } catch (error) {
    console.error("Error fetching campaign data:", error);
  }
};
export const getCampaignByCategory =
  (category, pageNumber) => async (dispatch) => {
    try {
      const response = await axios.get(
        `${API_URL}/campaign/category?campaignCategory=${category}&page=${pageNumber}`
      );
      const data = response.data;
      dispatch(setAllCampaign(data.content));
      dispatch(setTotalPageNumber(data.totalPages));
    } catch (error) {
      console.error("Error fetching campaignbycategory data:", error);
    }
  };
export const getAllCampaignEmergency = () => async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}/campaign/emergency`);
    const data = response.data;
    dispatch(setAllCampaignEmergency(data.content));
  } catch (error) {
    console.error("Error fetching campaign Emergency data:", error);
  }
};
export const getDetailCampaign = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}/campaign/${id}`);
    const data = response.data;
    dispatch(setDetailCampaign(data));
  } catch (error) {
    return;
  }
};

export const getAllCampaignCategory = () => async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}/campaignCategory`);
    const data = response.data;
    dispatch(setAllCampaignCategory(data));
  } catch (error) {
    console.error("Error fetching all campaign category", error);
  }
};
export const getAllMessage = () => async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}/messages`);
    const data = response.data;
    dispatch(setAllMessage(data.content));
  } catch (error) {
    console.error("Error fetching message data:", error);
  }
};
export const getTransactionCampaign = (id, page) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${API_URL}/transaction/campaign/${id}?page=${page}`
    );
    const data = response.data;
    dispatch(setDonatur(data.content));
    dispatch(setTotalPageNumberMessage(data.totalPages));
  } catch (error) {
    console.error("Error fetching message data:", error);
  }
};
export const getDistribusiCampaign = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}/distribution/campaign/${id}`);
    const data = response.data;
    dispatch(setDistribution(data));
  } catch (error) {
    console.error("Error fetching message data:", error);
  }
};
export const getRincian = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}/percentage/rincian/${id}`);
    const data = response.data;
    dispatch(setRincian(data));
  } catch (error) {
    console.error("Error fetching message data:", error);
  }
};
