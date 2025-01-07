import { useEffect, useState } from "react";
import { MdContentCopy } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
// import { getTransaction } from "../../redux/actions/transaksiAction";

export default function PembayaranVa() {
  const [isCopied, setIsCopied] = useState(false);
  const { va } = useSelector((state) => state.pembayaran);
  const { nml } = useSelector((state) => state.pembayaran);
  const dispatch = useDispatch();

  const vaNumber = va;
  const nominal = new Intl.NumberFormat("id-ID", {
    style: "decimal",
  }).format(nml);
  const dueDate = "10 Januari 2025";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(vaNumber).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset copy state after 2 seconds
    });
  };

  useEffect(() => {
    // dispatch(getTransaction("020297221266165"));
  }, [dispatch]);
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 px-4 sm:px-6 py-2 flex flex-col items-center justify-center">
      <div className="bg-white shadow-lg rounded-xl p-4 sm:p-8 w-full max-w-md">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-blue-800 mb-6 text-center leading-tight">
          PEMBAYARAN <br /> VIRTUAL ACCOUNT
        </h1>

        {/* VA Number Section */}
        <div className="bg-blue-50 border border-blue-300 rounded-lg p-4 sm:p-5 mb-8 flex flex-col gap-4 shadow-sm">
          <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-2 sm:gap-0">
            <div className="text-center sm:text-left">
              <p className="text-sm text-blue-600">Nomor Virtual Account:</p>
              <p className="text-lg sm:text-2xl font-bold text-blue-800 tracking-wider">
                {vaNumber}
              </p>
            </div>
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800 focus:outline-none"
            >
              {isCopied ? (
                <FaCheckCircle className="text-green-500 text-xl" />
              ) : (
                <MdContentCopy className="text-xl" />
              )}
              <span className="font-medium text-sm sm:text-base">
                {isCopied ? "Tersalin" : "Salin"}
              </span>
            </button>
          </div>
          <div>
            <p className="text-sm text-blue-600">Nominal:</p>
            <p className="text-lg sm:text-xl font-semibold text-blue-800">
              {nominal}
            </p>
          </div>
          <div>
            <p className="text-sm text-blue-600">Batas Waktu Pembayaran:</p>
            <p className="text-lg sm:text-xl font-semibold text-blue-800">
              {dueDate}
            </p>
          </div>
        </div>

        {/* Payment Instructions */}
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-blue-700 mb-4">
            Tata Cara Pembayaran
          </h2>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 sm:p-5 mb-6">
            <h3 className="text-base sm:text-lg font-medium text-gray-800 mb-3">
              Melalui Jaringan ATM BERSAMA/PRIMA:
            </h3>
            <ol className="list-decimal list-inside text-gray-700 space-y-2 text-sm sm:text-base">
              <li>{`Masukkan PIN.`}</li>
              <li>{`Pilih Menu "Transaksi Lainnya".`}</li>
              <li>{`Pilih Menu "Transfer".`}</li>
              <li>{`Pilih Menu "Ke Rek Bank Lain / Antar Bank Online".`}</li>
              <li>
                {`Masukkan Kode Bank Jateng "44027" dan Nomor Virtual Account
                Anda.`}
              </li>
              <li>
                {`Masukkan "Jumlah/Nominal Pembayaran" sesuai dengan tagihan.`}
              </li>
              <li>Ikuti instruksi hingga transaksi selesai.</li>
              <li>Simpan bukti struk sebagai bukti pembayaran yang sah.</li>
            </ol>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 sm:p-5">
            <h3 className="text-base sm:text-lg font-medium text-gray-800 mb-3">
              Melalui Internet/Mobile Banking:
            </h3>
            <ol className="list-decimal list-inside text-gray-700 space-y-2 text-sm sm:text-base">
              <li>Login ke aplikasi Internet/Mobile Banking Anda.</li>
              <li>{`Pilih Menu "Transfer".`}</li>
              <li>{`Pilih Menu "Ke Rek Bank Lain / Realtime Transfer".`}</li>
              <li>
                {`Pilih "Seluruh Channel Bank" sebagai rekening bank tujuan.`}
              </li>
              <li>
                {`Masukkan Kode Bank Jateng "44027" dan Nomor Virtual Account
                Anda.`}
              </li>
              <li>
                {`Masukkan "Jumlah/Nominal Pembayaran" sesuai dengan tagihan.`}
              </li>
              <li>Ikuti instruksi hingga transaksi selesai.</li>
              <li>Simpan bukti struk sebagai bukti pembayaran yang sah.</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
