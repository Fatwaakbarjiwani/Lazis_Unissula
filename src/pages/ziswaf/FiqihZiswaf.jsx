import { useEffect, useState } from "react";
import bunga from "../../assets/bunga.svg";
import donasi from "../../assets/donasi.svg";
import { Link, useParams } from "react-router-dom";
import Footer from "../../components/navbar&footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { setButtonPage } from "../../redux/reducers/pageReducer";
import { getCategoryZiswaf } from "../../redux/actions/ziswafAction";
import Information2 from "../../components/bar/Information2";

export default function Ziswaf() {
  const [button, setButton] = useState("zakat");
  const [click, setClick] = useState(false);
  const [biaya, setBiaya] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const { page } = useParams();
  const { categoryZiswaf } = useSelector((state) => state.ziswaf);

  const dispatch = useDispatch();

  const handleButton = (value) => {
    setButton(value);
    setClick(false);
  };

  const formatNumber = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handleNominalChange = (e) => {
    let inputValue = e.target.value.replace(/[^\d]/g, "");
    inputValue = inputValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    setBiaya(formatNumber(inputValue));
  };

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    setClick(false);
  };

  const getTitle = () => {
    switch (button) {
      case "zakat":
        return "Salurkan Zakat";
      case "infak":
        return "Salurkan Infak/Sedekah";
      case "dskl":
        return "Salurkan DSKL";
      case "wakaf":
        return "Salurkan Wakaf";
      default:
        return "";
    }
  };

  useEffect(() => {
    if (page) {
      dispatch(setButtonPage(page));
    }
    dispatch(getCategoryZiswaf(button));
  }, [page, dispatch, button]);

  return (
    <div>
      <div className="px-4 sm:px-8 lg:px-[80px]">
        <div className="grid grid-cols-2 sm:flex gap-3 sm:gap-5 justify-center items-center py-4 sm:py-6">
          {["zakat", "infak", "dskl", "wakaf"].map((item) => (
            <button
              key={item}
              onClick={() => {
                handleButton(item);
                setSelectedCategory("");
              }}
              className={`py-1 px-3 sm:px-5 border sm:border-2 border-primary rounded sm:rounded-full shadow-md text-gray-600 font-semibold text-xs sm:text-base hover:bg-green-700 hover:text-white hover:border-green-700 ${
                button === item
                  ? "bg-primary text-white"
                  : "bg-white text-gray-600"
              }`}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </button>
          ))}
        </div>

        <div className="text-center text-lg sm:text-xl font-semibold">
          <div className="border-y-8 sm:border-y-0 py-2 sm:py-0 border-gray-50 flex flex-col sm:flex-row justify-between gap-4 sm:gap-12 items-center">
            <img className="w-1/2 sm:w-1/3" src={bunga} alt="Bunga" />
            <div className="w-full sm:w-3/6">
              <div className="text-center sm:text-right text-3xl sm:text-5xl font-bold text-gray-600">
                <h2>{getTitle()}</h2>
                <h2>kamu dengan mudah</h2>
              </div>

              <div className="flex items-center space-x-2 mt-4 justify-center sm:justify-start">
                <span className="text-base sm:text-lg font-Inter text-[#3B3B3B]">
                  Kategori
                </span>
                {click === false ? (
                  <button
                    className="bg-red-600 text-sm sm:text-base text-white font-semibold px-3 py-2 rounded sm:rounded-full shadow-lg"
                    onClick={() => setClick(true)}
                  >
                    {selectedCategory ? selectedCategory : `Kategori ${button}`}
                  </button>
                ) : (
                  <select
                    className="bg-red-600 text-white font-semibold px-3 py-1 rounded-full shadow-lg"
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    value={selectedCategory}
                  >
                    {categoryZiswaf.map((item) => (
                      <option key={item?.id} value={item?.categoryName}>
                        {item?.categoryName}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              <div className="w-full flex items-center my-4 shadow ring-1 ring-gray-300 rounded-xl">
                <p className="p-3 ring-1 ring-gray-300 rounded-s-xl">Rp</p>
                <input
                  type="text"
                  className="w-full focus:outline-none text-xl m-2"
                  value={biaya}
                  onChange={handleNominalChange}
                />
              </div>

              <div className="flex justify-center sm:justify-start">
                <button className="py-2 px-4 bg-red-700 text-white rounded-lg sm:rounded-full w-full sm:w-auto hover:scale-105 transition-transform">
                  Bayar Sekarang
                </button>
              </div>
            </div>
          </div>

          <Information2 />
          <div className="text-left mt-8 sm:w-1/2">
            <h1 className="text-3xl sm:text-5xl font-bold mb-4 text-gray-600">
              Lihat penjelasan tentang fiqih ziswaf
            </h1>
            <Link to={`/penjelasan/${button}`}>
              <button className=" bg-red-700 text-white font-bold px-5 py-2 rounded-lg sm:rounded-full hover:scale-105 transition-transform">
                Lihat Selengkapnya
              </button>
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6 my-8">
            <div className="w-full sm:w-4/6 text-center sm:text-start">
              <h1 className="text-3xl sm:text-5xl font-bold text-gray-600">
                Salurkan donasi kamu dengan mudah
              </h1>
              <p className="text-gray-600 font-bold text-sm sm:text-base lg:text-lg xl:w-3/4 mt-4">
                Dengan berkontribusi, Anda akan membantu menyediakan sumber daya
                penting kepada mereka yang sangat membutuhkannya.
              </p>
              <Link to="/daftarCampaign/Campaign/1">
                <button className="bg-red-700 text-white font-bold px-5 py-1 mt-2 rounded-lg sm:rounded-full hover:scale-105">
                  Donasi Sekarang
                </button>
              </Link>
            </div>
            <img className="w-2/3 sm:w-1/3" src={donasi} alt="Donasi" />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
