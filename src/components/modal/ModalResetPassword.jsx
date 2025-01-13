import { useDispatch, useSelector } from "react-redux";
import close from "../../assets/keluar.svg";
import logo from "../../assets/logo1.svg";
import { useState, useEffect } from "react";
import {
  setModalLogin,
  setModalResetPassword,
} from "../../redux/reducers/authReducer";
import { HiInformationCircle } from "react-icons/hi";
import { resetPassword } from "../../redux/actions/authAction";
import { OrbitProgress } from "react-loading-indicators";

export default function ModalResetPassword() {
  const { modalResetPassword } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [isSucces, setSucces] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [timer, setTimer] = useState(30); // Timer for resend email
  const [canResend, setCanResend] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (modalResetPassword) {
      setSucces(false);
      setIsVisible(true);
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
    }
  }, [modalResetPassword]);

  useEffect(() => {
    if (isSucces && timer > 0) {
      const countdown = setTimeout(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(countdown);
    } else if (timer === 0) {
      setCanResend(true); // Allow user to resend email
    }
  }, [isSucces, timer]);

  const handleCloseModal = () => {
    setIsVisible(false);
    setTimeout(() => {
      dispatch(setModalResetPassword(false));
    }, 300);
  };

  const handleReset = () => {
    setLoading(true);
    dispatch(resetPassword(email, setSucces)).finally(() => setLoading(false));
    setTimer(30);
    setCanResend(false);
  };

  const handleResend = () => {
    setTimer(30);
    setCanResend(false);
    dispatch(resetPassword(email, setSucces));
  };

  return (
    <>
      {modalResetPassword ? (
        <div className="bg-black/50 justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div
            className={`relative w-auto my-6 mx-auto transition-all duration-100 transform ${
              isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
            }`}
          >
            <div className="bg-white max-w-xs shadow rounded-3xl p-5 font-Inter">
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
              {isSucces ? (
                <div className="flex flex-col gap-2 md:gap-3 mt-2">
                  <div className="bg-gray-100 rounded-lg p-1 shadow">
                    <p className="text-gray-600 italic font-bold flex items-center ">
                      <HiInformationCircle className="text-blue-800 text-xl rounded-full italic" />
                      Konfirmasi
                    </p>
                    <p className="text-gray-600 text-left">
                      Instruksi reset kata sandi telah dikirim ke email Anda.
                      Silakan periksa inbox Anda.
                    </p>
                  </div>
                  {canResend ? (
                    <button
                      onClick={handleResend}
                      className="w-full bg-primary text-lg text-white mt-3 rounded-md md:rounded-xl px-5 py-1 md:py-2 hover:translate-y-[-5px] duration-300"
                    >
                      Kirim Ulang Email
                    </button>
                  ) : (
                    <p className="text-gray-500 text-sm text-center">
                      Tunggu {timer} detik untuk mengirim ulang email
                    </p>
                  )}
                </div>
              ) : (
                <div className="flex flex-col gap-2 md:gap-3 mt-2">
                  <div className="bg-gray-100 rounded-lg p-1 shadow">
                    <p className="text-gray-600 italic font-bold flex items-center ">
                      <HiInformationCircle className="text-blue-800 text-xl rounded-full italic" />
                      Information
                    </p>
                    <p className="text-gray-600 text-left">
                      Masukkan alamat email yang terdaftar untuk menerima
                      instruksi reset kata sandi.
                    </p>
                  </div>
                  <div className="flex flex-col ">
                    <label
                      htmlFor="emailOrPhone"
                      className="font-semibold text-lg text-gray-500"
                    >
                      Alamat Email
                    </label>
                    <input
                      type="email"
                      id="emailOrPhone"
                      className="rounded-md md:rounded-xl border border-gray-400 focus:outline-none w-full text-lg py-1 px-5"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
              )}
              {isSucces == false && (
                <>
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
                      onClick={handleReset}
                      className="w-full bg-primary text-lg text-white mt-8 rounded-md md:rounded-xl px-5 py-1 md:py-2 hover:translate-y-[-5px] duration-300"
                    >
                      Reset password
                    </button>
                  )}
                </>
              )}
              {isSucces ? (
                <div className="mt-4">
                  <p className="text-gray-600">Kembali ke halaman login ?</p>
                  <button
                    onClick={() => {
                      dispatch(setModalResetPassword(false));
                      dispatch(setModalLogin(true));
                    }}
                    className="w-full border-2 border-primary text-lg text-primary mt-2 rounded-md md:rounded-xl px-5 py-1 md:py-2 hover:translate-y-[-5px] duration-300"
                  >
                    Kembali
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    dispatch(setModalResetPassword(false));
                    dispatch(setModalLogin(true));
                  }}
                  className="w-full border-2 border-primary text-lg text-primary mt-2 rounded-md md:rounded-xl px-5 py-1 md:py-2 hover:translate-y-[-5px] duration-300"
                >
                  Kembali
                </button>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
