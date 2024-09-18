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
import { PiEye, PiEyeClosed } from "react-icons/pi";

export default function ModalLogin() {
  const { modalLogin } = useSelector((state) => state.auth);
  const { acount } = useSelector((state) => state.auth);
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Added state to toggle password visibility
  const dispatch = useDispatch();

  useEffect(() => {
    if (modalLogin) {
      setIsVisible(true);
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
    }
  }, [modalLogin]);

  const handleLogin = () => {
    dispatch(login(acount, password));
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
            className={`relative w-auto my-6 mx-auto transition-all duration-300 transform ${
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
                        <PiEye className="text-xl" />
                      ) : (
                        <PiEyeClosed className="text-xl" />
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
              <button
                onClick={handleLogin}
                className="w-full bg-primary text-lg text-white mt-8 rounded-md md:rounded-xl px-5 py-1 md:py-2 hover:translate-y-[-5px] duration-300"
              >
                Masuk
              </button>
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
