import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsArrowLeft } from "react-icons/bs";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { getDetailCampaign } from "../../redux/actions/campaignAction";
import { getDetailZiswaf } from "../../redux/actions/ziswafAction";

const API_URL = import.meta.env.VITE_API_URL || "";
function campaignImageUrl(campaign) {
  const url = campaign?.campaignImage || campaign?.image;
  if (!url) return "";
  if (url.startsWith("http")) return url;
  const base = API_URL.replace(/\/$/, "");
  return url.startsWith("/") ? `${base}${url}` : `${base}/${url}`;
}

export default function LoadQris() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { nml, typePembayaran, waktu } = useSelector(
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

  useEffect(() => {
    if (typePembayaran === "campaign" && id) dispatch(getDetailCampaign(id));
    if (typePembayaran !== "campaign" && typePembayaran && id)
      dispatch(getDetailZiswaf(typePembayaran, id));
  }, [dispatch, typePembayaran, id]);

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

    // Harus dari user gesture (onClick) supaya tidak diblok iOS
    window.open(qrisLink, "_blank", "noopener,noreferrer");

    // Opsional: setelah klik buka, user bisa lanjut ke halaman status/cek
    navigate(`/pembayaranQris/${id}`);
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
          <h1 className="text-2xl font-bold text-gray-800">Buka Pembayaran</h1>
          <p className="text-sm text-gray-500 mt-1">
            Klik tombol di bawah untuk membuka QRIS (lebih aman untuk iOS)
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4 shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">
            INFORMASI PEMBAYARAN
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
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
                {waktu || "-"}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-gray-100 rounded-lg">
              <h3 className="text-sm text-gray-700 font-semibold">Nama</h3>
              <p className="text-base font-bold text-gray-800 mt-2">
                {name || "-"}
              </p>
            </div>
            <div className="p-4 bg-gray-100 rounded-lg">
              <h3 className="text-sm text-gray-700 font-semibold">
                Nomor HP
              </h3>
              <p className="text-base font-bold text-gray-800 mt-2">
                {phoneNumber || "-"}
              </p>
            </div>
            <div className="p-4 bg-gray-100 rounded-lg">
              <h3 className="text-sm text-gray-700 font-semibold">
                Doa / Pesan
              </h3>
              <p className="text-base text-gray-800 mt-2 whitespace-pre-wrap">
                {message || "-"}
              </p>
            </div>
          </div>
        </div>

        {typePembayaran === "campaign" ? (
          <div className="mb-4 w-full">
            <h3 className="text-sm text-gray-700 font-semibold mb-3 uppercase">
              Detail Campaign
            </h3>
            <div className="bg-gray-100 rounded-lg p-4 sm:flex items-center gap-4">
              {(detailCampaign?.campaignImage || detailCampaign?.image) ? (
                <img
                  src={campaignImageUrl(detailCampaign)}
                  alt={detailCampaign?.campaignName || "Campaign"}
                  className="w-full sm:w-2/4 min-h-[180px] h-48 sm:h-40 rounded-md object-cover shadow-sm flex-shrink-0"
                />
              ) : (
                <div className="w-full sm:w-2/4 min-h-[180px] h-48 sm:h-40 rounded-md bg-gray-200 flex items-center justify-center flex-shrink-0">
                  <span className="text-gray-500 text-sm">Gambar campaign</span>
                </div>
              )}
              <p className="text-gray-800 font-semibold">
                {detailCampaign?.campaignName}
              </p>
            </div>
          </div>
        ) : (
          <div className="mb-4 w-full">
            <h3 className="text-sm text-center text-gray-700 font-semibold mb-3 uppercase">
              Detail {typePembayaran || "Pembayaran"}
            </h3>
            <div className="bg-gray-100 rounded-lg p-4 flex items-center gap-4">
              <p className="text-gray-800 text-center w-full font-semibold">
                {detailZiswaf?.categoryName || "-"}
              </p>
            </div>
          </div>
        )}

        <button
          onClick={handleOpenQris}
          className="w-full flex items-center justify-center gap-2 px-5 py-3 font-bold rounded-lg shadow-lg transition duration-300 bg-primary text-white active:scale-[0.99]"
        >
          Buka QRIS
        </button>

        <p className="text-xs text-gray-500 mt-3 text-center">
          Jika halaman QRIS tidak terbuka, pastikan pop-up diizinkan.
        </p>
      </div>
    </div>
  );
}

