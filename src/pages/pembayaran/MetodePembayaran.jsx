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
    <div className="flex flex-col gap-10 items-center mt-4 sm:mt-10 font-Inter">
      <h1 className="font-bold text-gray-500 text-center text-3xl">
        Metode <span className="text-primary">Pembayaran</span>
      </h1>
      <div className="sm:w-3/6 w-full bg-white px-4 sm:px-8">
        <Link
          to={`/konfirmasiPembayaran/${id}`}
          className="flex w-3/12 items-center gap-1 font-semibold text-gray-500 hover:translate-y-[-5px] duration-200"
          >
          Kembali
          <div>
            <TbArrowBack className="w-6 h-6" />
          </div>
        </Link>
        <div className="mb-2 sm:mb-2 mt-2">
          <p className="text-lg font-bold">Dompet Digital</p>
          <p>Pembayaran dengan dompet digital</p>
        </div>
        <button
          onClick={() => {
            navigate(`/konfirmasiPembayaran/${id}`);
            dispatch(setMethode("qris"));
          }}
          className="duration-300 active:scale-105 hover:scale-105 flex gap-5 w-full border-2 border-gray-300 rounded-2xl p-1 mb-6 hover:border-primary focus-within:border-primary"
        >
          <img src={qris} className="w-14" alt="QR Code" />
          <div className="text-left">
            <p className="font-bold text-lg">Pembayaran QR</p>
            <p className="text-sm">
              Bayar dengan aplikasi pembayaran pilihan Anda
            </p>
          </div>
        </button>
        <div className="mb-2 sm:mb-2">
          <p className="text-lg font-bold">Virtual Account</p>
          <p>Pembayaran di ATM atau Internet Banking</p>
        </div>
        <div className="mt-2 space-y-4">
          <button
            onClick={() => {
              dispatch(setMethode("va"));
              navigate(`/konfirmasiPembayaran/${id}`);
            }}
            className="duration-300 items-center active:scale-105 hover:scale-105 flex gap-5 w-full border-2 border-gray-300 rounded-2xl p-1 hover:border-primary focus-within:border-primary"
          >
            <div>
              <img
                src={
                  "https://static.vecteezy.com/system/resources/previews/026/702/784/non_2x/illustration-of-virtual-account-icon-in-dark-color-and-white-background-vector.jpg"
                }
                className="w-14"
                alt={"VA"}
              />
            </div>
            <div className="text-left">
              <p className="font-bold text-lg">Virtual Account</p>
              <p className="text-sm">
                Transfer ke nomor virtual account Bank Anda
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
