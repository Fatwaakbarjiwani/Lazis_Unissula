import axios from "axios";
import toast from "react-hot-toast";
import {
  setModalLogin,
  setModalRegister,
  setSummaryUser,
  setToken,
  setUser,
} from "../reducers/authReducer";
import Swal from "sweetalert2";
import { setSlides, setSummary } from "../reducers/pageReducer";
export const API_URL = import.meta.env.VITE_API_URL;

export const register =
  (username, phoneNumber, email, password) => async (dispatch) => {
    try {
      const response = await axios.post(`${API_URL}/auth/signup/donatur`, {
        username: username,
        phoneNumber: phoneNumber,
        email: email,
        password: password,
      });
      if (response) {
        toast.success("Proses Register Berhasil");
        dispatch(setModalRegister(false));
        dispatch(setModalLogin(true));
      }
    } catch (error) {
      Swal.fire({
        title: "Proses register gagal",
        text: error.response.data.message,
        icon: "error",
      });
    }
  };
export const login = (acount, password) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_URL}/auth/signin/donatur`, {
      emailOrPhoneNumber: acount,
      password: password,
    });
    if (response) {
      const data = response.data;
      Swal.fire({
        title: `Selamat datang ${data.username}`,
        text: "Donasi Anda Harapan Mereka",
        icon: "success",
      });
      setTimeout(() => {
        dispatch(setModalLogin(false));
      }, 2000);
      dispatch(setToken(data.token));
      try {
        const response = await axios.get(`${API_URL}/donatur/profile`, {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        });
        dispatch(setUser(response.data));
      } catch (error) {
        window.location.reload();
      }
    }
  } catch (error) {
    Swal.fire({
      title: "Proses login gagal",
      text: error.response.data.message,
      icon: "error",
    });
  }
};

export const registerWithGoogle = (accessToken) => async (dispatch) => {
  try {
    // console.log(accessToken);

    const response = await axios.post(`${API_URL}/auth/google`, {
      access_token: accessToken,
    });
    if (response) {
      const data = response.data;
      dispatch(setToken(data.token));
      dispatch(setModalLogin(false));
    }
  } catch (error) {
    Swal.fire({
      title: "Proses login gagal",
      text: error.message,
      icon: "error",
    });
  }
};

export const getMe = () => async (dispatch, getState) => {
  try {
    const { token } = getState().auth;
    const response = await axios.get(`${API_URL}/donatur/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response) {
      const data = response.data;
      dispatch(setUser(data));
    }
  } catch (error) {
    error;
  }
};
export const getSummary = () => async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}/summary`);
    if (response) {
      const data = response.data;
      dispatch(setSummary(data));
    }
  } catch (error) {
    error;
  }
};
export const getSummaryDonatur = () => async (dispatch, getState) => {
  try {
    const { token } = getState().auth;
    const response = await axios.get(`${API_URL}/donatur/summary`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response) {
      const data = response.data;
      dispatch(setSummaryUser(data));
    }
  } catch (error) {
    error;
  }
};
export const getSlides = () => async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}/dashboardImage`);
    if (response) {
      const data = response.data;
      dispatch(setSlides(data));
      console.log(data);
    }
    
  } catch (error) {
    error;
  }
};

export const editProfileUser =
  (
    username,
    phoneNumber,
    email,
    password,
    profilePicture,
    address,
    setEdit,
    toLogin,
    navigate
  ) =>
  async (dispatch, getState) => {
    const { token } = getState().auth;
    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("phoneNumber", phoneNumber);
      formData.append("email", email);
      {
        if (password != null) {
          formData.append("password", password);
        }
      }
      {
        profilePicture != null && formData.append("image", profilePicture);
      }
      formData.append("address", address);
      const response = await axios.post(`${API_URL}/donatur/edit`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response) {
        const data = response.data;
        {
          toLogin == true
            ? (toast.success(
                "Proses edit profile berhasil silahkan masuk menggunakan akun dan password terbaru"
              ),
              navigate("/"),
              dispatch(setModalLogin(true)),
              dispatch(setToken(null)),
              dispatch(setUser(null)))
            : (dispatch(setUser(data)),
              setEdit(false),
              toast.success("Proses Edit Profile selesai"));
        }
      }
    } catch (error) {
      toast.error("Proses edit profile gagal");
    }
  };

export const resetPassword = (email, setSucces) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_URL}/auth/reset-password`, {
      email: email,
    });
    if (response) {
      setSucces(true);
      Swal.fire({
        title: "Reset password berhasil",
        text: "Silahkan cek email anda",
        icon: "success",
      });
    }
  } catch (error) {
    Swal.fire({
      title: error.response.data.message,
      text: "Masukkan ulang email anda",
      icon: "error",
    });
  }
};
export const logout = () => (dispatch) => {
  dispatch(setToken(null));
  dispatch(setUser(null));
  toast.success("Berhasil Keluar");
};
