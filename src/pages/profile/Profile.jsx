import { BiPencil } from "react-icons/bi";
import { FaCoins } from "react-icons/fa";
import { GiPapers } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import EditProfile from "../../components/profile/EditProfile";
import Footer from "../../components/navbar&footer/Footer";
import { useEffect, useState } from "react";
import Transaksi from "../../components/profile/Transaksi";
import Laporan from "../../components/profile/Laporan";
import { setButtonPage } from "../../redux/reducers/pageReducer";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { user } = useSelector((state) => state.auth);
  const [button, setButton] = useState("editProfile");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(setButtonPage("Profile"));
    if (user === null) {
      navigate("/");
    }
  }, [user]);
  return (
    <>
      <div className="flex justify-center font-Inter px-2 md:px-0 min-h-svh">
        <div className="w-full md:w-5/6 lg:w-4/6 mt-10 flex flex-col md:flex-row md:justify-between gap-6">
          <div className="h-1/4 space-y-3">
            <div className="flex gap-3 items-center">
              <img
                src={user?.image}
                className="bg-gray-200 border-2 border-gray-200 rounded-full w-16 h-16 "
                alt=""
              />

              <div>
                <p>{user?.username}</p>
                <button
                  onClick={() => setButton("editProfile")}
                  className="hover:scale-105 duration-150 flex gap-2 items-center text-sm"
                >
                  <BiPencil className="text-lg" /> Ubah Profile
                </button>
              </div>
            </div>
            <button
              onClick={() => setButton("transaksi")}
              className={`flex items-center gap-2 font-bold ${
                button == "transaksi"
                  ? "bg-primary text-white rounded p-1 w-full"
                  : "text-gray-600"
              }`}
            >
              <GiPapers
                className={
                  button == "transaksi" ? "text-white" : `text-gray-600`
                }
              />
              Transaksi
            </button>
            <button
              onClick={() => setButton("laporan")}
              className={`flex items-center gap-2 font-bold ${
                button == "laporan"
                  ? "bg-primary text-white rounded p-1 w-full"
                  : "text-gray-600"
              }`}
            >
              <FaCoins
                className={button == "laporan" ? "text-white" : `text-gray-600`}
              />
              Laporan Donasi
            </button>
          </div>
          {/* Ubah Profile */}
          {button == "editProfile" && <EditProfile />}
          {button == "transaksi" && <Transaksi />}
          {button == "laporan" && <Laporan />}
        </div>
      </div>
      <Footer />
    </>
  );
}
