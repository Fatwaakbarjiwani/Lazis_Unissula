import { useEffect, useState } from "react";
import search from "../../assets/search.svg";
import { FaChevronDown } from "react-icons/fa";
import CardBerita from "../../components/card/CardBerita";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setButtonPage } from "../../redux/reducers/pageReducer";
import Footer from "../../components/navbar&footer/Footer";
import {
  getAllBerita,
  getCategoryBerita,
  getSearchBerita,
  getTopBerita,
} from "../../redux/actions/beritaAction";
import { Pagination } from "@mui/material";
import { Commet } from "react-loading-indicators";
import Carousel from "react-multi-carousel";
import { responsive4 } from "../../components/data/Responsive";

export default function Berita() {
  const [topic, setTopic] = useState("");
  const [searchNews, setSearchNews] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingData, setLoadingData] = useState(false);
  const { page } = useParams();
  const { number } = useParams();
  const { allBerita } = useSelector((state) => state.berita);
  const { topBerita } = useSelector((state) => state.berita);
  const { categoryBerita } = useSelector((state) => state.berita);
  const { totalPageNumberBerita } = useSelector((state) => state.berita);
  const [choseTopic, setChoseTopic] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setShowDropdown((prevState) => !prevState);
  };

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };
  const handleButton = (event, value) => {
    event.preventDefault();
    navigate(`/berita/Berita/${value}`);
  };

  useEffect(() => {
    dispatch(setButtonPage(page));
    dispatch(getTopBerita());
    setLoadingData(true);
    {
      searchNews || topic
        ? dispatch(
            getSearchBerita(searchNews, topic, parseInt(number, 10) - 1)
          ).finally(() => setLoadingData(false))
        : dispatch(getAllBerita(parseInt(number, 10) - 1)).finally(() =>
            setLoadingData(false)
          );
      setTimeout(() => {
        setLoading(false);
      }, [1000]);
    }
    dispatch(getCategoryBerita());
  }, [dispatch, searchNews, topic]);

  return (
    <div>
      {loading ? (
        <div className="col-span-2 lg:col-span-3 flex justify-center mt-8">
          <div className="loader">
            <Commet
              color="#69C53E"
              size="medium"
              text="Loading"
              textColor="#69C53E"
            />
          </div>
        </div>
      ) : (
        <div>
          <Carousel
            responsive={responsive4}
            arrows={false}
            autoPlay={true}
            autoPlaySpeed={3000}
            showDots={false}
            infinite={true}
          >
            {topBerita?.slice(0, 5).map((item) => (
              <Link
                to={`/detailBerita/${item?.id}`}
                key={item?.id}
                className="h-[50vh] sm:h-[60vh] md:h-[70vh] relative flex items-end"
                style={{
                  backgroundImage: `url(${item?.newsImage})`,
                  backgroundRepeat: "no-repeat",
                  width: "100%",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute bottom-0 bg-gradient-to-t from-black via-black/30 to-transparent h-[50vh] w-full"></div>
                <h1 className="relative font-bold text-white text-2xl sm:text-3xl md:text-4xl mb-10 sm:mb-16 md:mb-20 mx-6 sm:mx-12 md:mx-20">
                  <p className="relative z-40">{item?.title}</p>
                  <div className="z-0 absolute top-0 w-3/6 sm:w-2/6 h-8 sm:h-10 bg-gradient-to-r from-primary to-transparent"></div>
                </h1>
              </Link>
            ))}
          </Carousel>

          <div className="mx-4 sm:mx-8 md:mx-20 mt-4">
            <div className="shadow border-2 border-gray-300 rounded-xl flex px-4 sm:px-8">
              <img src={search} alt="search icon" className="w-4 sm:w-6" />
              <input
                type="text"
                className="w-full p-2 sm:p-1 outline-none text-sm sm:text-base"
                placeholder="Cari Berita"
                value={searchNews}
                onChange={(e) => setSearchNews(e.target.value)}
              />
            </div>
          </div>

          <div className="py-5 px-4 sm:px-8 lg:px-[80px]">
            <div className="flex flex-wrap justify-between items-center font-Inter font-semibold text-base sm:text-lg md:text-xl">
              {/* Dropdown for smaller screens */}
              <div className="sm:hidden relative w-full">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center justify-between text-gray-600 hover:text-primary hover:underline"
                >
                  {topic || "Semua"} <FaChevronDown />
                </button>
                {showDropdown && (
                  <div className="absolute z-10 top-full mt-1 bg-white w-full shadow-lg rounded-md">
                    <button
                      onClick={() => {
                        setTopic(null);
                        toggleDropdown();
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Semua
                    </button>

                    {categoryBerita.map((item) => (
                      <button
                        key={item?.id}
                        onClick={() => {
                          setTopic(item?.newsTopic);
                          toggleDropdown();
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        {item?.newsTopic}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Categories for larger screens */}
              <div className="hidden sm:flex flex-row justify-center gap-4 md:gap-6 w-full">
                <div className="flex gap-4 md:gap-6">
                  <button
                    onClick={() => {
                      setTopic(null);
                      navigate("/berita/Berita/1");
                    }}
                    className={`${
                      topic == null
                        ? "text-primary underline underline-offset-4"
                        : "text-gray-600"
                    } hover:text-primary hover:underline`}
                  >
                    Semua
                  </button>
                  {categoryBerita.slice(0, 2).map((item) => (
                    <button
                      key={item?.id}
                      onClick={() => {
                        setTopic(item?.newsTopic);
                        navigate("/berita/Berita/1");
                      }}
                      className={`${
                        topic === item?.newsTopic
                          ? "text-primary underline underline-offset-4"
                          : "text-gray-600"
                      } hover:text-primary hover:underline`}
                    >
                      {item?.newsTopic}
                    </button>
                  ))}
                </div>

                {categoryBerita.length > 2 && (
                  <div className="relative">
                    <button
                      onClick={handleDropdownToggle}
                      className="text-gray-600 hover:scale-105 duration-300 hover:underline bg-primary text-white p-1 rounded px-4"
                    >
                      {choseTopic ? choseTopic : "Lainnya"}
                    </button>
                    {showDropdown && (
                      <div className="absolute z-30 left-0 mt-2 bg-white border border-gray-300 rounded-md shadow-lg">
                        {categoryBerita.slice(2).map((item) => (
                          <button
                            key={item?.id}
                            onClick={() => {
                              setTopic(item?.newsTopic);
                              setChoseTopic(item?.newsTopic);
                              setShowDropdown(false);
                              navigate("/berita/Berita/1");
                            }}
                            className={`block w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-100 ${
                              topic === item?.newsTopic ? "text-primary" : ""
                            }`}
                          >
                            {item?.newsTopic}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            {loadingData ? (
              <div className="col-span-2 lg:col-span-3 flex justify-center mt-8">
                <div className="loader">
                  <Commet
                    color="#69C53E"
                    size="medium"
                    text="Loading"
                    textColor="#69C53E"
                  />
                </div>
              </div>
            ) : allBerita.length === 0 ? (
              <div className="col-span-2 lg:col-span-3 text-center text-gray-500 mt-4">
                Berita dengan kategori ini tidak tersedia.
              </div>
            ) : (
              <>
                {/* Card Grid */}
                <div className="grid grid-cols-2  sm:grid-cols-2 gap-2 md:gap-6 mt-4 sm:mt-8">
                  {allBerita.map((item) => (
                    <Link to={`/detailBerita/${item?.id}`} key={item?.id}>
                      <CardBerita
                        image={item?.newsImage}
                        judul={item?.title}
                        tanggal={item?.date}
                        content={item?.content}
                      />
                    </Link>
                  ))}
                </div>
                {totalPageNumberBerita > 1 && (
                  <div className="flex justify-center mt-8">
                    <Pagination
                      count={totalPageNumberBerita}
                      variant="outlined"
                      shape="rounded"
                      page={parseInt(number, 10)}
                      onChange={handleButton}
                      sx={{
                        "& .MuiPaginationItem-root": {
                          color: "green",
                          borderColor: "green",
                        },
                        "& .Mui-selected": {
                          backgroundColor: "#69C53E !important",
                          color: "white",
                        },
                      }}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
