import axios from "axios";
import {
  setAllBerita,
  setCategoryBerita,
  setDetailBerita,
  setTopBerita,
  setTotalPageNumberBerita,
} from "../reducers/beritaReducer";

export const API_URL = import.meta.env.VITE_API_URL;

export const getAllBerita = (pageNumber) => async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}/news?page=${pageNumber}`);
    const data = response.data;
    dispatch(setAllBerita(data.content));
    dispatch(setTotalPageNumberBerita(data.totalPages));
  } catch (error) {
    console.error("Error fetching news :", error);
  }
};
export const getTopBerita = () => async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}/news`);
    const data = response.data;
    dispatch(setTopBerita(data.content));
  } catch (error) {
    console.error("Error fetching top news :", error);
  }
};

export const getSearchBerita =
  (title, topic, pageNumber) => async (dispatch) => {
    try {
      const response = await axios.get(
        `${API_URL}/news/search?title=${title}${
          topic ? `&newsTopic=${topic}` : ""
        }&page=${pageNumber}`
      );

      const data = response.data;
      dispatch(setAllBerita(data.content));
      dispatch(setTotalPageNumberBerita(data.totalPages));
    } catch (error) {
      console.error("Error fetching search news :", error);
    }
  };
export const getDetailBerita = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}/news/${id}`);
    const data = response.data;
    dispatch(setDetailBerita(data));
  } catch (error) {
    console.error("Error fetching detaile news :", error);
  }
};
export const getCategoryBerita = () => async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}/newsTopic`);
    const data = response.data;
    dispatch(setCategoryBerita(data));
  } catch (error) {
    console.error("Error fetching newsCategory :", error);
  }
};
