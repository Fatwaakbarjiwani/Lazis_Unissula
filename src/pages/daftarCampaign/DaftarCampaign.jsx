import Card from "../../components/card/Card";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setButtonPage } from "../../redux/reducers/pageReducer";
import {
  getAllCampaign,
  getAllCampaignCategory,
  getCampaignByCategory,
} from "../../redux/actions/campaignAction";
import Footer from "../../components/navbar&footer/Footer";
import { BsArrowDown } from "react-icons/bs";
import { Commet } from "react-loading-indicators";
import { Pagination } from "@mui/material";

export default function DaftarCampaign() {
  const { page } = useParams();
  const { number } = useParams();
  const { allCampaign } = useSelector((state) => state.campaign);
  const { allCampaignCategory } = useSelector((state) => state.campaign);
  const { totalPageNumber } = useSelector((state) => state.campaign);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setButtonPage(page));
    setIsLoading(true);
    window.scrollTo(0, 0);
    if (selectedCategory == null || selectedCategory === "All Category") {
      dispatch(getAllCampaign(parseInt(number, 10) - 1)).finally(() =>
        setIsLoading(false)
      );
    } else {
      dispatch(
        getCampaignByCategory(selectedCategory, parseInt(number, 10) - 1)
      ).finally(() => setIsLoading(false));
    }
    dispatch(getAllCampaignCategory());
  }, [dispatch, selectedCategory, number]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    navigate("/daftarCampaign/Campaign/1");
  };

  const handleButtonClick = () => {
    setIsVisible(!isVisible); // Tampilkan atau sembunyikan carousel
  };
  const handleButton = (event, value) => {
    event.preventDefault();
    navigate(`/daftarCampaign/Campaign/${value}`);
  };

  return (
    <div>
      <div className="px-4 sm:px-8 lg:px-[80px] py-4 sm:py-6 font-Inter">
        <div className="sm:flex items-end justify-between">
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold font-Inter text-gray-600">
              Daftar <span className="text-primary">Campaign</span>
            </h1>
            <p className="text-xs sm:text-sm lg:text-base">
              Pilih dan salurkan donasi kamu ke dalam program yang sangat
              berarti bagi mereka.
            </p>
          </div>
          {/* category */}
          {isVisible ? (
            <select
              className="mt-2 sm:mt-0 text-xs md:text-base font-semibold p-2
              bg-primary text-white text-center rounded-lg shadow
              hover:bg-primary transition-all w-full sm:w-auto"
              value={selectedCategory}
              onChange={(e) => handleCategoryClick(e.target.value)}
            >
              <option className="mx-1 sm:mx-2 p-1 border-2 border-primary text-primary text-center rounded-lg shadow hover:bg-primary transition-all hover:cursor-pointer">
                <h1 className="font-bold text-xs md:text-base">All Category</h1>
              </option>
              {allCampaignCategory?.map((item) => (
                <option key={item.id}>
                  <h1 className="font-bold text-xs md:text-base">
                    {item.campaignCategory}
                  </h1>
                </option>
              ))}
            </select>
          ) : (
            <button
              onClick={handleButtonClick}
              className="mt-2 sm:mt-0 text-xs md:text-base font-semibold p-2 bg-primary text-white text-center rounded-lg shadow hover:bg-primary transition-all w-full sm:w-auto"
            >
              {selectedCategory ? (
                selectedCategory
              ) : (
                <p className="flex items-center gap-4">
                  Pilih Kategori <BsArrowDown />
                </p>
              )}
            </button>
          )}
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-y-4 sm:gap-6 mt-2 sm:mt-8">
          {isLoading ? (
            <div className="col-span-2 lg:col-span-3 flex justify-center mt-4">
              <div className="loader">
                <Commet
                  color="#69C53E"
                  size="medium"
                  text="Loading"
                  textColor="#69C53E"
                />
              </div>
            </div>
          ) : allCampaign.length === 0 ? (
            <div className="col-span-2 lg:col-span-3 text-center text-gray-500">
              Campaign dengan kategori ini tidak tersedia.
            </div>
          ) : (
            allCampaign.map((item) => (
              <Card key={item.campaignCode} item={item} h={"h-full"} />
            ))
          )}
        </div>
        {totalPageNumber > 1 && (
          <div className="flex justify-center mt-8">
            <Pagination
              count={totalPageNumber}
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
      </div>
      <Footer />
    </div>
  );
}
