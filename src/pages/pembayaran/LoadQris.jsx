import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsArrowLeft, BsQrCodeScan, BsClockHistory, BsCheckCircleFill, BsX } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { FaSpinner } from "react-icons/fa";
import { getDetailCampaign } from "../../redux/actions/campaignAction";
import { getDetailZiswaf } from "../../redux/actions/ziswafAction";
import { getTransaction } from "../../redux/actions/transaksiAction";

// eslint-disable-next-line react/prop-types -- label/value are display-only
function InfoRow({ label, value }) {
  return (
    <div className="flex justify-between items-start py-3 border-b border-gray-100 last:border-0">
      <span className="text-sm text-gray-500 font-medium">{label}</span>
      <span className="text-sm text-gray-900 font-semibold text-right max-w-[60%] break-words">
        {value || "—"}
      </span>
    </div>
  );
}

const PANDUAN_LANGKAH = [
  "Scan atau screenshot QR Code.",
  "Buka aplikasi mobile banking atau dompet digital (GoPay, Dana, OVO, dll).",
  "Pilih menu PAY atau SCAN.",
  "Upload hasil screenshot QR Code.",
  "Masukkan PIN dari aplikasi bank atau dompet digital.",
  "Setelah pembayaran berhasil, Anda akan menerima notifikasi sebagai bukti transaksi.",
];

export default function LoadQris() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [statusMessage, setStatusMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isQrisModalOpen, setIsQrisModalOpen] = useState(false);
  const [qrisModalUrl, setQrisModalUrl] = useState("");
  const [isIframeLoading, setIsIframeLoading] = useState(true);

  const { nml, typePembayaran, waktu, va, billing } = useSelector(
    (state) => state.pembayaran
  );
  const name = localStorage.getItem("qris_name") || "";
  const phoneNumber = localStorage.getItem("qris_phone") || "";
  const message = localStorage.getItem("qris_message") || "";
  const { detailCampaign } = useSelector((state) => state.campaign);
  const { detailZiswaf } = useSelector((state) => state.ziswaf);

  const nominal = useMemo(() => {
    const numberValue = typeof nml === "string" ? Number(nml) : nml;
    return new Intl.NumberFormat("id-ID", { style: "decimal" }).format(
      numberValue || 0
    );
  }, [nml]);

  const responseCode = billing?.response_code;

  useEffect(() => {
    if (typePembayaran === "campaign" && id) dispatch(getDetailCampaign(id));
    if (typePembayaran !== "campaign" && typePembayaran && id)
      dispatch(getDetailZiswaf(typePembayaran, id));
    if (va) dispatch(getTransaction(va));
  }, [dispatch, typePembayaran, id, va]);

  const handleOpenQris = () => {
    const qrisLink = localStorage.getItem("qris_link");
    if (!qrisLink) {
      Swal.fire({
        title: "Link QRIS tidak ditemukan",
        text: "Silakan ulangi proses pembayaran dari halaman konfirmasi.",
        icon: "error",
      });
      return;
    }
    setQrisModalUrl(qrisLink);
    setIsIframeLoading(true);
    setIsQrisModalOpen(true);
  };

  const closeQrisModal = () => {
    setIsQrisModalOpen(false);
    setQrisModalUrl("");
    setIsIframeLoading(true);
  };

  const openQrisInNewTab = () => {
    if (qrisModalUrl) window.open(qrisModalUrl, "_blank", "noopener,noreferrer");
  };

  const checkStatus = async () => {
    if (!va) return;
    setIsLoading(true);
    setStatusMessage("");
    try {
      const data = await dispatch(getTransaction(va));
      const code = data?.response_code ?? billing?.response_code;
      if (code === "01") {
        setStatusMessage("Pembayaran berhasil! Terima kasih.");
      } else if (code === "00") {
        setStatusMessage("Pembayaran belum selesai. Silakan cek kembali nanti.");
      } else {
        setStatusMessage("Terjadi kesalahan. Silakan cek kembali nanti.");
      }
    } catch {
      setStatusMessage("Terjadi kesalahan saat memeriksa status pembayaran.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-Inter">
      <div className="max-w-lg mx-auto px-4 py-6 sm:py-8">
        <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="relative px-5 pt-5 pb-4 border-b border-gray-100 bg-white">
            <Link
              to={`/konfirmasiPembayaran/${id}`}
              className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-800 transition-colors text-sm font-medium"
            >
              <BsArrowLeft className="text-lg" />
              Kembali
            </Link>
            <h1 className="text-xl font-bold text-gray-900 mt-4 tracking-tight">
              Selesaikan Pembayaran
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Buka halaman QRIS untuk melakukan pembayaran
            </p>
          </div>

          {/* CTA Button */}
          <div className="p-5 bg-gradient-to-b from-primary/5 to-white">
            <button
              onClick={handleOpenQris}
              className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-bold text-white bg-primary hover:bg-primary/90 active:scale-[0.99] transition-all shadow-lg shadow-primary/25"
            >
              <BsQrCodeScan className="text-2xl" />
              Buka Halaman QRIS
            </button>
            <p className="text-xs text-gray-500 text-center mt-3">
              Klik tombol di atas untuk menampilkan halaman QRIS di dalam aplikasi.
            </p>
          </div>

          {/* Modal QRIS (iframe) */}
          {isQrisModalOpen && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
              onClick={closeQrisModal}
              role="dialog"
              aria-modal="true"
              aria-labelledby="qris-modal-title"
            >
              <div
                className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl flex flex-col max-h-[95vh] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 shrink-0">
                  <h2 id="qris-modal-title" className="font-bold text-gray-800">
                    Halaman Pembayaran QRIS
                  </h2>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={openQrisInNewTab}
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      Buka di tab baru
                    </button>
                    <button
                      type="button"
                      onClick={closeQrisModal}
                      className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition-colors"
                      aria-label="Tutup"
                    >
                      <BsX className="text-2xl" />
                    </button>
                  </div>
                </div>
                <div className="relative flex-1 min-h-[65vh] sm:min-h-[70vh] bg-gray-100 rounded-b-2xl overflow-hidden">
                  {isIframeLoading && (
                    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-gray-50 rounded-b-2xl">
                      <FaSpinner className="text-4xl text-primary animate-spin" />
                      <p className="text-sm font-medium text-gray-600">
                        Memuat halaman pembayaran...
                      </p>
                    </div>
                  )}
                  <iframe
                    title="Halaman Pembayaran QRIS"
                    src={qrisModalUrl}
                    className="absolute inset-0 w-full h-full border-0"
                    sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                    referrerPolicy="no-referrer"
                    onLoad={() => setIsIframeLoading(false)}
                  />
                </div>
                <p className="text-xs text-gray-500 text-center py-2 px-4 border-t border-gray-100">
                  Jika halaman tidak tampil, gunakan &quot;Buka di tab baru&quot; di atas.
                </p>
              </div>
            </div>
          )}

          {/* Cek Status Pembayaran */}
          <div className="px-5 pb-4">
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Cek Status Pembayaran
            </h2>
            {responseCode === "01" ? (
              <div className="flex items-center gap-3 p-4 rounded-xl bg-green-50 border border-green-100">
                <BsCheckCircleFill className="text-3xl text-green-600 flex-shrink-0" />
                <span className="font-semibold text-green-800">
                  Pembayaran berhasil! Terima kasih.
                </span>
              </div>
            ) : (
              <>
                <button
                  onClick={checkStatus}
                  disabled={isLoading || !va}
                  className={`w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-bold text-base transition-all border-2 ${
                    isLoading || !va
                      ? "bg-gray-200 text-gray-500 border-gray-200 cursor-not-allowed"
                      : "bg-primary/10 text-primary border-primary hover:bg-primary hover:text-white"
                  }`}
                >
                  {isLoading ? (
                    <FaSpinner className="text-xl animate-spin" />
                  ) : (
                    <BsClockHistory className="text-xl" />
                  )}
                  {isLoading ? "Memproses..." : "Cek Status Pembayaran Sekarang"}
                </button>
                {statusMessage && (
                  <div
                    className={`mt-3 p-4 rounded-xl flex items-center gap-3 ${
                      statusMessage.includes("berhasil")
                        ? "bg-green-50 text-green-800 border border-green-100"
                        : "bg-amber-50 text-amber-800 border border-amber-100"
                    }`}
                  >
                    {statusMessage.includes("berhasil") ? (
                      <BsCheckCircleFill className="text-2xl flex-shrink-0" />
                    ) : (
                      <BsClockHistory className="text-2xl flex-shrink-0" />
                    )}
                    <span className="text-sm font-medium">{statusMessage}</span>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Informasi Pembayaran */}
          <div className="px-5 pb-5">
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Informasi Pembayaran
            </h2>
            <div className="bg-gray-50/80 rounded-xl px-4 py-1">
              <InfoRow label="Jumlah" value={`Rp ${nominal}`} />
              <InfoRow label="Tanggal" value={waktu} />
              <InfoRow
                label={typePembayaran === "campaign" ? "Campaign" : "Program"}
                value={
                  typePembayaran === "campaign"
                    ? detailCampaign?.campaignName
                    : detailZiswaf?.categoryName
                }
              />
              <InfoRow label="Nama" value={name} />
              <InfoRow label="No. HP" value={phoneNumber} />
              {message && (
                <div className="py-3 border-b border-gray-100 last:border-0">
                  <span className="text-sm text-gray-500 font-medium block mb-1">
                    Doa / Pesan
                  </span>
                  <span className="text-sm text-gray-900 whitespace-pre-wrap block">
                    {message}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Panduan Pembayaran */}
          <div className="px-5 pb-5">
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Panduan Pembayaran
            </h2>
            <div className="bg-gray-50/80 rounded-xl p-4 border border-gray-100">
              <ul className="list-decimal list-inside text-gray-700 space-y-3 text-sm">
                {PANDUAN_LANGKAH.map((text, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-gray-400 font-medium flex-shrink-0">{i + 1}.</span>
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
