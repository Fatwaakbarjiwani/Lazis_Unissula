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
import { setToken2, setToken3 } from "../reducers/pembayaranReducer";
export const API_URL = import.meta.env.VITE_API_URL;
export const API_URL_PAYMENT = import.meta.env.VITE_API_URL_PAYMENT;
export const API_URL_PAYMENT2 = import.meta.env.VITE_API_URL_PAYMENT2;

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
export const getMe2 = () => async (dispatch) => {
  try {
    const response = await axios.get("/auth", {
      headers: {
        username: "lazissultanagung",
        password: "sultanagung123",
        "Content-Type": "application/json",
      },
    });

    if (response) {
      const data = response.data;
      dispatch(setToken2(data["x-api-key"]));
    }
  } catch (error) {
    console.error(
      "Error fetching data:",
      error.response?.data || error.message
    );
  }
};

export const getToken2 = () => async (dispatch) => {
  try {
    const response = await axios.post(
      `${API_URL_PAYMENT}/getToken`,
      {
        username: "lazissultanagung",
        password: "sultanagung123",
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response) {
      const data = response.data;
      dispatch(setToken2(data["x-api-key"]));
    }
  } catch (error) {
    // Log error agar lebih mudah debug
    console.error("Error fetching transaction:", error.message);
  }
};

export const getMe3 = (va) => async (dispatch) => {
  try {
    const username = "bimaqris";
    const password = "jatengQr1$4j1b";
    const basicAuth = `Basic ${btoa(`${username}:${password}`)}`;

    const response = await axios.post(
      "/api-bima/getToken", // Gunakan proxy untuk bypass CORS
      {
        key: "xp98Tqz2G1pReB5NZU",
        idBilling: va,
      },
      {
        headers: {
          Authorization: basicAuth,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      const data = response.data;
      dispatch(setToken3(data["token"]));
    } else {
      console.error("Gagal mendapatkan token:", response.data);
    }
  } catch (error) {
    console.error("Error fetching token:", error.message);
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
