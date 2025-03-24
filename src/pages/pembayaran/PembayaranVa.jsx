import { useEffect, useState } from "react";
import { MdContentCopy } from "react-icons/md";
import { FaCheckCircle, FaSpinner } from "react-icons/fa"; // Ikon tambahan
import { BsArrowLeft, BsCheckCircleFill, BsClockHistory } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { getDetailCampaign } from "../../redux/actions/campaignAction";
import { Link, useParams } from "react-router-dom";
import { getDetailZiswaf } from "../../redux/actions/ziswafAction";
import { getTransaction } from "../../redux/actions/transaksiAction";

export default function PembayaranVa() {
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const { va } = useSelector((state) => state.pembayaran);
  const { billing, typePembayaran } = useSelector((state) => state.pembayaran);
  const { detailCampaign } = useSelector((state) => state.campaign);
  const dispatch = useDispatch();
  const { detailZiswaf } = useSelector((state) => state.ziswaf);
  const { id } = useParams();

  const vaNumber = va;
  const nominal = new Intl.NumberFormat("id-ID", {
    style: "decimal",
  }).format(billing[0]?.billing_amount);
  const dueDate = billing[0]?.billing_date;
  const date = new Date(dueDate);

  const formattedDate = date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const copyToClipboard = () => {
    navigator.clipboard.writeText(vaNumber).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  const checkStatus = async () => {
    setIsLoading(true); // Set loading state
    try {
      await dispatch(getTransaction(va)); // Memanggil aksi untuk mendapatkan data transaksi
      const paymentStatus = billing[0]?.success;
      if (paymentStatus === "1") {
        setStatusMessage("Pembayaran berhasil! Terima kasih.");
      } else if (paymentStatus === "0") {
        setStatusMessage(
          "Pembayaran belum selesai. Silakan cek kembali nanti."
        );
      } else {
        setStatusMessage("Terjadi Kesalahan. Silakan cek kembali nanti.");
      }
    } catch (error) {
      setStatusMessage("Terjadi kesalahan saat memeriksa status pembayaran.");
    } finally {
      setIsLoading(false); // Selesai loading
    }
  };

  useEffect(() => {
    dispatch(getTransaction(va));
    if (typePembayaran === "campaign" && id) {
      dispatch(getDetailCampaign(id));
    }
    if (typePembayaran !== "campaign" && id) {
      dispatch(getDetailZiswaf(typePembayaran, id));
    }
    dispatch(getTransaction(va));
  }, [dispatch, typePembayaran, va, id]);

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center p-2 sm:px-4 sm:py-8">
      <div className="bg-white sm:rounded-xl shadow-lg max-w-xl w-full p-4 sm:p-6">
        {/* Header */}
        <div className="relative text-center mb-6">
          <Link to={`/konfirmasiPembayaran/${id}`} className="left-2 top-2">
            <BsArrowLeft />
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">
            Pembayaran Virtual Account
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Lakukan pembayaran dan cek status pembayaran
          </p>
        </div>

        {/* VA Details */}
        <div className="bg-gray-100 rounded-lg p-5 mb-6">
          <h2 className="text-gray-700 font-semibold text-sm">
            Nomor Virtual Account
          </h2>
          <div className="flex items-center justify-between mt-2">
            <p className="text-xl font-semibold text-gray-900">{vaNumber}</p>
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow active:bg-blue-700 transition duration-200"
            >
              {isCopied ? (
                <FaCheckCircle className="text-lg" />
              ) : (
                <MdContentCopy className="text-lg" />
              )}
              <span>{isCopied ? "Disalin" : "Salin"}</span>
            </button>
          </div>
        </div>

        {/* Payment Information */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="p-4 bg-gray-100 rounded-lg">
            <h3 className="text-sm text-gray-700 font-semibold">
              Jumlah Pembayaran
            </h3>
            <p className="text-lg font-bold text-gray-900 mt-2">Rp {nominal}</p>
          </div>
          <div className="p-4 bg-gray-100 rounded-lg">
            <h3 className="text-sm text-gray-700 font-semibold">
              Tanggal Transaksi
            </h3>
            <p className="text-lg font-bold text-gray-900 mt-2">
              {formattedDate}
            </p>
          </div>
        </div>

        {/* Campaign Details */}
        {typePembayaran == "campaign" ? (
          <div className="mb-6">
            <h3 className="text-sm text-gray-700 font-semibold mb-3">
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
          <div className="mb-6">
            <h3 className="text-sm text-gray-700 font-semibold mb-3 capitalize">
              Detail {typePembayaran}
            </h3>
            <div className="bg-gray-100 rounded-lg p-4 flex items-center gap-4">
              <p className="text-gray-800 font-semibold">
                {detailZiswaf.categoryName}
              </p>
            </div>
          </div>
        )}

        {/* Payment Status */}
        <div className="mb-8">
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
          {statusMessage && (
            <div
              className={`mt-4 flex items-center gap-2 p-4 rounded-lg shadow ${
                statusMessage.includes("berhasil")
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {statusMessage.includes("berhasil") ? (
                <BsCheckCircleFill className="text-2xl" />
              ) : (
                <BsClockHistory className="text-2xl" />
              )}
              <span>{statusMessage}</span>
            </div>
          )}
        </div>

        {/* Payment Instructions */}
        <div>
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            Instruksi Pembayaran
          </h2>
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg shadow p-4">
              <h3 className="text-sm font-semibold text-gray-700">Via ATM</h3>
              <ol className="list-decimal list-inside text-gray-600 mt-2 space-y-1">
                <li>Masukkan kartu ATM dan PIN.</li>
                <li>{`Pilih menu "Transaksi Lainnya".`}</li>
                <li>{`Pilih menu "Transfer".`}</li>
                <li>{`Pilih menu "Ke Rek Bank Lain / Antar Bank Online".`}</li>
                <li>Masukkan kode Bank Jateng (113)</li>
                <li>
                  Masukkan juga nomor VA: <strong>{vaNumber}</strong>.
                </li>
                <li>
                  Masukkan nominal: <strong>Rp {nominal}</strong>.
                </li>
                <li>⁠Simpan Bukti Struk sebagai bukti pembayaran yang Sah .</li>
                <li>Ikuti instruksi hingga transaksi selesai.</li>
              </ol>
            </div>
            <div className="bg-gray-50 rounded-lg shadow p-4">
              <h3 className="text-sm font-semibold text-gray-700">
                Via Mobile Banking
              </h3>
              <ol className="list-decimal list-inside text-gray-600 mt-2 space-y-1">
                <li>Login ke aplikasi Mobile Banking.</li>
                <li>{`Pilih menu "Transfer".`}</li>
                <li>{`Pilih Menu "Ke Rek Bank Lain / Realtime Transfer".`}</li>
                <li>{`Pilih “Seluruh Channel Bank” sebagai rekening Bank Tujuan.`}</li>
                <li>
                  Masukkan nomor VA: <strong>{vaNumber}</strong> dari aplikasi
                  lazis.
                </li>
                <li>
                  Masukkan nominal: <strong>Rp {nominal}</strong>.
                </li>
                <li>Simpan Bukti Struk sebagai bukti pembayaran yang Sah.</li>
                <li>Ikuti instruksi hingga transaksi selesai.</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
