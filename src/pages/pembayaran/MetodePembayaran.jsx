import { TbArrowBack } from "react-icons/tb";
import { Link, useNavigate, useParams } from "react-router-dom";
import qris from "../../assets/qris.svg";
import { setMethode } from "../../redux/reducers/pembayaranReducer";
import { useDispatch } from "react-redux";

export default function MetodePembayaran() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  return (
    <div className="flex flex-col items-center mt-8 px-4 sm:px-8 font-Inter">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-700 mb-6">
        METODE <span className="text-primary">PEMBAYARAN</span>
      </h1>

      <div className="w-full sm:w-3/5 bg-white rounded-xl shadow-md px-6 py-8">
        {/* Tombol Kembali */}
        <Link
          to={`/konfirmasiPembayaran/${id}`}
          className="flex items-center gap-2 text-gray-500 font-semibold hover:text-gray-700 hover:translate-y-[-2px] duration-200 mb-6"
        >
          <TbArrowBack className="w-5 h-5" />
          <span>Kembali</span>
        </Link>

        {/* Dompet Digital Section */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Dompet Digital
          </h2>
          <p className="text-sm text-gray-600">
            Pembayaran dengan dompet digital seperti GoPay, OVO, dan lainnya.
          </p>
          <button
            onClick={() => {
              navigate(`/konfirmasiPembayaran/${id}`);
              dispatch(setMethode("qris"));
            }}
            className="flex items-center gap-4 w-full border border-gray-300 rounded-lg p-4 mt-4 hover:shadow-md hover:border-gray-500 duration-300"
          >
            <img src={qris} alt="QRIS" className="w-12 h-12" />
            <div className="text-left">
              <p className="font-semibold text-gray-800">Pembayaran QR</p>
              <p className="text-sm text-gray-600">
                Bayar dengan aplikasi pembayaran pilihan Anda.
              </p>
            </div>
          </button>
        </div>

        {/* Virtual Account Section */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Virtual Account
          </h2>
          <p className="text-sm text-gray-600">
            Pembayaran melalui ATM atau Internet Banking.
          </p>
          <button
            onClick={() => {
              dispatch(setMethode("va"));
              navigate(`/konfirmasiPembayaran/${id}`);
            }}
            className="flex items-center gap-4 w-full border border-gray-300 rounded-lg p-4 mt-4 hover:shadow-md hover:border-gray-500 duration-300"
          >
            <img
              src="https://static.vecteezy.com/system/resources/previews/026/702/784/non_2x/illustration-of-virtual-account-icon-in-dark-color-and-white-background-vector.jpg"
              alt="Virtual Account"
              className="w-12 h-12"
            />
            <div className="text-left">
              <p className="font-semibold text-gray-800">Virtual Account</p>
              <p className="text-sm text-gray-600">
                Transfer ke nomor virtual account bank Anda.
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
