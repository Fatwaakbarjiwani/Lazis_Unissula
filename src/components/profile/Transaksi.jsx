import { useState } from "react";
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
      {transactionUser.length > 0 ? (
        <div className="flex flex-col gap-4 items-center">
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
        </div>
      ) : (
        <div className="flex flex-col gap-4 items-center">
          <h1 className="font-semibold text-lg text-gray-400">Belum ada data</h1>
        </div>
      )}
    </div>
  );
}
