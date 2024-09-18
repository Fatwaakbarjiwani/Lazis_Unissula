import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setButtonPage } from "../../redux/reducers/pageReducer";

export default function KhidmahSosial() {
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(setButtonPage("tentangkami"));
    }, []);
  return (
    <>
      <h1 className="font-bold text-3xl mt-10 text-center text-gray-600 mb-6">
        Khidmah Bidang{" "}
        <span className="text-[#69C53E]">Sosial Kemanusiaan</span>
      </h1>
      <div className="flex items-center justify-center sm:w-10/12 md:w-3/4 lg:w-4/5 mx-auto">
        <p className="text-justify px-5 py-5 leading-8 font-Inter">
          Khidmah bantuan sosial kemanusiaan dilakukan dengan memberikan santuan
          bagi dhuafa dan korban bencana alam dan bencana kemanusiaan. Bentuk
          programnya seperti Bantuan Musafir, Bantuan Bencana Alam, Duka Dunia
          Islam dan program pengabdian masyarakat, Santunan untuk Duafa dan
          Lansia, sekolah Relawan, dll.
        </p>
      </div>
    </>
  );
}
