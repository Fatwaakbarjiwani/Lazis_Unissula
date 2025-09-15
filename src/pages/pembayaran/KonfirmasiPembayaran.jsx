import { useEffect, useState } from "react";
import qris from "../../assets/qris.svg";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { transaksi } from "../../redux/actions/transaksiAction";
import { BsInfo } from "react-icons/bs";
import { setWaktu } from "../../redux/reducers/pembayaranReducer";

export default function KonfirmasiPembayaran() {
  const [isOn, setIsOn] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({ name: false, phoneNumber: false });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { methode, nml, typePembayaran } = useSelector(
    (state) => state.pembayaran
  );
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    setName(user?.username || "");
    setPhoneNumber(user?.phoneNumber || "");
    setEmail(user?.email || "");
  }, [user]);

  const handlePayment = () => {
    if (!name || !phoneNumber) {
      setErrors({
        name: !name,
        phoneNumber: !phoneNumber,
      });
      return;
    }
    function getFormattedDate() {
      const months = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
      ];

      const dateObj = new Date();

      const day = dateObj.getDate().toString().padStart(2, "0"); // Selalu 2 digit
      const month = months[dateObj.getMonth()]; // Nama bulan
      const year = dateObj.getFullYear(); // Tahun 4 digit

      return `${day} ${month} ${year}`;
    }

    // Gunakan hasil format di Redux Dispatch
    const formattedDate = getFormattedDate();
    dispatch(setWaktu(formattedDate));

    setLoading(true);
    dispatch(
      transaksi(
        typePembayaran,
        methode,
        isOn ? "Hamba Allah" : name,
        phoneNumber,
        email,
        nml,
        message,
        id,
        navigate
      )
    ).finally(() => setLoading(false));
  };

  return (
    <div className="font-Inter flex justify-center bg-gray-50 min-h-screen sm:py-10">
      <div className="w-full sm:w-3/6 bg-white shadow-lg rounded-lg p-4 sm:px-6 sm:py-8">
        <h1 className="font-bold text-gray-700 text-center text-xl sm:text-3xl mb-4 sm:mb-8">
          KONFIRMASI <span className="text-primary">PEMBAYARAN</span>
        </h1>
        <div className="space-y-6">
          <div>
            <h1 className="font-semibold text-gray-600 text-lg mb-2">
              Metode Pembayaran
            </h1>
            <div className="flex items-center justify-between border border-gray-200 rounded-xl shadow-sm px-4 py-3">
              <div className="flex items-center gap-4">
                <img
                  src={
                    methode === "qris"
                      ? qris
                      : "https://static.vecteezy.com/system/resources/previews/026/702/784/non_2x/illustration-of-virtual-account-icon-in-dark-color-and-white-background-vector.jpg"
                  }
                  className="w-14"
                  alt="QR Code"
                />
                <div className="text-left">
                  <p className="font-bold text-lg text-gray-800">
                    {methode === "qris" ? "Pembayaran QR" : "Pembayaran VA"}
                  </p>
                  <p className="hidden sm:block text-sm text-gray-500">
                    Bayar dengan aplikasi pembayaran pilihan Anda
                  </p>
                </div>
              </div>
              <button
                onClick={() => navigate(`/metodePembayaran/${id}`)}
                className="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:scale-105 transition-transform"
              >
                Ganti
              </button>
            </div>
          </div>

          <div>
            <h1 className="font-semibold text-gray-600 text-lg mb-2">
              Nama Pengirim
            </h1>
            {isOn ? (
              <p className="w-full rounded-xl border border-gray-300 bg-gray-100 p-3 text-gray-500 font-medium">
                Hamba Allah
              </p>
            ) : (
              <input
                type="text"
                className={`w-full rounded-xl border p-3 focus:ring focus:ring-primary focus:outline-none ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (e.target.value)
                    setErrors((prev) => ({ ...prev, name: false }));
                }}
              />
            )}
            {errors.name && !isOn && (
              <p className="text-red-500 text-sm mt-1">
                Nama Pengirim wajib diisi
              </p>
            )}
          </div>

          <div>
            <h1 className="font-semibold text-gray-600 text-lg mb-2">
              Nomor Handphone
            </h1>
            <input
              type="text"
              className={`w-full rounded-xl border p-3 focus:ring focus:ring-primary focus:outline-none ${
                errors.phoneNumber ? "border-red-500" : "border-gray-300"
              }`}
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
                if (e.target.value)
                  setErrors((prev) => ({ ...prev, phoneNumber: false }));
              }}
            />
            <p className="text-gray-500 text-sm mt-1 flex items-center gap-2">
              <BsInfo className="bg-gray-400 text-lg text-white rounded-full" />
              Kami tidak akan mengirim pesan spam
            </p>
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm mt-1">
                Nomor Handphone wajib diisi
              </p>
            )}
          </div>

          <div>
            <h1 className="font-semibold text-gray-600 text-lg mb-2 flex items-center gap-2">
              Alamat Email{" "}
              <span className="text-gray-400 font-thin">(opsional)</span>
            </h1>
            <input
              type="text"
              className="w-full rounded-xl border border-gray-300 p-3 focus:ring focus:ring-primary focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex justify-between items-center">
            <div>
              <h1 className="font-semibold text-gray-600 text-lg">
                Samarkan nama pengirim
              </h1>
              <p className="text-sm text-gray-500">(Hamba Allah)</p>
            </div>
            <button
              onClick={() => {
                setIsOn(!isOn);
                setName("Hamba Allah");
              }}
              className={`w-16 h-8 flex items-center rounded-full p-1 border transition-colors ${
                isOn
                  ? "bg-primary border-primary"
                  : "bg-gray-300 border-gray-400"
              }`}
            >
              <div
                className={`h-6 w-6 rounded-full bg-white shadow transform transition-transform ${
                  isOn ? "translate-x-8" : "translate-x-0"
                }`}
              ></div>
            </button>
          </div>

          <div>
            <p className="font-semibold text-gray-600 text-lg mb-2">
              Pesan Anda
            </p>
            <textarea
              className="w-full border border-gray-300 rounded-xl p-3 focus:ring focus:ring-primary focus:outline-none"
              placeholder="Tuliskan doa atau dukungan untuk donasi ini"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>

          {methode === "qris" && (
            <div className="max-w-xl mx-auto mt-2 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 rounded-lg shadow-md flex items-start space-x-3 animate-pulse">
              <div className="text-2xl">📢</div>
              <div>
                <p className="font-semibold text-sm md:text-base mb-1">
                  Izinkan Pop-up untuk Pengalaman Lebih Baik!
                </p>
                <p className="text-xs md:text-sm leading-snug">
                  Beberapa fitur membutuhkan jendela baru. Harap izinkan pop-up
                  di browser Anda agar aplikasi dapat berjalan dengan optimal.
                </p>
              </div>
            </div>
          )}
          {/* Tombol Lanjut Pembayaran */}
          <button
            onClick={handlePayment}
            disabled={isLoading} // Nonaktifkan tombol saat loading
            className={`w-full text-white font-bold text-lg rounded-xl py-3 shadow-lg transition-colors ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-primary hover:bg-primary-dark"
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Loading...
              </div>
            ) : (
              "Lanjut Pembayaran"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
