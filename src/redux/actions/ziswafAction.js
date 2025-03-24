import axios from "axios";
import {
  setCategoryZiswaf,
  setDetailFitrah,
  setDetailZiswaf,
  setNominalFitrah,
} from "../reducers/ziswafReducer";
export const API_URL = import.meta.env.VITE_API_URL;

export const getCategoryZiswaf = (type) => async (dispatch) => {
  try {
    dispatch(setCategoryZiswaf([]));
    const response = await axios.get(`${API_URL}/${type}`);
    const data = response.data;
    dispatch(setCategoryZiswaf(data));
  } catch (error) {
    console.error("Error fetching all yiswaf category", error);
  }
};
export const getDetailZiswaf = (category, id) => async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}/${category}/${id}`);
    const data = response.data;
    dispatch(setDetailZiswaf(data));
  } catch (error) {
    // console.error("Error fetching detail ziswaf", error);
    return;
  }
};
export const getDetailFitrah = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}/zakat/data/${id}`);
    const data = response.data;
    dispatch(setDetailFitrah(data));
  } catch (error) {
    return;
  }
};
export const getNominalFitrah = () => async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}/nomZakat/get/one`);
    const data = response.data;
    dispatch(setNominalFitrah(data));
  } catch (error) {
    return;
  }
};
