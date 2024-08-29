import search from "../../assets/search.svg";
import logo from "../../assets/logo.svg";
import down from "../../assets/down.svg";
import { setModalRegister } from "../../redux/reducers/authReducer";
import acount from "../../assets/acount.svg";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setModalLogin} from "../../redux/reducers/authReducer";
function Navbar() {
  const dispatch = useDispatch();
  return (
    <div className="fixed top-0 w-full font-Inter z-50">
      <div className="flex items-center justify-between px-4 py-2 bg-white shadow">
        <div className="flex items-end">
          <Link to={"/"} className="flex">
            <img src={logo} alt="" className="h-12" />
          </Link>
        </div>
        <div className="bg-white ring-1 ring-black shadow flex ps-8 p-1 rounded-full items-center justify-center gap-2">
          <img src={search} className="w-5" alt="" />
          <input
            type="text"
            placeholder="Cari Campaign"
            className="outline-none bg-transparent"
          />
        </div>
        <div className="flex justify-between w-3/6">
          <div className="space-x-4 flex items-center">
            <button className="hover:scale-105 duration-150 font-semibold text-gray-600">
              Ziswaf
            </button>
            <button className="hover:scale-105 duration-150 font-semibold text-gray-600">
              Campaign
            </button>
            <Link to={"/berita"} className="hover:scale-105 duration-150 font-semibold text-gray-600">
              Berita
            </Link>
            <button className="flex items-center gap-1 hover:scale-105 duration-150 font-semibold text-gray-600">
              Layanan <img src={down} alt="" />
            </button>
            <button className="flex items-center gap-1 hover:scale-105 duration-150 font-semibold text-gray-600">
              Profile <img src={down} alt="" />
            </button>
          </div>
          <div className="space-x-4 flex">
            <button
              onClick={() => dispatch(setModalLogin(true))}
              className="flex items-center gap-1 hover:scale-105 duration-150 font-semibold text-gray-600"
            >
              <img src={acount} alt="" /> Masuk
            </button>
            <button
              onClick={() => dispatch(setModalRegister(true))}
              className="hover:scale-105 duration-150 font-semibold text-white bg-primary p-1 rounded-full px-4"
            >
              Daftar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
