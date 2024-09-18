import search from "../../assets/search.svg";
import logo from "../../assets/logo.svg";
import down from "../../assets/down.svg";
import { MdMenu } from "react-icons/md";
import { useEffect, useState } from "react";
import { setModalRegister } from "../../redux/reducers/authReducer";
import acount from "../../assets/acount.svg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setModalLogin } from "../../redux/reducers/authReducer";
import { setButtonPage } from "../../redux/reducers/pageReducer";
import { getMe, logout } from "../../redux/actions/authAction";
import {
  setPageNumber,
  setSearchCampaign,
} from "../../redux/reducers/campaignReducer";
import { Box, ClickAwayListener } from "@mui/material";
import { dataLayanan, dataProfile } from "../data/dropDown";

function Navbar() {
  const dispatch = useDispatch();
  const { buttonPage } = useSelector((state) => state.page);
  const { user } = useSelector((state) => state.auth);
  const { searchCampaign } = useSelector((state) => state.campaign);
  const navigate = useNavigate();

  const [isSearchVisible, setSearchVisible] = useState(false);
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [isAcountVisible, setAcountVisible] = useState(false);
  const [isDropdownLVisible, setDropdownLVisible] = useState(false);
  const [isDropdownPVisible, setDropdownPVisible] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    const searchQuery = searchCampaign.trim();
    if (searchQuery === "") {
      navigate("/");
    } else {
      const searchUrl = `/searchCampaign/${searchQuery}`;
      dispatch(setPageNumber(1));
      navigate(searchUrl);
    }
  };

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  return (
    <div className="fixed top-0 w-full font-Inter z-50 bg-white shadow-md">
      <div className="flex items-center justify-between gap-4 px-4 py-2">
        {/* Logo Web */}
        <div className="flex items-end">
          <Link
            to={"/"}
            onClick={() => {
              dispatch(setButtonPage(""));
            }}
            className="flex"
          >
            <img src={logo} alt="Logo" className="h-12" />
          </Link>
        </div>

        {/* Search Bar for Larger Screens */}
        <div className="hidden md:flex bg-gray-100 hover:bg-white transition duration-300 ring-1 ring-gray-300 shadow-inner ps-8 p-1 rounded-full items-center justify-center gap-2">
          <img src={search} className="w-5" alt="Search" />
          <form action="" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Cari Campaign"
              className="outline-none bg-transparent w-full"
              value={searchCampaign}
              onChange={(e) => dispatch(setSearchCampaign(e.target.value))}
            />
          </form>
        </div>

        {/* Desktop Navigation Links */}
        <div className="flex gap-2 xl:gap-0 justify-end xl:justify-between w-3/6 xl:w-4/6">
          <button
            onClick={() => setSearchVisible(!isSearchVisible)}
            className="block md:hidden hover:scale-105 duration-150 font-semibold text-gray-600"
          >
            <img src={search} className="w-6" alt="Search Icon" />
          </button>
          <button
            onClick={() => setMenuVisible(!isMenuVisible)}
            className="block xl:hidden hover:scale-105 duration-150 font-semibold text-gray-600"
          >
            <MdMenu className="w-6 h-6" />
          </button>
          <button
            onClick={() => setAcountVisible(!isAcountVisible)}
            className="block sm:hidden hover:scale-105 duration-150 font-semibold text-gray-600"
          >
            <img src={acount} className="w-6" alt="Account Icon" />
          </button>
          <div className="hidden space-x-4 xl:flex items-center">
            <Link
              to={"/fiqihZiswaf/Ziswaf"}
              onClick={() => {
                dispatch(setButtonPage("Ziswaf"));
              }}
              className={`${
                buttonPage === "Ziswaf"
                  ? "text-primary underline-offset-8 underline"
                  : ""
              } hover:scale-105 duration-150 font-semibold text-gray-600`}
            >
              Ziswaf
            </Link>
            <Link
              to={"/daftarCampaign/Campaign/1"}
              onClick={() => {
                dispatch(setButtonPage("Campaign"));
              }}
              className={`${
                buttonPage === "Campaign"
                  ? "text-primary underline underline-offset-8"
                  : ""
              } hover:scale-105 duration-150 font-semibold text-gray-600`}
            >
              Campaign
            </Link>
            <Link
              to={"/berita/Berita/1"}
              onClick={() => {
                dispatch(setButtonPage("Berita"));
              }}
              className={`${
                buttonPage === "Berita"
                  ? "text-primary underline-offset-8 underline"
                  : ""
              } hover:scale-105 duration-150 font-semibold text-gray-600`}
            >
              Berita
            </Link>
            <ClickAwayListener onClickAway={() => setDropdownLVisible(false)}>
              <Box>
                <button
                  onClick={() => setDropdownLVisible(!isDropdownLVisible)}
                  className="flex items-center gap-1 hover:scale-105 duration-150 font-semibold text-gray-600"
                >
                  Layanan <img src={down} alt="" />
                </button>
                {isDropdownLVisible ? (
                  <Box className="absolute bg-white rounded-b p-2 space-y-1">
                    {dataLayanan.map((item) => (
                      <button
                        key={item.id}
                        className="flex items-center gap-1 hover:scale-105 duration-150 font-semibold text-gray-600"
                      >
                        {item.name}
                      </button>
                    ))}
                  </Box>
                ) : null}
              </Box>
            </ClickAwayListener>
            <ClickAwayListener onClickAway={() => setDropdownPVisible(false)}>
              <Box>
                <button
                  onClick={() => setDropdownPVisible(!isDropdownPVisible)}
                  className="flex items-center gap-1 hover:scale-105 duration-150 font-semibold text-gray-600"
                >
                  Profile <img src={down} alt="" />
                </button>
                {isDropdownPVisible ? (
                  <Box className="absolute bg-white rounded-b p-2">
                    {dataProfile.map((item) => (
                      <button
                        onClick={() => navigate(`/penjelasan/${item.code}`)}
                        key={item.id}
                        className="flex items-center gap-1 hover:scale-105 duration-150 font-semibold text-gray-600"
                      >
                        {item.name}
                      </button>
                    ))}
                  </Box>
                ) : null}
              </Box>
            </ClickAwayListener>
          </div>
          {user !== null ? (
            <div className="space-x-4 hidden sm:flex items-center xl:w-2/6 justify-center">
              <Link to={"/profile"}>
                <button className="flex items-center gap-1 hover:scale-105 duration-150 font-semibold text-gray-600">
                  <img src={acount} alt="Account" />
                  <p className="line-clamp-1 text-left">{user?.username}</p>
                </button>
              </Link>
              <button
                onClick={() => dispatch(logout())}
                className="hover:scale-105 duration-150 font-semibold text-white bg-red-700 p-1 rounded-full px-4"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="hidden space-x-4 sm:flex">
              <button
                onClick={() => dispatch(setModalLogin(true))}
                className="flex items-center gap-1 hover:scale-105 duration-150 font-semibold text-gray-600"
              >
                <img src={acount} alt="Account" /> <p>Masuk</p>
              </button>
              <button
                onClick={() => dispatch(setModalRegister(true))}
                className="hover:scale-105 duration-150 font-semibold text-white bg-primary p-1 rounded-full px-4"
              >
                Daftar
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Search Bar */}
      {isSearchVisible && (
        <div className="lg:hidden flex justify-center bg-gray-50 shadow px-4 py-2 transition duration-300">
          <div className="flex bg-white ring-1 ring-gray-300 shadow-inner ps-8 p-1 rounded-full items-center  gap-2 w-full">
            <img src={search} className="w-5" alt="Search" />
            <form onSubmit={handleSearch} className="w-full">
              <input
                type="text"
                placeholder="Cari Campaign"
                className="outline-none bg-transparent w-full"
                value={searchCampaign}
                onChange={(e) => dispatch(setSearchCampaign(e.target.value))}
              />
            </form>
          </div>
        </div>
      )}

      {/* Mobile Navigation Links */}
      {isMenuVisible && (
        <div className="xl:hidden flex flex-col justify-between items-start bg-gray-50 px-4 py-2">
          <Link
            to={"/fiqihZiswaf/Ziswaf"}
            onClick={() => {
              dispatch(setButtonPage("Ziswaf"));
              setMenuVisible(false);
            }}
            className={`${
              buttonPage === "Ziswaf"
                ? "text-primary underline-offset-8 underline"
                : ""
            } hover:scale-105 duration-150 font-semibold text-gray-600 mb-2`}
          >
            Ziswaf
          </Link>
          <Link
            to={"/daftarCampaign/Campaign/1"}
            onClick={() => {
              dispatch(setButtonPage("Campaign"));
              setMenuVisible(false);
            }}
            className={`${
              buttonPage === "Campaign"
                ? "text-primary underline-offset-8 underline"
                : ""
            } hover:scale-105 duration-150 font-semibold text-gray-600 mb-2`}
          >
            Campaign
          </Link>
          <Link
            to={"/berita/Berita/1"}
            onClick={() => {
              dispatch(setButtonPage("Berita"));
              setMenuVisible(false);
            }}
            className={`${
              buttonPage === "Berita"
                ? "text-primary underline-offset-8 underline"
                : ""
            } hover:scale-105 duration-150 font-semibold text-gray-600 mb-2`}
          >
            Berita
          </Link>
          <div className="relative">
            <button className="flex items-center gap-1 hover:scale-105 duration-150 font-semibold text-gray-600">
              Layanan <img src={down} alt="Dropdown Icon" />
            </button>
          </div>
          <button className="flex items-center gap-1 hover:scale-105 duration-150 font-semibold text-gray-600">
            Profile <img src={down} alt="Dropdown Icon" />
          </button>
        </div>
      )}
      {isAcountVisible && (
        <>
          {user !== null ? (
            <div className="sm:hidden space-y-2 items-center px-4 p-1 bg-gray-50">
              <Link to={"/profile"}>
                <button className="w-full flex items-center justify-center gap-1 hover:scale-105 rounded duration-150 font-semibold text-gray-600 border-primary border-2">
                  <img src={acount} alt="Account" />
                  <p className="line-clamp-1 text-left">{user?.username}</p>
                </button>
              </Link>
              <button
                onClick={() => dispatch(logout())}
                className="hover:scale-105 duration-150 font-semibold w-full text-white bg-red-700 p-1 rounded px-4"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="sm:hidden space-y-2 items-center px-4 p-1 bg-gray-50">
              <button
                onClick={() => dispatch(setModalLogin(true))}
                className="flex items-center justify-center border-2 border-primary gap-1 hover:scale-105 duration-150 font-semibold text-gray-600 w-full"
              >
                <img src={acount} alt="Account" /> <p>Masuk</p>
              </button>
              <button
                onClick={() => dispatch(setModalRegister(true))}
                className="hover:scale-105 duration-150 font-semibold text-white bg-primary p-1 rounded w-full px-4"
              >
                Daftar
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Navbar;
