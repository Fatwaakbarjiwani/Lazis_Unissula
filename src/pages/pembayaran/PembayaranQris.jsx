import { HiOutlineDownload } from "react-icons/hi";
import { QRCodeCanvas } from "qrcode.react";
import html2canvas from "html2canvas";
import { useSelector } from "react-redux";

export default function PembayaranQris() {
  const { nml, typePembayaran } = useSelector((state) => state.pembayaran);
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

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 via-indigo-200 to-indigo-300 flex items-center justify-center py-10">
      <div className="bg-white shadow-lg rounded-3xl sm:p-10 p-6 w-full sm:max-w-xl">
        <h1 className="text-4xl font-extrabold text-indigo-900 mb-8 text-center tracking-wider">
          Pembayaran QRIS
        </h1>

        {/* QR Code Section */}
        <div
          id="qr-section"
          className="bg-indigo-50 border border-indigo-300 rounded-xl p-8 mb-12 shadow-md flex flex-col gap-6 items-center"
        >
          <h2 className="text-xl font-semibold text-indigo-800">
            QRIS LAZIS SULTAN AGUNG
          </h2>
          <p className="text-sm text-indigo-600 text-center">
            Silakan scan QR Code di bawah menggunakan aplikasi mobile banking
            atau dompet digital.
          </p>
          <div className="bg-white border-4 border-indigo-300 p-6 rounded-xl shadow-md">
            {/* Generate QR Code */}
            <QRCodeCanvas
              value={QRdata}
              size={180}
              bgColor="#ffffff"
              fgColor="#4c51bf"
              level="H"
              includeMargin={true}
            />
          </div>
          <div className="text-center mt-6">
            <p className="text-sm text-indigo-600">Nominal:</p>
            <p className="text-xl font-semibold text-indigo-800">{nominal}</p>
            <p className="text-sm text-indigo-600 mt-2">Kategori Pembayaran:</p>
            <p className="text-lg font-semibold text-indigo-800 uppercase">
              {typePembayaran}
            </p>
          </div>
        </div>

        <button
          onClick={downloadQR}
          className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-6 py-3 rounded-xl flex items-center gap-3 shadow-lg transform transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
        >
          <HiOutlineDownload className="text-lg" />
          Download QRIS dengan Detail
        </button>

        {/* Payment Instructions */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 shadow-md mt-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Panduan Pembayaran
          </h2>
          <ul className="list-decimal list-inside text-gray-700 space-y-4">
            <li className="flex items-center gap-4">
              <span className="text-indigo-600 text-xl">1.</span>
              Scan atau screenshot QR Code di atas.
            </li>
            <li className="flex items-center gap-4">
              <span className="text-indigo-600 text-xl">2.</span>
              Buka aplikasi mobile banking atau dompet digital (GoPay, Dana,
              OVO, dll).
            </li>
            <li className="flex items-center gap-4">
              <span className="text-indigo-600 text-xl">3.</span>
              Pilih menu{" "}
              <span className="font-medium text-gray-800">"Pay"</span> atau{" "}
              <span className="font-medium text-gray-800">"Scan"</span>.
            </li>
            <li className="flex items-center gap-4">
              <span className="text-indigo-600 text-xl">4.</span>
              Upload hasil screenshot QR Code.
            </li>
            <li className="flex items-center gap-4">
              <span className="text-indigo-600 text-xl">5.</span>
              Masukkan PIN dari aplikasi bank atau dompet digital.
            </li>
            <li className="flex items-center gap-4">
              <span className="text-indigo-600 text-xl">6.</span>
              Setelah pembayaran berhasil, Anda akan menerima notifikasi sebagai
              bukti transaksi.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
