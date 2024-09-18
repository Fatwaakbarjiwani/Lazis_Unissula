import { BsArrowDown } from "react-icons/bs";

export default function Transaksi() {
  return (
    <div className="w-full md:w-5/6 lg:w-4/6 gap-4">
      <div className="flex flex-col gap-4 items-center">
        <div className="flex justify-end w-full">
          <button className="flex gap-2 items-center bg-primary text-white font-semibold rounded-lg p-1">Pilih Tahun <BsArrowDown /></button>
        </div>
        <div className="flex bg-white rounded-lg p-2 shadow items-center w-full gap-2">
          <img
            src=""
            className="bg-gray-200 rounded-full w-20 h-20 border-2 border-gray-200"
            alt=""
          />
          <div className="w-5/6">
            <div className="flex gap-2 w-full justify-between items-start">
              <h1>Berbagi paket sembako untuk difabel</h1>
              <div className="flex gap-2">
                <p className="text-primary text-sm">19/12/2023</p>
                <p className="text-primary text-sm">23:45</p>
              </div>
            </div>
            <p className="text-primary text-base font-semibold">Rp.100.000</p>
          </div>
        </div>
        <div className="flex bg-white rounded-lg p-2 shadow items-center w-full gap-2">
          <img
            src=""
            className="bg-gray-200 rounded-full w-20 h-20 border-2 border-gray-200"
            alt=""
          />
          <div className="w-5/6">
            <div className="flex gap-2 w-full justify-between items-start">
              <h1>Berbagi paket sembako untuk difabel</h1>
              <div className="flex gap-2">
                <p className="text-primary text-sm">19/12/2023</p>
                <p className="text-primary text-sm">23:45</p>
              </div>
            </div>
            <p className="text-primary text-base font-semibold">Rp.100.000</p>
          </div>
        </div>
        <div className="flex flex-col items-end w-full">
          <h1 className="text-gray-600 text-lg font-semibold">Total Donasi</h1>
          <p className="text-primary text-lg font-semibold">Rp.100.000</p>
        </div>
      </div>
    </div>
  );
}
