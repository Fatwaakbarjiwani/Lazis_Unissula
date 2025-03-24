import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaInfoCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import banner from "../../assets/banner.jpeg";
import toast from "react-hot-toast";
import {
  setNml,
  setTypePembayaran,
} from "../../redux/reducers/pembayaranReducer";
import DataPembayaran from "../../components/data/DataPembayaran";
import {
  getDetailFitrah,
  getDetailZiswaf,
  getNominalFitrah,
} from "../../redux/actions/ziswafAction";
import { setButtonPage } from "../../redux/reducers/pageReducer";
import DataOrang from "../../components/data/DataOrang";

export default function PembayaranZiswaf() {
  const dispatch = useDispatch();
  const { detailZiswaf, detailFitrah, nominalFitrah } = useSelector(
    (state) => state.ziswaf
  );
  const { nml } = useSelector((state) => state.pembayaran);
  const { id } = useParams();
  const { category } = useParams();
  const [selectedTotal, setSelectedTotal] = useState("");
  const navigate = useNavigate();

  function hapusTitik(nml) {
    let nmlStr = nml.toString();
    let nmlTanpaTitik = nmlStr.replace(/\./g, "");
    return nmlTanpaTitik;
  }

  useEffect(() => {
    if (selectedTotal) {
      dispatch(setNml(hapusTitik(selectedTotal)));
    }
    if (id) {
      dispatch(setButtonPage(category));
      dispatch(getDetailZiswaf(category, id));
    }
    if (category == "zakat") {
      dispatch(getDetailFitrah(id));
      dispatch(getNominalFitrah());
    }
  }, [id, category, dispatch, selectedTotal]);
  const formatNumber = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handleInputChange = (e) => {
    let inputValue = e.target.value.replace(/[^\d]/g, ""); // Menghapus karakter non-angka
    // Menambahkan titik setiap tiga digit dari belakang
    inputValue = inputValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    setSelectedTotal(formatNumber(inputValue));
  };

  const handleClick = () => {
    if (nml === "" || parseFloat(nml) <= 0 || parseFloat(nml) < 1000) {
      toast.error("Masukkan nml dengan benar (0 < nml <= 1000)");
    } else {
      dispatch(setTypePembayaran(category));
      navigate(`/konfirmasiPembayaran/${id}`);
    }
  };
  return (
    <div>
      <div className="font-Inter text-gray-600 flex justify-center">
        {/* content 1 */}
        <div className="sm:w-4/6 p-4 sm:p-0 mt-8  flex flex-col items-center rounded-xl">
          {/* colom */}
          <div className="w-full sm:w-5/6">
            <h1 className="text-3xl text-center font-bold mb-4 font-extrabold">
              FORM PEMBAYARAN <span className="text-primary">ZIS</span>
            </h1>
            {detailZiswaf.categoryName == "Zakat Fitrah" && (
              <img src={banner} className="mb-4" alt="" />
            )}
            <p className="font-bold text-xl">
              Anda akan melakukan pembayaran{" "}
              <span className="text-primary">{detailZiswaf.categoryName}</span>
            </p>
            <p>Nominal {detailZiswaf.categoryName} Rp </p>
          </div>
          {/* harga */}
          {detailZiswaf.categoryName !== "Zakat Fitrah" ? (
            <div className="w-full sm:w-5/6 gap-2 grid grid-cols-2 md:gap-6 my-3">
              {DataPembayaran.map((item) => (
                <button
                  key={item.id}
                  className={`bg-white ring-2 ring-gray-300/40 shadow sm:drop-shadow-lg w-full p-2 rounded-xl active:translate-y-[-5px] duration-300 ${
                    selectedTotal === item.total ? "bg-primary" : ""
                  }`}
                  onClick={() => setSelectedTotal(item.total)}
                >
                  Rp {item.total}
                </button>
              ))}
            </div>
          ) : (
            <div className="w-full sm:w-5/6 grid grid-cols-2 gap-3 md:gap-6 my-3">
              {DataOrang.map((item) => (
                <button
                  key={item.id}
                  className={`flex justify-between items-center bg-white ring-2 ring-gray-200 shadow-md transition-all w-full p-3 rounded-lg hover:ring-primary hover:shadow-lg ${
                    selectedTotal === item.id ? "bg-primary" : ""
                  }`}
                  onClick={() =>
                    setSelectedTotal(
                      formatNumber(item.id * nominalFitrah.nomZakat || 45000)
                    )
                  }
                >
                  <span className="font-semibold">{item.total}</span>
                </button>
              ))}
            </div>
          )}
          {/*  */}
          <div className="w-full sm:w-5/6">
            <p className="text-xl lg:text-2xl mt-5 font-bold">Jumlah</p>
          </div>
          {/*  */}
          <div className="w-full sm:w-5/6">
            <div className="w-full ring-gray-400 ring-2 mt-3 rounded-xl flex items-center">
              <p className="text-xl rounded-l-xl p-2 ring-gray-400 ring-2">
                Rp
              </p>
              <input
                type="text"
                placeholder="0"
                className="w-full focus:outline-none text-xl m-2 "
                value={selectedTotal}
                onChange={handleInputChange}
              />
            </div>
          </div>
          {/*  */}
          <div className="w-full sm:w-5/6 mt-4 bg-white p-4 shadow-md rounded-lg border border-gray-200">
            <div className="flex items-center gap-2 text-green-600 font-semibold text-lg">
              <FaInfoCircle className="text-xl" />
              <p>Noted :</p>
            </div>

            <div className="mt-2 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
              <p className="text-gray-700">
                Jumlah harus lebih besar dari Rp 1.000,-
              </p>
              <p className="text-lg text-gray-800">
                <span className="font-bold text-orange-600">
                  {detailFitrah.total_zakat_fitrah}
                </span>{" "}
                dana terkumpul dari{" "}
                <span className="font-bold text-orange-600">
                  {detailFitrah.jumlah_donatur}
                </span>{" "}
                donatur
              </p>
            </div>
          </div>
          {/*  */}
          <div className="w-full sm:w-5/6 mt-5 mb-20">
            <button
              onClick={handleClick}
              className="w-full bg-primary font-bold text-lg rounded-xl shadow shadow-lg  text-white p-2 active:translate-y-[-5px] duration-300"
            >
              Lanjut Pembayaran
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
