import { HiOutlineDownload } from "react-icons/hi";
import { QRCodeCanvas } from "qrcode.react";
import html2canvas from "html2canvas";
import { useDispatch, useSelector } from "react-redux";
import { BsArrowLeft } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { getDetailCampaign } from "../../redux/actions/campaignAction";
import { getDetailZiswaf } from "../../redux/actions/ziswafAction";

export default function PembayaranQris() {
  const { nml, typePembayaran } = useSelector((state) => state.pembayaran);
  const { id } = useParams();
  const { detailCampaign } = useSelector((state) => state.campaign);
  const { detailZiswaf } = useSelector((state) => state.ziswaf);
  const dispatch = useDispatch();
  const nominal = new Intl.NumberFormat("id-ID", {
    style: "decimal",
  }).format(nml);
  const QRdata =
    "00020101021226770025ID.CO.BIMAQRIS.BANKJATENG011893600113000000049502150000000000004950303UM151410014ID.CO.QRIS.WWW02121D20241219110303UMI5204571353033605405200005802ID5918LAZIS SULTAN AGUNG6013KOTASEMARANG61055012362370114020295678910120515202412311400532630445FB";

  const downloadQR = async () => {
    const qrElement = document.getElementById("qr-section");
    const canvas = await html2canvas(qrElement, { scale: 2 });
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    const downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "qris_with_details.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  useEffect(() => {
    if (typePembayaran === "campaign" && id) {
      dispatch(getDetailCampaign(id));
    }
    if (typePembayaran !== "campaign" && id) {
      dispatch(getDetailZiswaf(typePembayaran, id));
    }
  }, [dispatch, typePembayaran, id]);
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
            QRIS LAZIS SULTAN AGUNG
          </h2>
          <p className="text-sm text-gray-600 text-center">
            Silakan scan QR Code di bawah menggunakan aplikasi mobile banking
            atau dompet digital.
          </p>
          <div className="bg-gray-100 border border-gray-300 p-6 rounded-xl shadow-md">
            {/* Generate QR Code */}
            <QRCodeCanvas
              value={QRdata}
              size={180}
              bgColor="#ffffff"
              fgColor="#2d3748"
              level="H"
              includeMargin={true}
            />
          </div>

          {/* Payment Information */}
          <div className="w-full space-y-4">
            <h3 className="text-sm text-center text-gray-700 font-semibold text-left">
              DETAIL TRANSAKSI
            </h3>
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
                  13/01/2025
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
                className="w-full sm:w-3/4 rounded-md object-cover shadow-sm"
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
        <button
          onClick={downloadQR}
          className="bg-gray-700 hover:bg-gray-800 text-white text-sm font-medium px-6 py-3 rounded-xl flex items-center gap-3 shadow-lg transform transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          <HiOutlineDownload className="text-lg" />
          Download QRIS dengan Detail
        </button>

        {/* Payment Instructions */}
        <div className="bg-gray-100 border border-gray-200 rounded-lg p-6 shadow-md mt-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Panduan Pembayaran
          </h2>
          <ul className="list-decimal list-inside text-gray-700 space-y-4">
            <li className="flex items-start gap-4">
              <span className="text-gray-500">1.</span>
              Scan atau screenshot QR Code di atas.
            </li>
            <li className="flex items-start gap-4">
              <span className="text-gray-500">2.</span>
              Buka aplikasi mobile banking atau dompet digital (GoPay, Dana,
              OVO, dll).
            </li>
            <li className="flex items-start gap-4">
              <span className="text-gray-500">3.</span>
              Pilih menu <span className="font-medium text-gray-800">
                Pay
              </span>{" "}
              atau <span className="font-medium text-gray-800">Scan</span>.
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
