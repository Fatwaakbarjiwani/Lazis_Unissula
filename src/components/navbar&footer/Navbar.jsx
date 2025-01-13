import search from "../../assets/search.svg";
import logo from "../../assets/logoYBWSA.png";
import logo2 from "../../assets/logo2.png";
import down from "../../assets/down.svg";
import { MdMenu } from "react-icons/md";
import { useEffect, useState } from "react";
import { setModalRegister } from "../../redux/reducers/authReducer";
import acount from "../../assets/acount.svg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setModalLogin } from "../../redux/reducers/authReducer";
import { setButtonPage } from "../../redux/reducers/pageReducer";
import { getMe, getMe2, logout } from "../../redux/actions/authAction";
import {
  setPageNumber,
  setSearchCampaign,
} from "../../redux/reducers/campaignReducer";
import { Box, ClickAwayListener } from "@mui/material";
import { dataLayanan, dataProfile } from "../data/dropDown";
import { BiUser } from "react-icons/bi";
import { BsArrowDown } from "react-icons/bs";

function Navbar() {
  const dispatch = useDispatch();
  const { buttonPage } = useSelector((state) => state.page);
  const { user } = useSelector((state) => state.auth);
  const { token } = useSelector((state) => state.auth);
  const { searchCampaign } = useSelector((state) => state.campaign);
  const navigate = useNavigate();

  const [isSearchVisible, setSearchVisible] = useState(false);
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [isDropdownLVisible, setDropdownLVisible] = useState(false);
  const [isDropdownPVisible, setDropdownPVisible] = useState(false);
  const [isDropdownLMVisible, setDropdownLMVisible] = useState(false);
  const [isDropdownPMVisible, setDropdownPMVisible] = useState(false);

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
    if (token) {
      dispatch(getMe());
    }
    dispatch(getMe2());
  }, [dispatch, token]);

  return (
    <div className="fixed top-0 w-full font-Inter z-50 shadow-md bg-white/80 backdrop-blur-md">
      <div className="flex items-center justify-between gap-4 px-4 py-2">
        <div className="flex items-end ">
          {isSearchVisible ? (
            <div className={`sm:hidden flex px-4 py-2`}>
              <div className="flex bg-white hover:bg-gray-50 transition duration-300 shadow-inner ps-8 p-1 rounded-full items-center  gap-2 w-full">
                <img src={search} className="w-5" alt="Search" />
                <form onSubmit={handleSearch} className="w-full">
                  <input
                    type="text"
                    placeholder="Cari Campaign"
                    className="outline-none bg-transparent w-full"
                    value={searchCampaign}
                    onChange={(e) =>
                      dispatch(setSearchCampaign(e.target.value))
                    }
                  />
                </form>
              </div>
            </div>
          ) : (
            <Link
              to={"/"}
              onClick={() => {
                dispatch(setButtonPage("Home"));
              }}
              className="flex sm:hidden"
            >
              <img src={logo} alt="Logo" className="h-12" />
              <img src={logo2} alt="Logo" className="h-12" />
            </Link>
          )}
          <Link
            to={"/"}
            onClick={() => {
              dispatch(setButtonPage("Home"));
            }}
            className="sm:flex hidden"
          >
            <img src={logo} alt="Logo" className="h-12" />
            <img src={logo2} alt="Logo" className="h-12" />
          </Link>
        </div>

        {/* Search Bar for Larger Screens */}
        <div className="hidden sm:flex bg-gray-100 hover:bg-white transition duration-300 ring-1 ring-gray-300 shadow-inner ps-8 p-1 rounded-full items-center justify-center gap-2">
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
        <div className="flex gap-2 xl:gap-0 justify-end xl:justify-between w-2/6 md:w-3/6 xl:w-4/6">
          <button
            onClick={() => setSearchVisible(!isSearchVisible)}
            className="block sm:hidden hover:scale-105 duration-150 font-semibold text-gray-600"
          >
            <img src={search} className="w-6" alt="Search Icon" />
          </button>
          <div className="hidden space-x-4 lg:flex items-center">
            <Link
              to={"/"}
              onClick={() => {
                dispatch(setButtonPage("Home"));
              }}
              className={`${
                buttonPage === "Home"
                  ? "text-primary underline-offset-8 underline"
                  : ""
              } hover:scale-105 duration-150 font-semibold text-gray-600`}
            >
              Home
            </Link>
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
          <button
            onClick={() => setMenuVisible(!isMenuVisible)}
            className="block ds:hidden hover:scale-105 duration-150 font-semibold text-gray-600"
          >
            <MdMenu className="w-6 h-6" />
          </button>
          {user !== null ? (
            <div className="space-x-4 hidden ds:flex items-center xl:w-2/6 justify-center">
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
            <div className="hidden space-x-4 ds:flex">
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
      {/* Mobile Navigation Links */}
      <div
        className={`${
          isMenuVisible ? "" : "translate-x-[400px] transition"
        } transition w-1/2 sm:w-1/3 md:w-3/12 lg:w-1/6 xl:hidden absolute right-0 h-screen duration-200 bg-white/80 backdrop-blur-md drop-shadow-md  px-4 py-2`}
      >
        <div className="lg:hidden flex flex-col gap-1">
          <Link
            to={"/"}
            onClick={() => {
              dispatch(setButtonPage("Home"));
              setMenuVisible(false);
            }}
            className={`${
              buttonPage === "Home"
                ? "text-primary border-b-2 border-primary w-full"
                : ""
            } hover:scale-105 duration-150 font-semibold text-gray-600`}
          >
            Home
          </Link>
          <Link
            to={"/fiqihZiswaf/Ziswaf"}
            onClick={() => {
              dispatch(setButtonPage("Ziswaf"));
              setMenuVisible(false);
            }}
            className={`${
              buttonPage === "Ziswaf"
                ? "text-primary border-b-2 border-primary w-full"
                : ""
            } hover:scale-105 duration-150 font-semibold text-gray-600`}
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
                ? "text-primary border-b-2 border-primary w-full"
                : ""
            } hover:scale-105 duration-150 font-semibold text-gray-600`}
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
                ? "text-primary border-b-2 border-primary w-full"
                : ""
            } hover:scale-105 duration-150 font-semibold text-gray-600`}
          >
            Berita
          </Link>
          <ClickAwayListener onClickAway={() => setDropdownPMVisible(false)}>
            <Box className="overflow-hidden">
              <button
                onClick={() => setDropdownPMVisible(!isDropdownPMVisible)}
                className="flex items-center text-center gap-1 hover:scale-105 duration-150 font-semibold text-gray-600"
              >
                Profile <BsArrowDown />
              </button>
              {isDropdownPMVisible ? (
                <Box className="p-2 space-y-3 flex flex-col">
                  {dataProfile.map((item) => (
                    <button
                      onClick={() => {
                        navigate(`/penjelasan/${item.code}`);
                        setMenuVisible(false);
                      }}
                      key={item.id}
                      className="text-left hover:scale-105 duration-150 text-sm sm:text-base text-gray-600"
                    >
                      {item.name}
                    </button>
                  ))}
                </Box>
              ) : null}
            </Box>
          </ClickAwayListener>
          <ClickAwayListener onClickAway={() => setDropdownLMVisible(false)}>
            <Box>
              <button
                onClick={() => {
                  setDropdownLMVisible(!isDropdownLMVisible);
                }}
                className="flex items-center gap-1 hover:scale-105 duration-150 font-semibold text-gray-600"
              >
                Layanan <BsArrowDown />
              </button>
              {isDropdownLMVisible ? (
                <Box className=" p-2 space-y-3 flex flex-col">
                  {dataLayanan.map((item) => (
                    <button
                      onClick={() => {
                        navigate(`/penjelasan/${item.code}`);
                        setMenuVisible(false);
                      }}
                      key={item.id}
                      className="text-left hover:scale-105 duration-150 text-sm sm:text-base text-gray-600"
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
          <div className="xl:hidden space-y-2 w-full mt-6">
            <Link to={"/profile"}>
              <button className="gap-2 w-full flex items-center bg-primary p-1 text-white gap-1 hover:scale-105 rounded duration-150 font-semibold text-gray-600">
                <BiUser className="text-2xl" />
                <p className="line-clamp-1 text-left">{user?.username}</p>
              </button>
            </Link>
            <button
              onClick={() => dispatch(logout())}
              className="hover:scale-105 duration-150 font-semibold w-full text-left text-white bg-red-700 p-1 rounded px-4"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="xl:hidden space-y-2 w-full mt-6">
            <button
              onClick={() => dispatch(setModalLogin(true))}
              className="rounded-md flex items-center border-2 text-primary border-primary gap-1 hover:scale-105 duration-150 font-semibold text-gray-600 w-full"
            >
              <BiUser className="text-2xl text-primary" />
              <p>Masuk</p>
            </button>
            <button
              onClick={() => dispatch(setModalRegister(true))}
              className="hover:scale-105 duration-150 font-semibold text-left text-white bg-primary p-1 rounded w-full px-4"
            >
              Daftar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
