import { useState } from "react";
import { BsArrowDown } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { getTransactionUser } from "../../redux/actions/transaksiAction";

export default function Transaksi() {
  const { transactionUser } = useSelector((state) => state.pembayaran);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useState(() => {
    dispatch(getTransactionUser());
  }, [dispatch]);
  return (
    <div className="w-full md:w-5/6 lg:w-4/6 gap-4 font-Inter">
      <div className="flex flex-col gap-4 items-center">
        <div className="flex justify-end w-full">
          <button className="flex gap-2 items-center bg-primary text-white font-semibold rounded-lg p-1">
            Pilih Tahun <BsArrowDown />
          </button>
        </div>
        {transactionUser.map((item) => (
          <div
            key={item}
            className="flex bg-white rounded-lg p-2 shadow items-center w-full gap-2"
          >
            <img
              src={user?.image}
              className="bg-gray-200 rounded-full w-20 h-20 border-2 border-gray-200"
              alt=""
            />
            <div className="w-5/6">
              <div className="flex gap-2 w-full justify-between items-start">
                <h1>{item?.transactionName}</h1>
                <div className="flex gap-2">
                  <p className="text-primary text-sm">
                    {item?.transactionDate}
                  </p>
                </div>
              </div>
              <p className="text-primary text-base font-semibold">
                {item?.transactionAmount}
              </p>
            </div>
          </div>
        ))}

        <div className="flex flex-col items-end w-full">
          <h1 className="text-gray-600 text-lg font-semibold">Total Donasi</h1>
          <p className="text-primary text-lg font-semibold">Rp.100.000</p>
        </div>
      </div>
    </div>
  );
}
