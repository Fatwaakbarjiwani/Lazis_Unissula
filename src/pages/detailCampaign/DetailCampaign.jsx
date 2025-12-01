import { Link, useParams } from "react-router-dom";
import Footer from "../../components/navbar&footer/Footer";
import Target from "../../components/card/Target";
import { CiShare1 } from "react-icons/ci";
import { useEffect, useState } from "react";
import Card from "../../components/card/Card";
import location from "../../assets/location.svg";
import image0 from "../../assets/image0.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCampaign,
  getDetailCampaign,
  getDistribusiCampaign,
  getRincian,
  getTransactionCampaign,
} from "../../redux/actions/campaignAction";
import { setButtonPage } from "../../redux/reducers/pageReducer";
import { Pagination } from "@mui/material";
import Skeleton from "react-loading-skeleton";
// import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

export default function CampaignDetail() {
  const { id } = useParams();
  const { campaignName } = useParams();
  const { rincian } = useSelector((state) => state.campaign);
  const { allCampaign } = useSelector((state) => state.campaign);
  const { totalPageNumberMessage } = useSelector((state) => state.campaign);
  const { donatur } = useSelector((state) => state.campaign);
  const { detailCampaign } = useSelector((state) => state.campaign);
  const { distribution } = useSelector((state) => state.campaign);
  const [page, setPage] = useState(1);
  const [button, setButton] = useState("Detail");
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  // const [dropdown, setDropdown] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (id) {
      dispatch(getDetailCampaign(id)).then(() => setLoading(false));
      dispatch(getAllCampaign(0));
      dispatch(getTransactionCampaign(id, page - 1));
      dispatch(getDistribusiCampaign(id));
      dispatch(getRincian(id));
    }
    dispatch(setButtonPage("detailCampaign"));
  }, [id, dispatch, page]);
  useEffect(() => {
    if (id) {
      window.scrollTo(0, 0);
    }
  }, [id]);

  if (!detailCampaign) {
    return <div>Campaign not found</div>;
  }

  const formatNumber = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handleShareLink = async () => {
    const shareUrl = `https://lazis-sa.org/detailCampaign/${campaignName}/${id}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          url: shareUrl,
        });
        console.log("Berbagi berhasil");
      } catch (error) {
        console.error("Kesalahan saat berbagi:", error);
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareUrl);
        Swal.fire({
          icon: "success",
          title: "Tautan Disalin",
          text: "Tautan berhasil disalin ke clipboard",
          timer: 3000,
          timerProgressBar: true,
          showConfirmButton: false,
          toast: true,
          position: "top-end",
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: "Gagal menyalin tautan ke clipboard.",
          timer: 3000,
          timerProgressBar: true,
          showConfirmButton: false,
          toast: true,
          position: "top-end",
        });
      }
    }
  };

  const handleButton = (event, value) => {
    event.preventDefault();
    setPage(value);
  };

  return (
    <div>
      <Helmet>
        <title>{detailCampaign?.campaignName}</title>
        <meta property="og:title" content={detailCampaign?.campaignName} />
        <meta property="og:description" content={detailCampaign?.description} />
        <meta property="og:image" content={detailCampaign?.campaignImage} />
        <meta
          property="og:url"
          content={`https://lazis-sa.org/detailCampaign/${campaignName}/${id}`}
        />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={detailCampaign?.campaignName} />
        <meta
          name="twitter:description"
          content={detailCampaign?.description}
        />
        <meta name="twitter:image" content={detailCampaign?.campaignImage} />
      </Helmet>
      {/* content */}
      <div className="font-Inter">
        <div className="pb-4 border-b-2 border-gray-200">
          <div className="flex-none md:flex justify-between items-center xl:px-20 lg:px-10  sm:mt-4 sm:px-5 font-Inter xl:gap-8 md:gap-5 gap-2">
            <div className="md:w-[500px] w-full p-2 sm:p-0">
              {loading ? (
                <Skeleton height={300} direction="ltr" enableAnimation={true} />
              ) : (
                <img
                  src={detailCampaign?.campaignImage}
                  className="w-full object-contain rounded md:rounded-3xl h-auto"
                  alt=""
                />
              )}
            </div>
            <div className="md:w-3/6 w-full px-2 md:px-0">
              {loading ? (
                <Skeleton count={2} height={50} />
              ) : (
                <p className="font-bold md:font-bold lg:text-4xl md:text-3xl xl:text-5xl text-3xl text-gray-600 text-left md:text-end">
                  Salurkan Donasi Kamu Dengan Mudah
                </p>
              )}
              {loading ? (
                <Skeleton width={300} />
              ) : (
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
              )}
              {/*  */}
              {loading ? (
                <Skeleton count={4} height={30} />
              ) : (
                <>
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
                      {detailCampaign?.startDate} Sampai{" "}
                      {detailCampaign?.endDate}
                    </p>
                  </div>
                  {/*  */}
                </>
              )}
              {loading ? (
                <Skeleton width={300} />
              ) : (
                <div className="flex flex-wrap items-center gap-2 lg:gap-3 md:pl-5 mt-1">
                  <p className="text-gray-600 md:text-base text-sm lg:text-lg">
                    Bagikan Campaign
                  </p>
                  <div className="flex gap-1">
                    <button
                      onClick={handleShareLink}
                      className="text-sm lg:text-lg items-center hover:scale-110 flex gap-2 border border-fourth px-1 rounded-lg font-semibold text-fourth"
                    >
                      Share <CiShare1 />
                    </button>
                  </div>
                </div>
              )}
              {/*  */}
              {loading ? (
                <Skeleton height={40} />
              ) : (
                <div className="w-full md:pl-5 mt-5">
                  <Link
                    to={`/pembayaranCampaign/${detailCampaign?.campaignId}`}
                  >
                    <button className="w-full bg-fourth font-bold md:text-base text-sm md:text-base lg:text-lg rounded-sm md:rounded-full text-white p-2 lg:p-2 hover:translate-y-[-5px] duration-300">
                      Donasi Sekarang
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* button */}
        {loading ? (
          <Skeleton height={300} />
        ) : (
          <>
            <div className="mt-4 flex gap-5 justify-center p-1 bg-white">
              <button
                onClick={() => setButton("Detail")}
                className={`${
                  button == "Detail"
                    ? " sm:border border-primary sm:bg-primary text-primary underline underline-offset-8 sm:text-white rounded-full px-6"
                    : "text-primary sm:border border-primary px-6 rounded-full hover:translate-y-[-5px] duration-500"
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
                    ? " sm:border border-primary sm:bg-primary text-primary underline underline-offset-8 sm:text-white rounded-full px-6"
                    : "text-primary sm:border border-primary px-6 rounded-full hover:translate-y-[-5px] duration-500"
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
                    ? " sm:border border-primary sm:bg-primary text-primary underline underline-offset-8 sm:text-white rounded-full px-6"
                    : "text-primary sm:border border-primary px-6 rounded-full hover:translate-y-[-5px] duration-500"
                } font-bold text-xl`}
              >
                Donatur
              </button>
            </div>
            {/* 3 button */}
            {button == "Detail" && (
              <div className="sm:flex my-2 sm:my-5 justify-center sm:px-20">
                <div className="flex flex-col gap-4 text-Inter lg:text-base md:text-base text-xs text-NEUTRAL04 sm:w-3/4 sm:bg-white ring-NEUTRAL04 shadow sm:drop-shadow-lg p-4 sm:px-10 text-justify sm:rounded-3xl">
                  {/* Description */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">
                      Deskripsi Campaign
                    </h3>
                    <p
                      style={{ textIndent: "20px" }}
                      className="leading-relaxed text-gray-700"
                    >
                      {detailCampaign?.description?.replace(/\n/g, " ")}
                    </p>
                  </div>

                  {/* Additional Images */}
                  {(detailCampaign?.campaignImageDesc1 ||
                    detailCampaign?.campaignImageDesc2 ||
                    detailCampaign?.campaignImageDesc3) && (
                    <div className="mt-4">
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">
                        Gambar Campaign
                      </h3>
                      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory">
                        {detailCampaign?.campaignImageDesc1 && (
                          <div className="relative group flex-shrink-0 snap-center">
                            <img
                              src={`https://skyconnect-ziswaf.ybw-sa.org/api/images/${detailCampaign.campaignImageDesc1}`}
                              alt="Gambar Campaign 1"
                              className="w-[calc(100vw-8rem)] sm:w-96 h-48 object-cover rounded-lg shadow-md group-hover:shadow-lg transition-shadow duration-300"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-lg"></div>
                          </div>
                        )}
                        {detailCampaign?.campaignImageDesc2 && (
                          <div className="relative group flex-shrink-0 snap-center">
                            <img
                              src={`https://skyconnect-ziswaf.ybw-sa.org/api/images/${detailCampaign.campaignImageDesc2}`}
                              alt="Gambar Campaign 2"
                              className="w-[calc(100vw-8rem)] sm:w-96 h-48 object-cover rounded-lg shadow-md group-hover:shadow-lg transition-shadow duration-300"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-lg"></div>
                          </div>
                        )}
                        {detailCampaign?.campaignImageDesc3 && (
                          <div className="relative group flex-shrink-0 snap-center">
                            <img
                              src={`https://skyconnect-ziswaf.ybw-sa.org/api/images/${detailCampaign.campaignImageDesc3}`}
                              alt="Gambar Campaign 3"
                              className="w-[calc(100vw-8rem)] sm:w-96 h-48 object-cover rounded-lg shadow-md group-hover:shadow-lg transition-shadow duration-300"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-lg"></div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
            {button == "Update" && (
              <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Left Section - Distribution Details */}
                  <div className="space-y-6">
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                      <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-[#69C53E] to-green-600 rounded-full flex items-center justify-center">
                          <svg
                            className="w-4 h-4 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                        </div>
                        Rincian Penyaluran Dana
                      </h1>

                      {distribution.length > 0 ? (
                        <div className="space-y-4">
                          {distribution.map((item) => (
                            <div
                              key={item.id}
                              className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-100"
                            >
                              <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                  <div className="w-3 h-3 bg-[#69C53E] rounded-full"></div>
                                  <span className="text-sm font-semibold text-gray-600 bg-white px-3 py-1 rounded-full">
                                    {item.distributionDate}
                                  </span>
                                </div>
                                <div className="text-right">
                                  <p className="text-2xl font-bold text-[#69C53E]">
                                    Rp {formatNumber(item.distributionAmount)}
                                  </p>
                                </div>
                              </div>

                              <div className="mb-4">
                                <div
                                  className="text-gray-700 leading-relaxed mb-3 prose prose-sm max-w-none prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-3 prose-strong:text-[#69C53E] prose-strong:font-semibold prose-ul:text-gray-700 prose-li:text-gray-700 prose-ol:text-gray-700 prose-li:leading-relaxed prose-li:mb-1 prose-ul:pl-4 prose-ol:pl-4 prose-ul:mb-3 prose-ol:mb-3"
                                  dangerouslySetInnerHTML={{
                                    __html: item.description,
                                  }}
                                />
                                <div className="flex items-center gap-2">
                                  <span className="text-sm text-gray-500">
                                    Kepada:
                                  </span>
                                  <span className="font-semibold text-[#69C53E]">
                                    {item.receiver}
                                  </span>
                                </div>
                              </div>

                              {item.image && (
                                <div className="mt-4">
                                  <img
                                    src={item.image}
                                    className="w-full h-auto max-h-96 object-contain bg-gray-50 rounded-lg shadow-md"
                                    alt="Bukti penyaluran"
                                    style={{ objectFit: "contain" }}
                                  />
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-12">
                          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg
                              className="w-12 h-12 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                              />
                            </svg>
                          </div>
                          <h3 className="text-lg font-semibold text-gray-600 mb-2">
                            Belum Ada Penyaluran
                          </h3>
                          <p className="text-gray-500">
                            Data penyaluran akan ditampilkan di sini
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Section - Financial Summary (Always Visible) */}
                  <div className="space-y-6">
                    {/* Total Funds Collected */}
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-r from-[#69C53E] to-green-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">
                            100%
                          </span>
                        </div>
                        <div>
                          <h2 className="text-lg font-semibold text-gray-800">
                            Dana yang sudah terkumpul
                          </h2>
                          <p className="text-2xl font-bold text-[#69C53E]">
                            Rp{" "}
                            {formatNumber(detailCampaign?.currentAmount || 0)}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4 pt-4 border-t border-gray-100">
                        {/* Fundraising Funds */}
                        <div className="bg-green-50 rounded-xl p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 bg-[#69C53E] rounded-full flex items-center justify-center">
                                <span className="text-white font-bold text-xs">
                                  {100 -
                                    rincian?.persentase?.persen_operasional ||
                                    0}
                                  %
                                </span>
                              </div>
                              <h3 className="font-semibold text-gray-800">
                                Dana Untuk Penggalangan Dana
                              </h3>
                            </div>
                            <p className="font-bold text-[#69C53E]">
                              Rp{" "}
                              {formatNumber(
                                rincian?.dana_untuk_penggalangan_dana || 0
                              )}
                            </p>
                          </div>

                          <div className="space-y-2 ml-10">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-600">
                                Biaya transaksi dan teknologi
                              </span>
                              <span className="text-sm font-medium text-gray-800">
                                Rp{" "}
                                {formatNumber(
                                  rincian?.biaya_transaksi_dan_teknologi || 0
                                )}
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-600">
                                Sudah dicairkan
                              </span>
                              <span className="text-sm font-medium text-gray-800">
                                Rp{" "}
                                {formatNumber(
                                  rincian?.dana_sudah_disalurkan || 0
                                )}
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-[#69C53E] font-medium">
                                Belum dicairkan
                              </span>
                              <span className="text-sm font-bold text-[#69C53E]">
                                Rp{" "}
                                {formatNumber(
                                  rincian?.dana_belum_disalurkan || 0
                                )}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Operational Donations */}
                        <div className="bg-blue-50 rounded-xl p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                                <span className="text-white font-bold text-xs">
                                  {rincian?.persentase?.persen_operasional || 0}
                                  %
                                </span>
                              </div>
                              <h3 className="font-semibold text-gray-800">
                                Donasi Operasional
                              </h3>
                            </div>
                          </div>

                          <div className="space-y-2 ml-10">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-[#69C53E] font-medium">
                                Sejumlah
                              </span>
                              <span className="text-sm font-bold text-[#69C53E]">
                                Rp{" "}
                                {formatNumber(rincian?.biaya_operasional || 0)}
                              </span>
                            </div>
                            <div className="mt-3 p-3 bg-white rounded-lg">
                              <p className="text-xs text-gray-600 leading-relaxed">
                                Donasi untuk operasional{" "}
                                <span className="text-[#69C53E] font-medium">
                                  Lazis Sultan Agung
                                </span>{" "}
                                agar donasi semakin aman, mudah dan transparan
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {button == "Donatur" && (
              <>
                {donatur.length > 0 ? (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10 px-2 md:px-10 lg:px-20">
                      {donatur.map((item) => (
                        <div
                          className="flex justify-start items-center w-full max-w-2xl gap-5 bg-white shadow sm:shadow-lg rounded-xl border border-gray-200 p-2"
                          key={item.id}
                        >
                          <img
                            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                            className="w-16 h-16 rounded-full object-contain object-center"
                            alt=""
                          />
                          <div className="w-full text-gray-600 space-y-[-2px]">
                            <div className="flex justify-between w-full">
                              <p className="font-bold sm:text-lg text-base">
                                {item?.username}
                              </p>
                              <p className="sm:text-base text-sm">
                                {item?.transactionDate}
                              </p>
                            </div>
                            <p>{item?.message}</p>
                            <p className="font-bold text-primary">
                              Rp {formatNumber(item?.transactionAmount)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    {totalPageNumberMessage > 1 && (
                      <div className="flex justify-center mt-8">
                        <Pagination
                          count={totalPageNumberMessage}
                          variant="outlined"
                          shape="rounded"
                          page={page}
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
                ) : (
                  <div className="flex justify-center mt-4">
                    <img src={image0} alt="" className="w-2/6" />
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
      {loading ? (
        <Skeleton height={100} />
      ) : (
        <>
          <div className="px-2 md:px-10 lg:px-20 bg-white py-8">
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
                <Card key={item.campaignName} item={item} h={"h-full"} />
              ))}
            </div>
            {/* category */}
          </div>
          {/* footer */}
          <div>
            <Footer />
          </div>
        </>
      )}
    </div>
  );
}
