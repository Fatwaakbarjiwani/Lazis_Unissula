import axios from "axios";
import toast from "react-hot-toast";
import {
  setModalLogin,
  setModalRegister,
  setToken,
  setUser,
} from "../reducers/authReducer";
import Swal from "sweetalert2";
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
      toast.error("Proses Register Gagal");
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
      toast.success("Proses Login Berhasil");
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
    toast.error("Proses Login Gagal");
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
    console.log(email);

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