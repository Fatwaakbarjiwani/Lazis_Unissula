import { useDispatch, useSelector } from "react-redux";
import close from "../../assets/keluar.svg";
import logo1 from "../../assets/logo1.svg";
import { useEffect, useState } from "react";
import { HiExclamation } from "react-icons/hi";
import { setModalRegister } from "../../redux/reducers/authReducer";
import { register } from "../../redux/actions/authAction";

export default function ModalRegister() {
  const { modalRegister } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const handleRegister = () => {
    if (
      password === "" ||
      phoneNumber === "" ||
      userName === "" ||
      email === ""
    ) {
      setError("Field Tidak Boleh Kosong");
    } else if (password !== confirmPassword) {
      setError("Password dan Konfirmasi Password berbeda");
    } else {
      dispatch(register(userName, phoneNumber, email, password));
    }
  };

  useEffect(() => {
    if (modalRegister) {
      setIsVisible(true);
    } else {
      setTimeout(() => setIsVisible(false), 300);
    }
  }, [modalRegister]);

  useEffect(() => {
    if (error) {
      setTimeout(() => setError(""), 3000);
    }
  }, [error]);

  const handleCloseModal = () => {
    setIsVisible(false);
    setTimeout(() => {
      dispatch(setModalRegister(false));
    }, 300);
  };

  return (
    <>
      {modalRegister && (
        <div className="bg-black/50 justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none backdrop-blur-sm">
          <div
            className={`relative my-6 mx-auto transition-all duration-300 transform ${
              isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
            }`}
          >
            <div className="bg-white sm:w-96 rounded-3xl p-5 font-Inter">
              <div className="flex justify-between items-center">
                <div className="flex justify-end w-4/6">
                  <div className="flex justify-center w-3/6">
                    <img
                      src={logo1}
                      className="absolute top-2 w-[20%]"
                      alt=""
                    />
                  </div>
                </div>
                <button
                  className="rounded-full p-1 text-white hover:scale-105"
                  onClick={handleCloseModal}
                >
                  <img src={close} className="w-6 h-6" alt="" />
                </button>
              </div>
              <div className="flex flex-col gap-2 md:gap-3">
                <div className="flex flex-col">
                  <label
                    htmlFor="name"
                    className="font-semibold text-lg text-gray-500"
                  >
                    Nama
                  </label>
                  <input
                    type="text"
                    className="rounded-md md:rounded-xl ring-1 ring-gray-600 focus:outline-none w-full text-lg py-1 px-5"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="name"
                    className="font-semibold text-lg text-gray-500"
                  >
                    Nomor Handphone
                  </label>
                  <input
                    type="text"
                    className="rounded-md md:rounded-xl ring-1 ring-gray-600 focus:outline-none w-full text-lg py-1 px-5"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="name"
                    className="font-semibold text-lg text-gray-500"
                  >
                    Alamat Email
                  </label>
                  <input
                    type="email"
                    className="rounded-md md:rounded-xl ring-1 ring-gray-600 focus:outline-none w-full text-lg py-1 px-5"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="name"
                    className="font-semibold text-lg text-gray-500"
                  >
                    Kata Sandi
                  </label>
                  <input
                    type="password"
                    className="rounded-md md:rounded-xl ring-1 ring-gray-600 focus:outline-none w-full text-lg py-1 px-5"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="name"
                    className="font-semibold text-lg text-gray-500"
                  >
                    Konfirmasi Kata Sandi
                  </label>
                  <input
                    type="password"
                    className="rounded-md md:rounded-xl ring-1 ring-gray-600 focus:outline-none w-full text-lg py-1 px-5"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                {error && (
                  <div className="absolute w-full right-0 top-0">
                    <div className="bg-white flex gap-2 items-center drop-shadow-md p-1 rounded-md">
                      <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-500">
                        <HiExclamation className="h-5 w-5" />
                      </div>
                      <div className="text-sm">{error}</div>
                    </div>
                  </div>
                )}
              </div>
              <button
                onClick={handleRegister}
                className="w-full bg-primary text-lg text-white mt-8 rounded-md md:rounded-xl px-5 py-2 hover:scale-105 transition-transform duration-300"
              >
                Daftar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
