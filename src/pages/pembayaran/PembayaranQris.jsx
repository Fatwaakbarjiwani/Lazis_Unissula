// import html2canvas from "html2canvas";
import { useDispatch, useSelector } from "react-redux";
import { BsArrowLeft, BsCheckCircleFill, BsClockHistory } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDetailCampaign } from "../../redux/actions/campaignAction";
import { getDetailZiswaf } from "../../redux/actions/ziswafAction";
import { getTransaction } from "../../redux/actions/transaksiAction";
import { FaSpinner } from "react-icons/fa";

export default function PembayaranQris() {
  const { nml, typePembayaran, va, billing, waktu } = useSelector(
    (state) => state.pembayaran
  );
  const { id } = useParams();
  const { detailCampaign } = useSelector((state) => state.campaign);
  const { detailZiswaf } = useSelector((state) => state.ziswaf);
  const [statusMessage, setStatusMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const nominal = new Intl.NumberFormat("id-ID", {
    style: "decimal",
  }).format(nml);
  const formattedDate = waktu;

  // const downloadQR = async () => {
  //   const qrElement = document.getElementById("qr-section");
  //   const canvas = await html2canvas(qrElement, { scale: 2 });
  //   const pngUrl = canvas
  //     .toDataURL("image/png")
  //     .replace("image/png", "image/octet-stream");
  //   const downloadLink = document.createElement("a");
  //   downloadLink.href = pngUrl;
  //   downloadLink.download = "qris_with_details.png";
  //   document.body.appendChild(downloadLink);
  //   downloadLink.click();
  //   document.body.removeChild(downloadLink);
  // };

  useEffect(() => {
    if (typePembayaran === "campaign" && id) {
      dispatch(getDetailCampaign(id));
    }
    if (typePembayaran !== "campaign" && id) {
      dispatch(getDetailZiswaf(typePembayaran, id));
    }
    // dispatch(getQr());
    dispatch(getTransaction(va));
  }, [dispatch, typePembayaran, id]);

  const checkStatus = async () => {
    setIsLoading(true);
    try {
      await dispatch(getTransaction(va));
      const paymentStatus = billing["response_code"];
      if (paymentStatus === "01") {
        setStatusMessage("Pembayaran berhasil! Terima kasih.");
      } else if (paymentStatus === "00") {
        setStatusMessage(
          "Pembayaran belum selesai. Silakan cek kembali nanti."
        );
      } else {
        setStatusMessage("Terjadi kesalahan. Silakan cek kembali nanti.");
      }
    } catch (error) {
      setStatusMessage("Terjadi kesalahan saat memeriksa status pembayaran.");
    } finally {
      setIsLoading(false); // Selesai loading
    }
  };
  return (
    <div className="min-h-screen bg-white flex justify-center items-center sm:px-4 sm:py-8">
      <div className="bg-gray-50 rounded-xl shadow-lg max-w-xl w-full p-2 sm:p-6">
        <div className="relative text-center mb-6">
          <Link
            to={`/konfirmasiPembayaran/${id}`}
            className="absolute left-2 top-2 text-gray-600 hover:text-gray-800"
          >
            <BsArrowLeft />
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">Pembayaran QRIS</h1>
          <p className="text-sm text-gray-500 mt-1">
            Lakukan pembayaran dan cek status pembayaran
          </p>
        </div>

        {/* QR Code Section */}
        <div
          id="qr-section"
          className="bg-white border border-gray-200 rounded-xl p-8 mb-4 shadow-md flex flex-col gap-6 items-center"
        >
          <h2 className="text-xl font-semibold text-gray-800">
            DETAIL PEMBAYARAN
          </h2>

          {/* Payment Information */}
          <div className="w-full space-y-4">
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 mb-2">
              <div className="p-4 bg-gray-100 rounded-lg">
                <h3 className="text-sm text-gray-700 font-semibold">
                  Jumlah Pembayaran
                </h3>
                <p className="text-lg font-bold text-gray-800 mt-2">
                  Rp {nominal}
                </p>
              </div>
              <div className="p-4 bg-gray-100 rounded-lg">
                <h3 className="text-sm text-gray-700 font-semibold">
                  Tanggal Transaksi
                </h3>
                <p className="text-lg font-bold text-gray-800 mt-2">
                  {formattedDate}
                </p>
              </div>
            </div>
          </div>

          {/* Campaign Details */}
        </div>
        {typePembayaran == "campaign" ? (
          <div className="mb-4 w-full">
            <h3 className="text-sm text-gray-700 font-semibold mb-3 uppercase">
              Detail Campaign
            </h3>
            <div className="bg-gray-100 rounded-lg p-4 sm:flex items-center gap-4">
              <img
                src={detailCampaign?.campaignImage}
                alt={detailCampaign?.campaignName}
                className="w-full sm:w-2/4 rounded-md object-cover shadow-sm"
              />
              <p className="text-gray-800 font-semibold">
                {detailCampaign?.campaignName}
              </p>
            </div>
          </div>
        ) : (
          <div className="mb-4 w-full">
            <h3 className="text-sm text-center text-gray-700 font-semibold mb-3 uppercase">
              Detail {typePembayaran}
            </h3>
            <div className="bg-gray-100 rounded-lg p-4 flex items-center gap-4">
              <p className="text-gray-800 text-center w-full font-semibold">
                {detailZiswaf.categoryName}
              </p>
            </div>
          </div>
        )}

        {billing["response_code"] === "00" ? (
          <button
            onClick={checkStatus}
            disabled={isLoading} // Tombol disable saat loading
            className={`w-full flex items-center justify-center gap-2 px-5 py-3 font-bold rounded-lg shadow-lg transition duration-300 ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 text-white active:bg-green-700"
            }`}
          >
            {isLoading ? (
              <FaSpinner className="text-xl animate-spin" />
            ) : (
              <BsClockHistory className="text-xl" />
            )}
            {isLoading ? "Memproses..." : "Cek Status Pembayaran"}
          </button>
        ) : (
          <div
            className={`mt-4 flex items-center gap-2 p-4 rounded-lg flex flex-col shadow bg-green-100 text-green-800`}
          >
            <BsCheckCircleFill className="text-5xl" />
            <span className="text-base font-semibold">
              Pembayaran berhasil! Terima kasih.
            </span>
          </div>
        )}
        {statusMessage && billing["response_code"] === "00" && (
          <div
            className={`mt-4 flex items-center gap-2 p-4 rounded-lg flex flex-col shadow ${
              statusMessage.includes("berhasil")
                ? "bg-green-100 text-green-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {statusMessage.includes("berhasil") ? (
              <BsCheckCircleFill className="text-5xl" />
            ) : (
              <BsClockHistory className="text-5xl" />
            )}
            <span className="text-base font-semibold">{statusMessage}</span>
          </div>
        )}

        <div className="max-w-xl mx-auto mt-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 rounded-lg shadow-md flex items-start space-x-3 animate-pulse">
          <div className="text-2xl">📢</div>
          <div>
            <p className="font-semibold text-sm md:text-base mb-1">
              Izinkan Pop-up untuk Pengalaman Lebih Baik!
            </p>
            <p className="text-xs md:text-sm leading-snug">
              Beberapa fitur membutuhkan jendela baru. Harap izinkan pop-up di
              browser Anda agar aplikasi dapat berjalan dengan optimal.
            </p>
          </div>
        </div>
        {/* Payment Instructions */}
        <div className="bg-gray-100 border border-gray-200 rounded-lg p-6 shadow-md mt-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Panduan Pembayaran
          </h2>
          <ul className="list-decimal list-inside text-gray-700 space-y-4">
            <li className="flex items-start gap-4">
              <span className="text-gray-500">1.</span>
              Scan atau screenshot QR Code.
            </li>
            <li className="flex items-start gap-4">
              <span className="text-gray-500">2.</span>
              Buka aplikasi mobile banking atau dompet digital (GoPay, Dana,
              OVO, dll).
            </li>
            <li className="flex items-start gap-4">
              <span className="text-gray-500">3.</span>
              Pilih menu PAY atau SCAN
            </li>
            <li className="flex items-start gap-4">
              <span className="text-gray-500">4.</span>
              Upload hasil screenshot QR Code.
            </li>
            <li className="flex items-start gap-4">
              <span className="text-gray-500">5.</span>
              Masukkan PIN dari aplikasi bank atau dompet digital.
            </li>
            <li className="flex items-start gap-4">
              <span className="text-gray-500">6.</span>
              Setelah pembayaran berhasil, Anda akan menerima notifikasi sebagai
              bukti transaksi.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
