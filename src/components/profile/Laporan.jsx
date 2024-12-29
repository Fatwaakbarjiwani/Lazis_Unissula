import { useDispatch, useSelector } from "react-redux";
import icon1 from "../../assets/icon1.svg";
import icon2 from "../../assets/icon2.svg";
import icon3 from "../../assets/icon3.svg";
import icon4 from "../../assets/icon4.svg";
import icon5 from "../../assets/icon5.svg";
import icon6 from "../../assets/icon6.svg";
import { useEffect } from "react";
import { getSummaryDonatur } from "../../redux/actions/authAction";
export default function Laporan() {
  const dispatch = useDispatch();
  const { summaryUser } = useSelector((state) => state.auth);

  const formatNumber = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };
  
  useEffect(() => {
    dispatch(getSummaryDonatur());
  }, [dispatch]);
  return (
    <div className="w-full md:w-5/6 lg:w-4/6 gap-4 font-Inter space-y-6">
      <div className="grid grid-cols-2 gap-4 items-center justify-between">
        <div className="flex items-center gap-2">
          <img src={icon2} className="bg-primary rounded-lg p-2" alt="" />
          <div className="space-y-[-5px]">
            <h1 className="font-semibold">Infak</h1>
            <p className="text-sm">Jumlah yang disalurkan</p>
            <p className="text-primary font-semibold">
              Rp. {formatNumber(summaryUser.Infak || 0)}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <img src={icon3} className="bg-primary rounded-lg p-2" alt="" />
          <div className="space-y-[-5px]">
            <h1 className="font-semibold">Wakaf</h1>
            <p className="text-sm">Jumlah yang disalurkan</p>
            <p className="text-primary font-semibold ">
              Rp. {formatNumber(summaryUser.Wakaf || 0)}
            </p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 items-center justify-between">
        <div className="flex items-center gap-2">
          <img src={icon1} className="bg-primary rounded-lg p-2" alt="" />
          <div className="space-y-[-5px]">
            <h1 className="font-semibold">Zakat</h1>
            <p className="text-sm">Jumlah yang disalurkan</p>
            <p className="text-primary font-semibold ">
              Rp. {formatNumber(summaryUser.Zakat || 0)}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <img src={icon4} className="bg-primary rounded-lg p-2" alt="" />
          <div className="space-y-[-5px]">
            <h1 className="font-semibold">Donasi</h1>
            <p className="text-sm">Jumlah yang disalurkan</p>
            <p className="text-primary font-semibold ">
              Rp. {formatNumber(summaryUser.Campaign || 0)}
            </p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 items-center justify-between">
        <div className="flex items-center gap-2">
          <img src={icon5} className="bg-primary rounded-lg p-2" alt="" />
          <div className="space-y-[-5px]">
            <h1 className="font-semibold">Dskl</h1>
            <p className="text-sm">Jumlah yang disalurkan</p>
            <p className="text-primary font-semibold ">
              Rp. {formatNumber(summaryUser.Dskl || 0)}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <img src={icon6} className="bg-primary rounded-lg p-2" alt="" />
          <div className="space-y-[-5px]">
            <h1 className="font-semibold">Total Pengeluaran</h1>
            <p className="text-sm">Jumlah yang disalurkan</p>
            <p className="text-primary font-semibold ">
              Rp. {formatNumber(summaryUser.Total || 0)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
