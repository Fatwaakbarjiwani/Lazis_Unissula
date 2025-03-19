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
  const formatNumber = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };
  return (
    <div className="w-full md:w-5/6 lg:w-4/6 gap-4 font-Inter mb-6">
      {transactionUser.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          {transactionUser.map((item) => (
            <div
              key={item}
              className="flex bg-white h-full border rounded-lg p-1 drop-shadow-md items-center w-full gap-2"
            >
              <img
                src={user?.image}
                className="bg-gray-200 rounded-full w-[15%] md:w-[30%] border-2 border-gray-200"
                alt=""
              />
              <div className="w-full flex flex-col justify-between h-full">
                <div className="flex gap-2 w-full justify-between items-start">
                  <h1>{item?.transactionName}</h1>
                  <div className="flex text-right gap-2">
                    <p className="text-white bg-primary p-1 rounded text-sm">
                      {
                        new Date(item?.transactionDate)
                          .toISOString()
                          .split("T")[0]
                      }
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 text-base font-semibold">
                  Rp {formatNumber(item?.transactionAmount || 0)}
                </p>
                <p>{item?.message}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-4 items-center">
          <h1 className="font-semibold text-lg text-gray-400">
            Belum ada data
          </h1>
        </div>
      )}
    </div>
  );
}
