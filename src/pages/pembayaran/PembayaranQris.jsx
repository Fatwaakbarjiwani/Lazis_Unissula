import { HiOutlineDownload } from "react-icons/hi";
import { QRCodeCanvas } from "qrcode.react"; // Import library QR Code
import html2canvas from "html2canvas"; // Import library html2canvas
import { useSelector } from "react-redux";

export default function PembayaranQris() {
  const { nml, typePembayaran } = useSelector((state) => state.pembayaran);
  const nominal = new Intl.NumberFormat("id-ID", {
    style: "decimal",
  }).format(nml);
  const QRdata =
    "00020101021226770025ID.CO.BIMAQRIS.BANKJATENG011893600113000000049502150000000000004950303UM151410014ID.CO.QRIS.WWW02121D20241219110303UMI5204571353033605405200005802ID5918LAZIS SULTAN AGUNG6013KOTASEMARANG61055012362370114020295678910120515202412311400532630445FB";

  // Fungsi untuk mengunduh QR Code sebagai gambar dengan judul, deskripsi, dan informasi tambahan
  const downloadQR = async () => {
    const qrElement = document.getElementById("qr-section"); // Ambil elemen QR Code section
    const canvas = await html2canvas(qrElement, { scale: 2 }); // Render elemen menjadi canvas
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-indigo-100 p-6 flex flex-col items-center justify-center">
      <div className="bg-white shadow-2xl rounded-2xl sm:p-8 w-full sm:max-w-lg">
        <h1 className="text-4xl font-extrabold text-indigo-900 mb-6 text-center tracking-widest">
          PEMBAYARAN QRIS
        </h1>

        {/* QR Code Section */}
        <div
          id="qr-section"
          className="bg-indigo-50 border border-indigo-300 rounded-lg p-6 mb-10 shadow-md flex flex-col gap-4 items-center"
        >
          <h2 className="text-lg font-semibold text-indigo-800">
            QRIS LAZIS SULTAN AGUNG
          </h2>
          <p className="text-sm text-indigo-600 text-center">
            Silakan scan QR Code di bawah menggunakan aplikasi mobile banking
            atau dompet digital.
          </p>
          <div className="bg-white border-2 border-indigo-300 p-4 rounded-lg shadow-sm">
            {/* Generate QR Code */}
            <QRCodeCanvas
              value={QRdata}
              size={160}
              bgColor="#ffffff"
              fgColor="#4c51bf"
              level="H"
              includeMargin={true}
            />
          </div>
          <div className="text-center mt-4">
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
          className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-md flex items-center gap-2 shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
        >
          <HiOutlineDownload className="text-lg" />
          Download QRIS dengan Detail
        </button>

        {/* Payment Instructions */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-md mt-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Panduan Pembayaran
          </h2>
          <ol className="list-decimal list-inside text-gray-700 space-y-3">
            <li>Scan atau screenshot QR Code di atas.</li>
            <li>
              Buka aplikasi mobile banking atau dompet digital (GoPay, Dana,
              OVO, dll).
            </li>
            <li>
              Pilih menu <span className="font-medium">{`"Pay"`}</span> atau{" "}
              <span className="font-medium">{`"Scan"`}</span>.
            </li>
            <li>Upload hasil screenshot QR Code.</li>
            <li>Masukkan PIN dari aplikasi bank atau dompet digital.</li>
            <li>
              Setelah pembayaran berhasil, Anda akan menerima notifikasi sebagai
              bukti transaksi.
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
