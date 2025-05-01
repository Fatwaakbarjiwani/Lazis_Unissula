import { useDispatch, useSelector } from "react-redux";
import close from "../../assets/keluar.svg";
import logo from "../../assets/logo1.svg";
import { useState, useEffect } from "react";
import {
  setAcount,
  setModalLogin,
  setModalRegister,
  setModalResetPassword,
  setPs,
} from "../../redux/reducers/authReducer";
import { login } from "../../redux/actions/authAction";
// import { PiEye } from "react-icons/pi";
// import { PiEyeClosed } from "react-icons/pi";
import { OrbitProgress } from "react-loading-indicators";
import GoogleLogin from "../oauth/GoogleLogin";
import { useNavigate } from "react-router-dom";

export default function ModalLogin() {
  const { modalLogin } = useSelector((state) => state.auth);
  const { acount } = useSelector((state) => state.auth);
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Added state to toggle password visibility
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (modalLogin) {
      setIsVisible(true);
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
    }
  }, [modalLogin]);

  const handleLogin = () => {
    setLoading(true);
    dispatch(login(acount, password, navigate)).finally(() =>
      setLoading(false)
    );
    dispatch(setPs(password));
  };

  const handleDaftar = () => {
    dispatch(setModalRegister(true));
    dispatch(setModalLogin(false));
  };

  const handleCloseModal = () => {
    setIsVisible(false);
    setTimeout(() => {
      dispatch(setModalLogin(false));
    }, 300); // Wait for animation to finish
  };

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <>
      {modalLogin ? (
        <div className="bg-black/50 justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div
            className={`relative w-auto my-6 mx-auto transition-all duration-100 transform ${
              isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
            }`}
          >
            <div className="bg-white shadow rounded-3xl p-5 font-Inter">
              <div className="flex justify-between items-center">
                <div className="flex justify-center w-full">
                  <img src={logo} className="absolute top-2 w-[25%]" alt="" />
                </div>
                <button
                  className="rounded-full p-1 text-white hover:scale-105"
                  onClick={handleCloseModal}
                >
                  <img src={close} className="w-6 h-6" alt="" />
                </button>
              </div>
              <div className="flex flex-col gap-2 md:gap-3 mt-2">
                <div className="flex flex-col ">
                  <label
                    htmlFor="emailOrPhone"
                    className="font-semibold text-lg text-gray-500"
                  >
                    Alamat Email/Nomor Handphone
                  </label>
                  <input
                    type="text"
                    id="emailOrPhone"
                    className="rounded-md md:rounded-xl ring-1 ring-gray-400 focus:outline-none w-full text-lg py-1 px-5"
                    value={acount}
                    onChange={(e) => dispatch(setAcount(e.target.value))}
                  />
                </div>
                <div className="flex flex-col ">
                  <label
                    htmlFor="password"
                    className="font-semibold text-lg text-gray-500"
                  >
                    Kata Sandi
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"} // Toggle input type between text and password
                      id="password"
                      className="rounded-md md:rounded-xl ring-1 ring-gray-400 focus:outline-none w-full text-lg py-1 px-5"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={toggleShowPassword}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
                    >
                      {showPassword ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-6 h-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-6 h-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.964 9.964 0 012.501-4.245M15 12a3 3 0 00-3-3m0 0a3 3 0 013 3m0 0a3 3 0 01-3 3m0 0a3 3 0 01-3-3m0 0a3 3 0 013-3m0 0L4.121 4.121M20 20L4 4"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-2">
                <button
                  onClick={() => {
                    dispatch(setModalLogin(false));
                    dispatch(setModalResetPassword(true));
                  }}
                  className="text-sm text-primary cursor-pointer"
                >
                  Lupa password anda?
                </button>
              </div>
              {/* button */}
              {isLoading ? (
                <div className="w-full flex justify-center mt-8">
                  <OrbitProgress
                    variant="dotted"
                    color="#69c53e"
                    text=""
                    style={{ fontSize: "8px" }}
                    textColor=""
                  />
                </div>
              ) : (
                <button
                  onClick={handleLogin}
                  className="w-full bg-primary text-lg text-white mt-6 rounded-md md:rounded-xl px-5 py-1 md:py-2 hover:translate-y-[-5px] duration-300"
                >
                  Masuk
                </button>
              )}
              <GoogleLogin />
              <div className="flex justify-center mt-3 active:scale-105 duration-75">
                <p>Belum punya akun?</p>
              </div>
              <button
                onClick={handleDaftar}
                className="w-full border-2 border-primary text-lg text-primary mt-2 rounded-md md:rounded-xl px-5 py-1 md:py-2 hover:translate-y-[-5px] duration-300"
              >
                Daftar
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
