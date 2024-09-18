import { Link, useParams } from "react-router-dom";
import Footer from "../../components/navbar&footer/Footer";
import Target from "../../components/card/Target";
import { CiShare1 } from "react-icons/ci";
import { useEffect, useState } from "react";
import distribution from "./distribution";
import Card from "../../components/card/Card";
import location from "../../assets/location.svg";
import image0 from "../../assets/image0.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCampaign,
  getDetailCampaign,
} from "../../redux/actions/campaignAction";
import { setButtonPage } from "../../redux/reducers/pageReducer";

export default function CampaignDetail() {
  const { id } = useParams();
  const { allCampaign } = useSelector((state) => state.campaign);
  const { detailCampaign } = useSelector((state) => state.campaign);
  const [button, setButton] = useState("Detail");
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      window.scrollTo(0, 0);
      dispatch(getDetailCampaign(id));
      dispatch(getAllCampaign(0));
    }
    dispatch(setButtonPage("detailCampaign"));
  }, [id, dispatch]);

  if (!detailCampaign) {
    return <div>Campaign not found</div>;
  }

  const formatNumber = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };
  const handleShareLink = () => {
    if (navigator.share) {
      navigator
        .share({
          title: document.title,
          url: `https://ruangberbagi.org/lazismu/detailCampaign/${detailCampaign?.campaignCode}`,
        })
        .then(() => console.log("Berbagi berhasil"))
        .catch((error) => console.error("Kesalahan saat berbagi:", error));
    } else {
      alert("Maaf, fitur berbagi tidak didukung di perangkat Anda.");
    }
  };

  return (
    <div>
      {/* content */}
      <div className="font-Inter">
        <div className="pb-4 border-b-2 border-gray-200">
          <div className="flex-none md:flex justify-between xl:px-20 lg:px-10  sm:mt-10 sm:px-5 font-Inter xl:gap-8 md:gap-5 gap-3">
            <div className="md:w-1/2 w-full p-8">
              <img
                src={detailCampaign?.campaignImage}
                className="w-full rounded-3xl"
                alt=""
              />
            </div>
            <div className="md:w-3/6 w-full px-4 md:px-0">
              <p className="mt-3 md:mt-0 font-bold lg:text-4xl md:text-3xl xl:text-5xl text-2xl text-gray-600 text-center md:text-end">
                Salurkan Donasi Kamu Dengan Mudah
              </p>
              <div className="flex flex-wrap gap-4 md:pl-5 mt-2">
                <div className="md:text-base text-sm flex gap-2 items-center">
                  <p>Kategori</p>
                  <p className="bg-fourth text-white px-2 rounded-3xl text-xs font-semibold">
                    {detailCampaign?.campaignCategory}
                  </p>
                </div>
                <div className="flex gap-1 items-end">
                  <img src={location} className="w-4 md:w-6" alt="" />
                  <p className="md:text-base text-sm">
                    {detailCampaign?.location}
                  </p>
                </div>
              </div>
              {/*  */}
              <div className="flex flex-wrap justify-between mt-1 sm:mt-3 md:pl-5 ">
                <div>
                  <p className="text-gray-600 text-sm md:text-base lg:text-lg">
                    Terkumpul
                  </p>
                  <p className="text-fourth md:text-lg text-sm md:text-base lg:text-xl font-semibold">
                    Rp {formatNumber(detailCampaign?.currentAmount || 0)}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm md:text-base lg:text-lg">
                    Dana Dibutuhkan
                  </p>
                  <p className="text-gray-800 md:text-lg text-sm md:text-base lg:text-xl font-semibold">
                    Rp {formatNumber(detailCampaign?.targetAmount || 0)}
                  </p>
                </div>
              </div>
              {/* target */}
              <div className="md:pl-5 lg:mt-2 mt-1">
                <Target
                  targetAmount={detailCampaign?.targetAmount}
                  amountCampaign={detailCampaign?.currentAmount}
                />
              </div>
              {/*  */}
              <div className="flex gap-3 md:justify-between items-center md:pl-5 mt-3">
                <p className="text-gray-600 text-sm md:text-base lg:text-lg">
                  Sisa Waktu :
                </p>
                <p className="text-gray-600 text-sm md:text-base lg:text-lg">
                  {detailCampaign?.startDate} Sampai {detailCampaign?.endDate}
                </p>
              </div>
              {/*  */}
              <div className="flex flex-wrap items-center gap-2 lg:gap-3 md:pl-5 mt-1">
                <p className="text-gray-600 md:text-base text-sm lg:text-lg">
                  Bagikan Campaign
                </p>
                <div className="flex gap-1">
                  <button
                    onClick={handleShareLink}
                    className="text-sm lg:text-lg items-center hover:scale-110 flex gap-2 border-2 border-fourth px-1 rounded-lg font-semibold text-fourth"
                  >
                    Share <CiShare1 />
                  </button>
                </div>
              </div>
              {/*  */}
              <div className="w-full md:pl-5 mt-5">
                <Link to={`/pembayaranCampaign/${detailCampaign?.campaignId}`}>
                  <button className="w-full bg-fourth font-bold md:text-base text-sm md:text-base lg:text-lg rounded-sm md:rounded-full text-white p-1 lg:p-2 hover:translate-y-[-5px] duration-300">
                    Donasi Sekarang
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* button */}
        <div className="mt-4 flex gap-5 justify-center p-1 bg-white">
          <button
            onClick={() => setButton("Detail")}
            className={`${
              button == "Detail"
                ? " sm:border-2 border-primary sm:bg-primary text-primary underline underline-offset-8 sm:text-white rounded-full px-6"
                : "text-primary sm:border-2 border-primary px-6 rounded-full hover:translate-y-[-5px] duration-500"
            } font-bold text-xl`}
          >
            Detail
          </button>
          <button
            onClick={() => {
              setButton("Update");
            }}
            className={`${
              button == "Update"
                ? " sm:border-2 border-primary sm:bg-primary text-primary underline underline-offset-8 sm:text-white rounded-full px-6"
                : "text-primary sm:border-2 border-primary px-6 rounded-full hover:translate-y-[-5px] duration-500"
            } font-bold text-xl`}
          >
            Update
          </button>
          <button
            onClick={() => {
              setButton("Donatur");
            }}
            className={`${
              button == "Donatur"
                ? " sm:border-2 border-primary sm:bg-primary text-primary underline underline-offset-8 sm:text-white rounded-full px-6"
                : "text-primary sm:border-2 border-primary px-6 rounded-full hover:translate-y-[-5px] duration-500"
            } font-bold text-xl`}
          >
            Donatur
          </button>
        </div>
        {/* 3 button */}
        {button == "Detail" && (
          <div className="sm:flex my-2 sm:my-5 justify-center sm:px-20">
            <div className="flex flex-col gap-2 lg:gap-2 text-Inter lg:text-lg md:text-base text-xs text-NEUTRAL04 w-[100%] md:w-5/6 bg-white ring-NEUTRAL04 drop-shadow-lg p-5 sm:px-10 text-justify rounded-3xl">
              <h3>{detailCampaign?.description}</h3>
              <p className="font-bold">Dapat disalurkan dengan cara :</p>
              <ul>
                <h3 className="font-semibold text-gray-900">
                  1. {`Klik tombol "Donasi Sekarang"`}
                </h3>
                <h3 className="font-semibold text-gray-900">
                  2. Masukkan nominal donasi
                </h3>
                <h3 className="font-semibold text-gray-900">
                  3. Isi data diri
                </h3>
                <h3 className="font-semibold text-gray-900">
                  4. Pilih metode pembayaran
                </h3>
                <h3 className="font-semibold text-gray-900">
                  5.{" "}
                  {` Klik "Lanjutkan Pembayaran" dan ikuti langkah selanjutnya`}
                </h3>
                <h3 className="font-semibold text-gray-900">
                  6. Dapatkan laporan via email
                </h3>
              </ul>
            </div>
          </div>
        )}
        {button == "Update" && (
          <>
            {distribution.length > 0 ? (
              <div className="flex flex-col items-center gap-4 mt-10 mx-4">
                {distribution.map((item) => (
                  <div
                    className="flex justify-between w-full max-w-2xl gap-5 bg-white shadow-lg rounded border-2 border-gray-200 p-2"
                    key={item.id}
                  >
                    <img src={item.image} className="w-[100%]" alt="" />
                    <div className="w-full">
                      <h1 className="text-end font-bold text-gray-600 text-xs sm:text-base">
                        {item.distributionDate}
                      </h1>
                      <h1 className="font-bold text-sm sm:text-base">
                        {item.description}
                      </h1>
                      Kepada :
                      <h1 className="text-primary font-bold text-sm sm:text-base">
                        {item.receiver}
                      </h1>
                      Sebesar :
                      <h1 className="text-primary font-bold text-sm sm:text-base">
                        Rp {formatNumber(item.distributionAmount)}
                      </h1>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex justify-center mt-4">
                <img src={image0} alt="" className="w-2/6" />
              </div>
            )}
          </>
        )}
      </div>
      <div className="px-2 md:px-10 lg:px-20 bg-white py-2">
        <div className="flex flex-col text-center sm:gap-3">
          <p className=" md:text-3xl xl:text-5xl text-2xl font-Montserrat font-bold text-fourth">
            Bantu Mereka
          </p>
          <div className="md:text-xl xl:text-3xl text-base">
            <p>Mereka butuh uluran tangan kita.</p>
            <p>Sedikit bantuan kita sangat berarti bagi mereka</p>
          </div>
        </div>
        <div className="flex justify-between items-end text-xl font-Inter sm:text-2xl font-bold my-2 sm:my-3">
          Campaign Populer
          <Link
            to={`/daftarCampaign/Campaign/1`}
            className="text-xs text-primary -500 sm:text-base"
          >
            Lihat semua
          </Link>
        </div>
        <div className="justify-between grid md:grid-cols-3 grid-cols-2 mb-8 md:gap-6 sm:gap-5 gap-y-2">
          {allCampaign.slice(0, 6).map((item) => (
            <Card key={item.campaignName} item={item} />
          ))}
        </div>
        {/* category */}
      </div>
      {/* footer */}
      <div>
        <Footer />
      </div>
    </div>
  );
}
