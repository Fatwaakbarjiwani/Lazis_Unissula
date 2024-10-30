import { useEffect, useState } from "react";
import bunga from "../../assets/bunga.svg";
import donasi from "../../assets/donasi.svg";
import { Link, useParams } from "react-router-dom";
import Footer from "../../components/navbar&footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { setButtonPage } from "../../redux/reducers/pageReducer";
import { getCategoryZiswaf } from "../../redux/actions/ziswafAction";
import Information2 from "../../components/bar/Information2";
import { Commet } from "react-loading-indicators";
import { BiCategory } from "react-icons/bi";

export default function Ziswaf() {
  const [button, setButton] = useState("zakat");
  const { page } = useParams();
  const { categoryZiswaf } = useSelector((state) => state.ziswaf);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const handleButton = (value) => {
    setButton(value);
    setIsLoading(true);
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
    setIsLoading(true);
    dispatch(getCategoryZiswaf(button)).finally(() => setIsLoading(false));
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
          <div className="border-y-8 sm:border-y-0 py-2 sm:py-0 border-gray-50 flex flex-col sm:flex-row justify-between gap-4 items-center">
            <img
              className="w-1/2 sm:w-1/2 h-[50vh] object-cover rounded-2xl bg-black"
              src={bunga}
              alt="Bunga"
            />
            <div className="w-full sm:w-3/6">
              <div className="text-center sm:text-right text-3xl sm:text-5xl font-bold text-gray-600">
                <h2>{getTitle()}</h2>
                <h2>kamu dengan mudah</h2>
              </div>
              {isLoading ? (
                <div className="mt-4">
                  <div className="loader">
                    <Commet
                      color="#69C53E"
                      size="small"
                      text="Loading"
                      textColor="#69C53E"
                    />
                  </div>
                </div>
              ) : (
                <div className="mt-4 flex flex-wrap gap-2 text-nowrap justify-end">
                  {categoryZiswaf.map((item, id) => (
                    <button
                      key={id}
                      className="hover:scale-105 duration-150 flex gap-2 items-center border bg-white border-primary rounded-xl p-2 drop-shadow-md text-lg text-gray-600 font-Inter"
                    >
                      <BiCategory />
                      {item.categoryName}
                    </button>
                  ))}
                </div>
              )}
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
