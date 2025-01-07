import { useEffect, useState } from "react";
import qris from "../../assets/qris.svg";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { transaksi } from "../../redux/actions/transaksiAction";

export default function KonfirmasiPembayaran() {
  const [isOn, setIsOn] = useState(false);
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
    // Check if the required fields are filled
    if (!name || !phoneNumber) {
      setErrors({
        name: !name,
        phoneNumber: !phoneNumber,
      });
      return;
    }

    // Proceed with the payment if validation is passed
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
    );
  };

  return (
    <div className="font-Inter flex justify-center">
      <div className="w-full sm:w-3/6 my-4 sm:my-10 px-2">
        <h1 className="font-bold text-gray-500 text-center text-3xl">
          Konfirmasi <span className="text-primary">Pembayaran</span>
        </h1>
        <div className="mt-4 sm:mt-10 space-y-3">
          <div className="space-y-1">
            <h1 className="font-semibold text-gray-600 text-lg">
              Metode Pembayaran
            </h1>
            <div className="justify-between duration-300 flex items-center gap-5 w-full border border-gray-200 rounded-3xl shadow px-2 p-2">
              <div className="flex gap-2">
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
                  <p className="font-bold text-lg">
                    {methode === "qris" ? "Pembayaran QR" : "Pembayaran VA"}
                  </p>
                  <p className="text-sm">
                    Bayar dengan aplikasi pembayaran pilihan Anda
                  </p>
                </div>
              </div>
              <button
                onClick={() => navigate(`/metodePembayaran/${id}`)}
                className="bg-primary hover:scale-105 duration-100 px-3 shadow rounded-xl text-white font-semibold"
              >
                Ganti
              </button>
            </div>
          </div>
          <div className="space-y-1">
            <h1 className="font-semibold text-gray-600 text-lg">
              Nama Pengirim
            </h1>
            {isOn ? (
              <p className="w-full rounded-xl border border-gray-600 p-2 text-gray-500 font-semibold">
                Hamba Allah
              </p>
            ) : (
              <input
                type="text"
                className={`w-full rounded-xl border p-2 ${
                  errors.name ? "border-red-500" : "border-gray-600"
                }`}
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (e.target.value)
                    setErrors((prev) => ({ ...prev, name: false }));
                }}
              />
            )}
            {errors.name && isOn == false && (
              <p className="text-red-500">Nama Pengirim wajib diisi</p>
            )}
          </div>
          <div className="space-y-1">
            <h1 className="font-semibold text-gray-600 text-lg">
              Nomor Handphone
            </h1>
            <input
              type="text"
              className={`w-full rounded-xl border p-2 ${
                errors.phoneNumber ? "border-red-500" : "border-gray-600"
              }`}
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
                if (e.target.value)
                  setErrors((prev) => ({ ...prev, phoneNumber: false }));
              }}
            />
            {errors.phoneNumber && (
              <p className="text-red-500">Nomor Handphone wajib diisi</p>
            )}
          </div>
          <div className="space-y-1">
            <h1 className="font-semibold text-gray-600 text-lg">
              Alamat Email
            </h1>
            <input
              type="text"
              className="w-full rounded-xl border border-gray-600 p-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="font-semibold text-gray-600 text-lg">
                Samarkan nama pengirim
              </h1>
              <p>(Hamba Allah)</p>
            </div>
            <button
              onClick={() => setIsOn(!isOn)}
              className={`rounded-full flex w-1/12 p-2 ${
                isOn
                  ? "bg-white border border-primary justify-end"
                  : "justify-start bg-white-500 border border-gray-600"
              } text-white`}
            >
              <p
                className={`${
                  isOn ? "bg-primary" : "bg-gray-400"
                } rounded-full h-4 w-4`}
              ></p>
            </button>
          </div>
          <div>
            <p className="font-[100]">
              Apakah anda berkenan mendapatkan laporan secara berkala dari Lazis
              SA?
            </p>
            <div className="flex gap-2">
              <input type="checkbox" />
              <p>Berkenan</p>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" />
              <p>Tidak Berkenan</p>
            </div>
          </div>
          <div>
            <p className="block text-lg text-gray-600 font-semibold mb-1">
              Pesan Anda
            </p>
            <textarea
              className="w-full border border-gray-600 rounded-xl p-2 text-lg outline-primary"
              placeholder="Tuliskan doa atau dukungan untuk donasi ini"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>
          <button
            onClick={handlePayment}
            className="w-full bg-primary font-bold text-lg rounded-xl shadow shadow-lg  text-white p-2 active:translate-y-[-5px] duration-300"
          >
            Lanjut Pembayaran
          </button>
        </div>
      </div>
    </div>
  );
}
