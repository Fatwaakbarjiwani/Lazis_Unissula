import info1 from "../../assets/info1.svg"
import info2 from "../../assets/info2.svg"
import info3 from "../../assets/info3.svg"
import info4 from "../../assets/info4.svg"
export default function Information() {
    const summary = {
      totalDistributionReceiver: 5000, // Jumlah penerima manfaat
      totalTransactionAmount: 150000000, // Jumlah total penghimpunan (misalnya dalam Rupiah)
      totalDistributionAmount: 120000000, // Jumlah total distribusi (misalnya dalam Rupiah)
      totalUser: 1000, // Jumlah total donatur
    };

      const formatNumber = (number) => {
        return number.toLocaleString("id-ID");
      };
  return (
    <div className="flex justify-center font-Inter">
      <div className="absolute as:top-[30vh] xs:top-[22vh] bs:top-[30vh] cs:top-[32vh] sm:top-[28vh] md:top-[42vh] lg:top-[70vh] flex w-[86%] bg-white shadow md:shadow-lg rounded-3xl px-1 sm:px-5 md:px-10 lg:px-20 sm:py-5 py-2 transition delay-150 duration-300 ease-in-out">
        <div className="flex w-full justify-around md:justify-between p-2 items-start">
          <div className="flex flex-col items-center justify-between h-full">
            <img src={info4} className="w-6 sm:w-10" alt="" />
            <p className="text-primary md:text-lg text-[10px] ms:text-sm lg:text-xl">
              {summary.totalDistributionReceiver || 0}
            </p>
            <p className="font-bold md:text-lg sm:text-sm text-[8px] text-center lg:text-xl text-gray-600 font-Inter">
              Penerima Manfaat
            </p>
          </div>
          <div className="flex flex-col items-center justify-between h-full">
            <img src={info2} className="w-10 sm:w-16" alt="" />
            <p className="text-primary md:text-lg text-[10px] ms:text-sm lg:text-xl">
              Rp {formatNumber(summary.totalTransactionAmount || 0)}
            </p>
            <p className="font-bold md:text-lg sm:text-sm text-[8px] text-center lg:text-xl text-gray-600 font-Inter">
              Penghimpunan
            </p>
          </div>
          <div className="flex flex-col items-center justify-between h-full ">
            <img src={info3} className="w-10 sm:w-16" alt="" />
            <p className="text-primary md:text-lg text-[10px] ms:text-sm lg:text-xl">
              Rp {formatNumber(summary.totalDistributionAmount || 0)}
            </p>
            <p className="font-bold md:text-lg sm:text-sm text-[8px] text-center lg:text-xl text-gray-600 font-Inter">
              Penyaluran
            </p>
          </div>
          <div className="flex flex-col items-center justify-between h-full">
            <img src={info1} className="w-10 sm:w-16" alt="" />
            <p className="text-primary md:text-lg text-[10px] ms:text-sm lg:text-xl">
              {summary.totalUser || 0}
            </p>
            <p className="font-bold md:text-lg sm:text-sm text-[8px] text-center lg:text-xl text-gray-600 font-Inter">
              Donatur
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
